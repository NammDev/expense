import { NextRequest, NextResponse } from 'next/server'

import { createClient } from '@supabase/supabase-js'
// import SignInEmail from 'emails/signin'
// import WelcomeEmail from 'emails/welcome'

// import { Database } from 'lib/database.types'
// import resend from 'lib/email'
// import prisma from 'lib/prisma'
// import { getRedirectUrl } from 'lib/utils'

// import messages, { emails } from 'constants/messages'

type UserData = {
  email: string
  id: string
  new_signup_email: boolean
}

export async function POST(request: NextRequest) {
  console.log('hello')
  const { email } = await request.json()
  console.log(email)
  // const user = (await prisma.users.findFirst({
  //   where: { email },
  //   select: { email: true, id: true, new_signup_email: true },
  // })) as UserData
  // if (user && user.id) {
  //   try {
  //     const { data, error } = await supabaseAdmin.auth.admin.generateLink({
  //       type: 'magiclink',
  //       email,
  //       options: { redirectTo: getRedirectUrl() },
  //     })

  //     if (error) {
  //       throw error
  //     }

  //     const { properties } = data
  //     const { action_link } = properties

  //     try {
  //       if (!user.new_signup_email) {
  //         await resend.emails.send({
  //           from: emails.from,
  //           subject: emails.welcome.subject,
  //           to: user.email,
  //           react: WelcomeEmail(),
  //         })
  //         await prisma.users.update({ where: { id: user.id }, data: { new_signup_email: true } })
  //       }
  //       await resend.emails.send({
  //         from: emails.from,
  //         subject: emails.signin.subject,
  //         to: email,
  //         react: SignInEmail({ action_link }),
  //       })
  //       return NextResponse.json({ message: emails.sent })
  //     } catch (err: any) {
  //       throw err
  //     }
  //   } catch (error: any) {
  //     return NextResponse.json({ message: String(error) || messages.error }, { status: 500 })
  //   }
  // } else {
  //   return NextResponse.json({ message: messages.account.doesntexist }, { status: 404 })
  // }
}
