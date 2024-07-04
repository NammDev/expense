'use server'

import { prisma } from './db'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

type UserData = {
  email: string
  basic_usage_limit_email: boolean
  premium_usage_limit_email: boolean
  premium_plan_expired_email: boolean
}

export const checkAuth = async (callback: Function, isGetMethod = true) => {
  const supabase = createServerActionClient({ cookies })
  const { data } = await supabase.auth.getSession()
  const { session } = data
  if (session && session.user) {
    const user = await prisma.users.findUnique({ where: { id: session.user.id } })
    if (!user) {
      await prisma.users.create({
        data: {
          id: session.user.id,
          email: session.user.email as string,
          plan_status: 'free',
          new_signup_email: true,
          basic_usage_limit_email: true,
          premium_plan_expired_email: false,
          premium_usage_limit_email: false,
          monthly_email_report: false,
        },
      })
    }
    return callback(session.user)
  }
}
