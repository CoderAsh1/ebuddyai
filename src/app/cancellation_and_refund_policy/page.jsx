import React from "react";

export default function RefundPolicy() {
  return (
    <div>
      <div className="h-56 policy_bg flex justify-center items-center flex-col text-white font-bold gap-4">
        <h1 className="text-4xl">ExamBuddy.AI</h1>
        <h2 className="text-2xl">Cancellation and Refund</h2>
      </div>
      <div className="bg-[#ebfcff] p-10 leading-8">
        <p className="font-semibold">
          At exambuddy - Your Exam Buddy, we strive to provide you with
          high-quality services for your exam preparation needs. We understand
          that sometimes circumstances may change, and you may wish to cancel
          your subscription or request a refund. Please review our cancellation
          and refund policy below.
        </p>

        <h2 className="font-bold mt-3">Cancellation</h2>
        <ul>
          <li>You have the right to cancel your subscription at any time.</li>
          <li>
            To cancel your subscription, please send an email to [Your Contact
            Email] with your cancellation request.
          </li>
          <li>
            Upon receiving your cancellation request, we will process it
            promptly.
          </li>
        </ul>

        <h2 className="font-bold mt-3">Refund Policy</h2>
        <ul className="ms-5">
          <li style={{ listStyleType: 'circle' }}>We offer a 15-day refund policy for our services.</li>
          <li style={{ listStyleType: 'circle' }}>
            If you are not satisfied with our services and wish to request a
            refund, please send an email to refund@examvuddy.com within 15 days
            of your subscription purchase.
          </li>
          <li style={{ listStyleType: 'circle' }}>
            Your refund request will be processed within 24 to 72 hours upon
            receipt of your email.
          </li>
          <li style={{ listStyleType: 'circle' }}>
            Refunds will be issued using the same payment method used for the
            initial purchase.
          </li>
        </ul>

        <h2 className="font-bold mt-3">Exceptions</h2>
        <ul className="ms-5">
          <li style={{ listStyleType: 'circle' }}>
            We do not offer refunds for subscription periods that have expired.
          </li>
          <li style={{ listStyleType: 'circle' }}>
            No refunds will be provided for any third-party tools or services
            used in conjunction with our platform.
          </li>
        </ul>

        <h2 className="font-bold mt-3">Contact Us</h2>
        <p>
          If you have any questions or concerns about our cancellation and
          refund policy, please contact us at{" "}
          <a href="mailto:support@exambuddyai.com">support@exambuddyai.com</a>.
        </p>
        <i>Last updated - 11.10.23</i>
      </div>
    </div>
  );
}
