import './globals.css';

import { Poppins } from "next/font/google";
import Script from 'next/script';

const poppins = Poppins({ weight: ["400","600"], subsets: ["latin"] });

export const metadata = {
  title: 'ExamBuddy',
  description: 'This time crack exam with me.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
        <link rel="stylesheet" href="bower_components/aos/dist/aos.css" />
      <body className={`${poppins.className} bg-blue-100}`}>{children}
      </body>    
      <script
        id="retune.so/frame"
        src={`https://retune.so/api/script/chat.js?iframe&id=${process.env.NEXT_PUBLIC_RETUNE_ID}`}
        async
        ></script>
           <script src="bower_components/aos/dist/aos.js"></script> 
        
    </html>
  )
}
