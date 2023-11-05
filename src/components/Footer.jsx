import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <div className='bottom_bg'>
        <footer className="footer p-10 text-base-content bottom_bg">
        {/* <nav>
            <header className="footer-title">Services</header> 
            <a className="link link-hover">Branding</a> 
            <a className="link link-hover">Design</a> 
            <a className="link link-hover">Marketing</a> 
            <a className="link link-hover">Advertisement</a>
        </nav>  */}
        <nav>
            <header className="footer-title">Company</header> 
            <Link href={"/about_us"} className="link link-hover">About us</Link> 
            {/* <Link href={"/contact_us"} className="link link-hover">Contact</Link>  */}
        </nav> 
        <nav>
            <header className="footer-title">Legal</header> 
            <Link href={"/terms_and_conditions"} className="link link-hover">Terms and Conditions</Link> 
            <Link href={"/privacy_policy"} className="link link-hover">Privacy policy</Link> 
            <Link href={"/cancellation_and_refund_policy"} className="link link-hover">Cancellation and Refund</Link>
            <Link href={"/shipping_and_delivery"} className="link link-hover">Shipping and Delivery</Link>
            <Link href={"/referral_policy"} className="link link-hover">Referral Policy</Link>
        </nav> 
        <form>
            <header className="footer-title">Contact Us</header> 
            <h4>support@exambuddyai.com</h4>
            <h4><b>Address - </b>Civil township near post office, <br /> Rourkela,Odisha, India, 769004</h4>
        </form>
        </footer>
        <footer className="footer footer-center pb-10 pt-4">
        <aside>
            <svg width="50" height="50" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" className="inline-block fill-current"><path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path></svg>
            <p className="font-bold">
            ExamBuddy AI. <br/>Let's crack It
            </p> 
            <p>Copyright © 2023 - All right reserved</p>
        </aside> 
        </footer>
</div>

  )
}
