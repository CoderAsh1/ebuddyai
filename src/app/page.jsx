"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Script from "next/script";
import axios from "axios";
import { useRouter } from "next/navigation";
import moment from "moment";
import Footer from "@/components/Footer";
import Tilt from "react-parallax-tilt";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      try {
        let user = await axios.get("/api/user");
        setUser(user.data.user);
      } catch (error) {
        try {
          await axios.get("/api/logout");
        } catch (error) {
          console.log(error);
        }
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getUser();
  }, []);

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay(total) {
    try {
      setLoading(true);
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }

      const result = await axios.post("/api/payment/order", { amount: total });

      if (!result) {
        alert("Server error. Are you online?");
        return;
      }

      const { amount, id: order_id, currency } = result.data;

      const options = {
        key: process.env.RAZORPAY_KEY_ID,
        amount: amount.toString(),
        currency: currency,
        name: "Supreme Plan",
        description: "Onetime fee",
        // image: { logo },
        order_id: order_id,
        handler: async function (response) {
          const data = {
            orderCreationId: order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };

          await axios.post("api/payment/success", data);
          await axios.put("/api/user", {
            isSubscribed: true,
            subscriptionExpireOn: moment().add(30, "d").toISOString(),
          });
          toast.success("Payment Successful.");
          router.push(user?.hasCompanion ? "/chat" : "/choose_companion");
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: "9999999999",
        },
        notes: {
          address: "Rourkela",
        },
        theme: {
          color: "#61dafb",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      toast.error("Payment Failed. Retry Payment !");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function createSubscription(name) {
    try {
      setLoading(true);
      const result = await axios.post("/api/create_subscription", {
        email: user.email,
        name: user.name,
      });
      var options = {
        key: process.env.RAZORPAY_KEY_ID,
        subscription_id: result.data.data.id,
        name: "Premium Plan",
        description: "Recurring payment",
        handler: async function (response) {
          await axios.put("/api/user", {
            isSubscribed: true,
            subscriptionRenewsOn: moment().add(30, "d").toISOString(),
            subscriptionName: name,
            subscriptionId: result.data.data.id,
          });
          toast.success("Payment Successful.");
          router.push(user?.hasCompanion ? "/chat" : "/choose_companion");
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: user.phone,
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    try {
      await axios.get("/api/logout");
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="h-full p-5 bg-blue-100">
        <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
        <header className="rounded-xl text-slate-700 morph" id="signup">
          <nav className="card_blur p-5 flex justify-between items-center">
            <div className="w-fit">
              <Link href="/">
                <b>ExamBuddy.AI</b>
                <div className="text-[10px] text-end">Let's Crack it !</div>
              </Link>
            </div>
            <div className="flex gap-7"></div>
            {loading ? (
              <span className="loading loading-dots loading-sm "></span>
            ) : (
              <>
                {user ? (
                  <div className="dropdown dropdown-end md:relative absolute right-0 top-0">
                    <label
                      tabIndex={0}
                      className="btn btn-ghost btn-circle avatar"
                    >
                      <div className="w-10 rounded-full">
                        <img src={user?.image || "./user.png"} />
                      </div>
                    </label>
                    <ul
                      tabIndex={0}
                      className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      <li onClick={() => router.push("/profile")}>
                        <a>Profile</a>
                      </li>
                      <li onClick={() => router.push("/chat")}>
                        <a>Chat</a>
                      </li>
                      <li onClick={handleLogout}>
                        <a>Logout</a>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <Link href="/login">
                    <button className="p-2 px-5 login_btn rounded-md text-white font-bold">
                      Sign In
                    </button>
                  </Link>
                )}
              </>
            )}
          </nav>
        </header>
        <div className=" bg_speed rounded-xl mb-3 flex text-center mt-5 justify-center items-center h-[80vh]">
          <div className="text-white">
            <h1  className="lg:text:6xl md:text-4xl text-4xl mb-3 font-semibold">
              Welcome to <span className="buddy ">ExamBuddy AI</span></h1>
            <p className="text-slate-700 text-xl font-bold">
              One stop solution to crack exams with ease
            </p>
            <p className="text-slate-700 text-xl font-bold">
              {" "}
              Your All-in-One AI Study Companion for Competitive Exams
            </p>
            <button
              onClick={() => router.push("/signup")}
              className="morph call_btn p-4 rounded-md font-bold mt-5 text-white"
            >
              Onboard Yourself Now
            </button>
          </div>
        </div>
        <div className=" card_bg rounded-xl mb-3 flex text-center justify-center px-2 py-10 md:p-16 h-full">
          <div className="text-white">
            <h1 className="lg:text:6xl md:text-4xl text-2xl mb-3 font-semibold">
              Why Us ?
            </h1>
            <div className="morph p-5 md:p-10 mt-6 text-left leading-8">
              <b>1. Versatile Content Training:</b> <br />
              Whether it's textbooks, YouTube video lectures, PDFs, or website
              articles, ExamBuddy.AI can harness the power of AI from various
              content sources. It adapts to your study materials, making it an
              all-in-one solution for exam preparation.
              <br />
              <b> 2. Personalized Exam Prep:</b>
              <br />
              Tailor your AI model to focus on the specific topics and subjects
              relevant to your competitive exam, whether it's JEE, NEET, SSC,
              UPSC, or any other. It's like having a study partner that knows
              your exam syllabus inside out.
              <br />
              <b>3. Interactive Learning:</b> <br />
              ExamBuddy.AI goes beyond AI. It's your interactive tutor, ready to
              answer your doubts, provide explanations, and offer study
              recommendations. Think of it as having a teacher's expertise in an
              AI model's body.
            </div>
          </div>
        </div>
        <div className=" card_bg rounded-xl mb-3 flex text-center justify-center px-2 py-10 md:p-16 h-full">
          <div className="text-white">
            <h1 className="lg:text:6xl md:text-4xl text-2xl mb-3 font-semibold">
              Train on your own data
            </h1>
            <div className="morph p-5 md:p-10 mt-6 text-left leading-8">
              <b>Upload Your Stuff:</b> Mail us at{" "}
              <a href="mailto:support@exambuddy.com">
                <b>support@exambuddy.com</b>
              </a>{" "}
              to upload your study materials, no matter what format they are -
              documents, YouTube videos, PDFs, or websites. <br />
              <b>Make It Yours:</b> A customize AI model will be developed using
              your data to focus on the subjects and topics you care about.
              <br />
              <b>Make it work for you:</b> Talk to It: Chat with your AI model,
              ask questions, get explanations, and receive study tips that match
              your progress. Get Better Together: Watch your AI model improve as
              it learns from your interactions. It makes your study sessions
              more effective over time.
              <br />
              <div className="text-center">
                <a href="#signup">
                  <i>Join the Future of Learning Today</i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className=" card_bg rounded-xl mb-3 flex text-center justify-center px-5 py-10 md:p-16 h-full">
          <div className="text-white">
            <h1 className="lg:text:6xl md:text-4xl text-2xl mb-3 font-semibold">
              Pricing
            </h1>

            <div className="morph p-5 md:p-10 mt-6 text-left leading-8">
              <div className="flex flex-wrap justify-center gap-10 ">
                <Tilt className="rounded-xl p-2 md:p-6 phone-1 max-w-sm flex flex-col gap-4">
                  <h1 className="font-bold">Free Plan</h1>
                  <p>You will be able to access the companion.</p>
                  <div>
                    <span className="font-bold text-xl">&#8377; 0</span>/month
                  </div>
                  <p>&#x2714; Free</p>
                  <Link
                    href="/login"
                    className="morph call_btn p-4 rounded-md font-bold text-center text-white mt-auto"
                  >
                    Chat Now
                  </Link>
                </Tilt>

                <Tilt className="rounded-xl p-2 md:p-6 phone-1 max-w-sm flex flex-col gap-4">
                  <h1 className="font-bold">Premium Plan</h1>
                  <p>
                    You will be able to access the companion 30 days for free
                    from the data of Joining{" "}
                  </p>
                  <div>
                    <span className="font-bold text-xl">&#8377; 600</span>/month
                  </div>
                  <p>&#x2714; 24/7 Customer Support</p>
                  <button
                    disabled={loading}
                    onClick={() =>
                      user
                        ? createSubscription("premium_plan")
                        : router.push("/login")
                    }
                    className="morph call_btn p-4 rounded-md font-bold text-center text-white mt-auto"
                  >
                    {loading ? (
                      <span className="loading loading-dots loading-sm "></span>
                    ) : (
                      "Get Plan"
                    )}
                  </button>
                </Tilt>
                <Tilt className="rounded-xl p-2 md:p-6 phone-1 max-w-sm flex flex-col gap-4">
                  <h1 className="font-bold">Supreme Plan</h1>
                  <p>
                    You will be able to access the companion 30 days for free
                    from the data of Joining{" "}
                  </p>

                  <div>
                    <span className="font-bold text-xl">&#8377; 10000</span>
                    /lifetime
                  </div>
                  <p>&#x2714; 24/7 Customer Support</p>
                  <p>&#x2714; LifeTime Access</p>
                  <p>&#x2714; Custom ChatBot With Own Data</p>
                  <button
                    disabled={loading}
                    onClick={() =>
                      user ? displayRazorpay(1000000) : router.push("/login")
                    }
                    className="morph call_btn p-4 rounded-md font-bold text-center text-white mt-auto"
                  >
                    {loading ? (
                      <span className="loading loading-dots loading-sm "></span>
                    ) : (
                      "Get Plan"
                    )}
                  </button>
                </Tilt>
              </div>
            </div>
          </div>
        </div>

        <Toaster />
      </div>
      <Footer />
    </>
  );
}
