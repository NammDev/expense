import { Inter } from 'next/font/google'
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import React from 'react'
import { Database } from '@/lib/database.types'
import { AuthProvider } from './auth-provider'
import { prisma } from '@/lib/db'
import { getUser } from '@/lib/actions/users'

const inter = Inter({ subsets: ['latin'] })

const supabaseOption = {
  supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
}

const title = 'Expense.fyi – Overview'
const description = 'Effortlessly Track and Manage Expenses.'

export const metadata = {
  title,
  description,
}

export const revalidate = 0

export default async function Layout({ children }: any) {
  const supabase = createServerComponentClient<Database>({ cookies }, supabaseOption)
  const {
    data: { session },
  } = await supabase.auth.getSession()
  const user = await getUser()

  return (
    <>
      <html lang='en' suppressHydrationWarning>
        <body className={`${inter.className} flex h-full flex-col text-gray-600 antialiased`}>
          <AuthProvider user={user} accessToken={session?.access_token || null}>
            <main className='relative flex min-w-full min-h-full bg-background'>
              <div className='h-full w-full sm:ml-[64px]'>
                <div className='flex flex-col w-full h-full max-sm:ml-0'>{children}</div>
              </div>
            </main>
          </AuthProvider>
        </body>
      </html>
    </>
  )
}
