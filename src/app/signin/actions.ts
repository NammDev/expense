'use server'

import { prisma } from '@/lib/db'
import messages, { emails } from '@/constants/messages'
import { getRedirectUrl } from '@/lib/utils'
import resend from '@/lib/email'
import WelcomeEmail from '@/components/emails/welcome'
import SignInEmail from '@/components/emails/signin'
import { Database } from '@/lib/database.types'
import { createClient } from '@supabase/supabase-js'

type UserData = {
  email: string
  id: string
  new_signup_email: boolean
}

const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? '',
  { auth: { persistSession: false } }
)

export async function login(email: string) {
  const user = (await prisma.users.findFirst({
    where: { email },
    select: { email: true, id: true, new_signup_email: true },
  })) as UserData

  if (user && user.id) {
    try {
      const { data, error } = await supabaseAdmin.auth.admin.generateLink({
        type: 'magiclink',
        email,
        options: { redirectTo: getRedirectUrl() },
      })
      if (error) throw error

      const { properties } = data
      const { action_link } = properties
      try {
        if (!user.new_signup_email) {
          await resend.emails.send({
            from: emails.from,
            subject: emails.welcome.subject,
            to: user.email,
            react: WelcomeEmail(),
          })
          await prisma.users.update({ where: { id: user.id }, data: { new_signup_email: true } })
        }
        await resend.emails.send({
          from: emails.from,
          subject: emails.signin.subject,
          to: email,
          react: SignInEmail({ action_link }),
        })
        console.log('Email sent')
      } catch (err: any) {
        throw new Error(err)
      }
    } catch (error: any) {
      throw new Error(String(error) || messages.error)
    }
  } else {
    throw new Error(messages.account.doesntexist)
  }
}
