import React from "react";

export default function PrivacyPolicy() {
  return (
    <div>
      <div className="h-56 policy_bg flex justify-center items-center flex-col text-white font-bold gap-4">
        <h1 className="text-4xl">ExamBuddy.AI</h1>
        <h2 className="text-2xl">Privacy Policy</h2>
      </div>
      <div className="bg-[#ebfcff] p-10 leading-7">
        <h2 className="font-bold">Introduction</h2>
        <p>
          Welcome to exambuddy - Your Exam Buddy! This Privacy Policy explains
          how we collect, use, and protect your personal information. By using
          our services, you agree to the terms outlined in this policy.
        </p>

        <h2 className="font-bold my-2">Information We Collect</h2>
        <p>We may collect the following types of information:</p>
        <ul className="ms-5">
          <li style={{ listStyleType: 'circle' }}>
            User Registration Information: Your name, email address, and contact
            details when you sign up for our services.
          </li>
          <li style={{ listStyleType: 'circle' }}>
            Academic Data: Information about your academic progress and the
            competitive exams you're preparing for.
          </li>
          <li style={{ listStyleType: 'circle' }}>
            Usage Data: Data on how you interact with our platform, including
            study materials and course progress.
          </li>
        </ul>

        <h2 className="font-bold my-2">How We Use Your Information</h2>
        <p>We use your data for the following purposes:</p>
        <ul className="ms-5">
          <li style={{ listStyleType: 'circle' }}>
            Personalized Learning: Tailoring our content to your specific exam
            preparation needs.
          </li>
          <li style={{ listStyleType: 'circle' }}>
            Communication: Sending educational updates and relevant information
            via email. You can opt out of these communications at any time.
          </li>
          <li style={{ listStyleType: 'circle' }}>
            Service Improvement: Analyzing user behavior to enhance our
            services.
          </li>
        </ul>

        <h2 className="font-bold mt-2">Data Security</h2>
        <p>
          We employ industry-standard measures to protect your data, including
          encryption and access controls.
        </p>

        <h2 className="font-bold mt-2">Third-Party Services</h2>
        <p>
          We may use third-party tools or services. Their privacy policies apply
          when using their services.
        </p>

        <h2 className="font-bold mt-2">Your Rights</h2>
        <p>
          You have the right to access, correct, or delete your information.
          Contact us at{" "}
          <a href="mailto:support@exambuddyai.com">support@exambuddyai.com</a> with
          any questions or concerns.
        </p>

        <h2 className="font-bold mt-2">Changes to Privacy Policy</h2>
        <p>
          We may update this policy. You'll be notified of significant changes. 
        </p>
        <i>Last updated - 11.10.23</i>
      </div>
    </div>
  );
}
