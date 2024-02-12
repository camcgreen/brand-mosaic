import { Lexend_Giga } from 'next/font/google'
import './globals.css'

const lexendGiga = Lexend_Giga({ subsets: ['latin'] })

export const metadata = {
  title: 'Brand Mosaic',
  description: 'Digital mosaic wall',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={lexendGiga.className}>{children}</body>
    </html>
  )
}
