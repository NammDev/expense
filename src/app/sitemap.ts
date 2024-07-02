import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://expense.namk.dev',
      lastModified: new Date(),
    },
    {
      url: 'https://app.expense.namk.dev',
      lastModified: new Date(),
    },
    {
      url: 'https://app.expense.namk.dev/signin',
      lastModified: new Date(),
    },
    {
      url: 'https://app.expense.namk.dev/siginup',
      lastModified: new Date(),
    },
    {
      url: 'https://app.expense.namk.dev/expenses',
      lastModified: new Date(),
    },
    {
      url: 'https://app.expense.namk.dev/income',
      lastModified: new Date(),
    },
    {
      url: 'https://app.expense.namk.dev/investments',
      lastModified: new Date(),
    },
    {
      url: 'https://app.expense.namk.dev/settings',
      lastModified: new Date(),
    },
  ]
}
