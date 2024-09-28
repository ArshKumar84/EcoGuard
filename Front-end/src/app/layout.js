// app/layout.js
import './globals.css'
import Layout from '@/components/Layout'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}