'use server'

import { prisma } from '@/lib/db'
import messages, { emails } from '@/constants/messages'
import { createClient } from '@/utils/supabase/server'
import { getRedirectUrl } from '@/lib/utils'
import resend from '@/lib/email'
import SignUpEmail from '@/components/emails/signup'

type UserData = {
  email: string
  id: string
  new_signup_email: boolean
}

const supabase = createClient()

export async function signup(email: string) {
  const user = await prisma.users.findFirst({ where: { email }, select: { email: true } })
  if (!user) {
    try {
      const { data, error } = await supabase.auth.admin.generateLink({
        type: 'magiclink',
        email,
        options: { redirectTo: getRedirectUrl() },
      })

      if (error) {
        throw error
      }

      const { properties } = data
      const { action_link } = properties

      try {
        await resend.emails.send({
          from: emails.from,
          subject: emails.signup.subject,
          to: email,
          react: SignUpEmail({ action_link }),
        })
      } catch (err: any) {
        throw err
      }
    } catch (error: any) {
      throw new Error(String(error) || messages.error)
    }
  } else {
    throw new Error(messages.account.exist)
  }
}
