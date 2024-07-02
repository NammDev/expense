import Footer from '@/components/footer'

const title = 'Sign in to Expense.fyi'
const description = 'Effortlessly Track and Manage Expenses.'

export const metadata = {
  title,
  description,
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main
      className={`relative m-auto flex h-[100vh] w-full flex-col items-center justify-center bg-gradient-to-br from-sky-100 via-white to-sky-50 pl-2 pr-2`}
    >
      <div className='absolute inset-x-0 top-[-55px] z-10 h-96 overflow-hidden text-gray-900/40 opacity-10 [mask-image:linear-gradient(to_top,transparent,white)]'>
        <svg
          className='absolute inset-0 top-0 h-full w-full text-gray-900'
          xmlns='http://www.w3.org/2000/svg'
        >
          <defs>
            <pattern
              id='pattern'
              width='32'
              height='32'
              patternUnits='userSpaceOnUse'
              x='50%'
              y='100%'
              patternTransform='translate(0 -1)'
            >
              <path d='M0 32V.5H32' fill='none' stroke='currentColor'></path>
            </pattern>
          </defs>
          <rect width='100%' height='100%' fill='url(#pattern)'></rect>
        </svg>
      </div>
      {children}
      <Footer className={'absolute bottom-0'} />
    </main>
  )
}
