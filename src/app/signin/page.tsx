import Image from 'next/image'
import Link from 'next/link'
import logo from '../../../public/icons/logo.svg'
// import SignInForm from './form'

export default function SignIn() {
  return (
    <div className='absolute z-50 m-auto flex w-[380px] flex-1 flex-col justify-center p-6 sm:w-[468px] sm:p-10'>
      <Link href='https://expense.fyi'>
        <h1 className='flex flex-col items-center text-3xl'>
          <Image
            className='active:scale-95'
            src={logo}
            width={50}
            height={50}
            alt='expense.fyi logo'
          />
          <span className='mt-2 font-black text-gray-900'>Expense.fyi</span>
        </h1>
      </Link>
      <p className='mb-6 mt-3 text-center text-sm font-medium text-zinc-600'>
        Use your email address to securely sign in.
      </p>
      {/* <SignInForm /> */}
    </div>
  )
}
