import React from "react";

export default function Terms() {
  return (
    <div>
      <div className="h-56 policy_bg flex justify-center items-center flex-col text-white font-bold gap-4">
        <h1 className="text-4xl">ExamBuddy.AI</h1>
        <h2 className="text-2xl">Terms and Conditions</h2>
      </div>
      <div className="bg-[#ebfcff] p-10 leading-8">
        <h2 className="font-bold">Introduction</h2>
        <p>
          Welcome to exambuddy - Your Exam Buddy! These Terms and Conditions
          outline the rules and regulations governing your use of our services.
          By accessing or using our website, you agree to comply with these
          terms.
        </p>

        <h2 className="font-bold mt-3">Use of Services</h2>
        <ul>
          <li>
            Eligibility: You must be of legal age in your jurisdiction to use
            our services. If you're a minor, please use our services under
            parental or guardian supervision.
          </li>
          <li>
            Account Creation: When creating an account, you agree to provide
            accurate and complete information. You are responsible for
            maintaining the confidentiality of your account credentials.
          </li>
        </ul>

        <h2  className="font-bold mt-3">User Responsibilities</h2>
        <ul>
          <li>
            Acceptable Use: You agree not to use our services for any unlawful
            or prohibited activities. This includes but is not limited to
            copyright violations, harassment, or any actions that could disrupt
            the service.
          </li>
          <li>
            Intellectual Property: All content on our website, including text,
            graphics, and multimedia, is protected by copyright. You may not
            reproduce, distribute, or modify this content without our explicit
            consent.
          </li>
        </ul>

        <h2  className="font-bold mt-3">Privacy</h2>
        <ul>
          <li>
            Privacy Policy: Your use of our services is subject to our Privacy
            Policy. Please review it to understand how we collect and use your
            personal information.
          </li>
        </ul>

        <h2  className="font-bold mt-3">Modifications</h2>
        <p>
          We may update these Terms and Conditions at any time. It is your
          responsibility to review them periodically. Continued use of our
          services after changes constitutes your acceptance of the revised
          terms.
        </p>

        <h2  className="font-bold mt-3">Termination</h2>
        <p>
          We reserve the right to terminate or suspend your account at our
          discretion, without notice, if you violate these Terms and Conditions.
        </p>

        <h2  className="font-bold mt-3">Disclaimer</h2>
        <p>
          Our services are provided "as is," and we make no warranties, express
          or implied, regarding their accuracy, reliability, or suitability for
          a particular purpose.
        </p>

        <h2  className="font-bold mt-3">Limitation of Liability</h2>
        <p>
          We shall not be liable for any direct or indirect damages resulting
          from the use or inability to use our services.
        </p>

        <h2  className="font-bold mt-3">Governing Law</h2>
        <p>
          These Terms and Conditions are governed by the laws of [Your
          Jurisdiction], and any disputes shall be resolved in the courts of
          [Your Jurisdiction].
        </p>

        <h2  className="font-bold mt-3">Contact Us</h2>
        <p>
          If you have any questions or concerns about these Terms and
          Conditions, please contact us at{" "}
          <a href="mailto:contact@exambuddy.com">contact@exambuddy.com</a>.
        </p>
        <i>Last updated - 11.10.23</i>
      </div>
    </div>
  );
}
