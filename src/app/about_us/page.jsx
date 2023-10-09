import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <>
      <div className="h-56 policy_bg flex justify-center items-center flex-col text-white font-bold gap-4">
        <h1 className="text-4xl">ExamBuddy.AI</h1>
        <h2 className="text-2xl">About Us</h2>
      </div>
      <div className="bg-[#ebfcff] p-10 leading-8">
        <h1 className="font-bold">Shipping and Delivery of Digital Products</h1>

        <p>
          At exambuddy - Your Exam Buddy, our platform is designed to provide
          students with a seamless experience for exam preparation. Here's how
          it works:
        </p>

        <h2 className="font-bold mt-3">Inputting Your Data</h2>
        <ul>
          <li>
            As a student, you have the flexibility to upload your exam-related
            data in various formats, including documents, PDFs, or even YouTube
            videos.
          </li>
        </ul>

        <h2 className="font-bold mt-3">Training Your Model</h2>
        <ul>
          <li>
            Once your data is uploaded, our platform allows you to utilize it to
            train a personalized model for your exam preparation.
          </li>
        </ul>

        <h2 className="font-bold mt-3">Immediate Access</h2>
        <ul>
          <li>
            Your trained model and study materials are instantly accessible
            through your account on our website.
          </li>
          <li>
            There is no physical shipping involved since all our products are
            digital, providing you with instant access to your personalized
            resources.
          </li>
        </ul>

        <h2 className="font-bold mt-3">Technical Requirements</h2>
        <p>
          To make the most of our platform, ensure you have a compatible device
          and a stable internet connection.
        </p>

        <h2 className="font-bold mt-3">Customer Support</h2>
        <p>
          If you encounter any technical issues while using our platform, our
          dedicated customer support team is here to assist you. Contact us at{" "}
          <a href="mailto:support@exambuddy.com">support@exambuddy.com</a> for
          help.
        </p>

        <h2 className="font-bold mt-3">Shipping-Related Issues</h2>
        <p>
          If you have any issues related to the delivery of digital products or
          require assistance with shipping-related matters, please contact us at{" "}
          <a href="mailto:shipping@exambuddy.com">shipping@exambuddy.com</a>.
        </p>

        <h2 className="font-bold mt-3" >Refund Policy</h2>
        <p>
          Please refer to our <Link href="/cancellation_and_refund_policy"><i>Cancellation and Refund Policy</i></Link> for information
          regarding refunds related to our digital products and services.
        </p>

        <h2 className="font-bold mt-3">Contact Us</h2>
        <p>
          If you have any other questions or concerns about our platform,
          including the use of your data, please don't hesitate to contact us at{" "}
          <a href="mailto:help@exambuddy.com">help@exambuddy.com</a>.
        </p>
      </div>
    </>
  );
}
