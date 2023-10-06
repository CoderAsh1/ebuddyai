import './globals.css'

import { Poppins } from "next/font/google";

const poppins = Poppins({ weight: ["400","600"], subsets: ["latin"] });

export const metadata = {
  title: 'ExamBuddy',
  description: 'This time crack exam with me.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body className={`${poppins.className} bg-blue-100}`}>{children}</body>
      <script
        id="retune.so/frame"
        src={`https://retune.so/api/script/chat.js?iframe&id=${process.env.RETUNE_ID}`}
        async
        ></script>
    </html>
  )
}
