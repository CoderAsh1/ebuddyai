import Navbar from "@/components/Navbar"


export const metadata = {
  title: 'Exam Buddy',
  description: 'Crack Exam with me.',
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
