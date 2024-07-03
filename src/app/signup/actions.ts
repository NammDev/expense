'use server'

import { prisma } from '@/lib/db'
import messages, { emails } from '@/constants/messages'
import { getRedirectUrl } from '@/lib/utils'
import resend from '@/lib/email'
import SignUpEmail from '@/components/emails/signup'

import { createClient } from '@supabase/supabase-js'
import { Database } from '@/lib/database.types'

const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? '',
  { auth: { persistSession: false } }
)

type UserData = {
  email: string
  id: string
  new_signup_email: boolean
}

export async function signup(email: string) {
  const user = await prisma.users.findFirst({ where: { email }, select: { email: true } })
  if (!user) {
    try {
      const { data, error } = await supabaseAdmin.auth.admin.generateLink({
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
