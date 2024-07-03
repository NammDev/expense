import { getRangeDateForFilter } from './date'
import { views } from './table'

const isProduction = process.env.NODE_ENV === 'production'

const domain = 'expense.namk.dev'
const local = 'localhost:3000'
const home = isProduction ? domain : local

const url = {
  homeWithoutApp: home,
  home: `//${home}`,
  api: `${isProduction ? 'https://app.' : 'http://app.'}${home}`,
  serverApi: `${isProduction ? 'https://' : 'http://'}${home}`,
  app: {
    signin: `${home}/signin`,
    signup: `${home}/signup`,
    overview: `${home}/overview`,
  },
  twitter: 'https://x.com/namdeveloper_ca',
  github: 'https://github.com/NammDev/expense',
}

export const getApiUrl = (
  filterKey: string,
  apiPath: string,
  categories: string[] = [],
  isNotRange = false
) => {
  if (isNotRange) {
    return `/api/${apiPath}`
  }

  if (filterKey === views.all.key) {
    return `/api/${apiPath}?categories=${categories?.join(',')}`
  }

  const [start, end] = getRangeDateForFilter(filterKey)
  return `/api/${apiPath}?from=${start}&to=${end}&categories=${categories?.join(',')}`
}

export default url
