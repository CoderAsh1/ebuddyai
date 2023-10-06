import Navbar from "@/components/Navbar"


export const metadata = {
  title: 'Exam Buddy',
  description: 'Crack Exam with me.',
}

export default function RootLayout({ children }) {
  return (<div> <Navbar/> {children}</div>)
}
