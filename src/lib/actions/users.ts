'use server'

import { checkAuth } from './../auth'
import { prisma } from '../db'

export async function getUser() {
  return await checkAuth(async (user: any) => {
    try {
      const data = await prisma.users.findUnique({
        where: { id: user.id },
        select: {
          currency: true,
          locale: true,
          billing_start_date: true,
          trial_start_date: true,
          order_status: true,
          usage: true,
          email: true,
          plan_status: true,
          new_signup_email: true,
        },
      })

      return { ...data }
    } catch (error) {
      throw new Error()
    }
  })
}
