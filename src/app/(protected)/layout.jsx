import Navbar from "@/components/Navbar"


export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
      <div>
        <Navbar/>
        {children}</div>
      </body>
    </html>
    
  )
}
