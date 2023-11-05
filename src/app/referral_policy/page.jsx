import React from "react";

export default function ReferralPolicy() {
  return (
    <div>
      <div className="h-56 policy_bg flex justify-center items-center flex-col text-white font-bold gap-4">
        <h1 className="text-4xl">ExamBuddy.AI</h1>
        <h2 className="text-2xl">Referral Policy</h2>
      </div>
      <div className="bg-[#ebfcff] p-10 leading-8">
        <p>Refer your friend and earn commisions upto &#8377; 50000/-</p>
        <p>Referral is only eligible for reward if your friend will subscribe to a <b>paid plan</b>.</p>
        <p className="font-semibold">For Each referral , you will be rewarded 30% of the plan purchased by your friend.</p>
        <p>Referral payment will be transferred to your bank account with the choice of your payment method.</p>
        <p>Email us your account info at support@exambuddyai.com </p>
        <i>Last updated - 11.10.23</i>
      </div>
    </div>
  );
}
