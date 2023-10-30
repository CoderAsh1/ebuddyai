"use client";

import Footer from "@/components/Footer";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

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
      if(user?.isSubscribed) return toast.error("Already subscribed !")
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
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
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
            subscriptionRenewsOn: false,
            subscriptionName:"Supreme Plan"
          });
          toast.success("Payment Successful.");
          router.push(user?.hasCompanion ? "/chat" : "/choose_companion");
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: user.phone,
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
      if(user?.isSubscribed) return toast.error("Already subscribed !")
      setLoading(true);
      const result = await axios.post("/api/create_subscription", {
        email: user.email,
        name: user.name,
      });
      var options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
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
      <div className="h-full p-2 md:p-5 bg-blue-100">
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
                        <img src={user?.image || "./policy-bg.svg"} />
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

        <div className="text-white text-md md:text-xl font-bold card_bg rounded-xl mb-3 flex flex-col text-center justify-center px-2 py-7 md:p-10 h-full">
          <div>Be a part of ExamBuddy AI now</div>
          <div>Get 15 days free trial from the date of Joining</div>
          <button className="p-2 px-5 login_btn rounded-md text-white font-bold w-fit mx-auto mt-4">
                      Join Now
                    </button>

        </div>

        <div className="items-center text-white font-bold card_bg rounded-xl mb-3 flex text-center justify-between px-2 py-10 md:p-16 h-full">
          <div>
          <h1>Refer and Earn upto &#8377;50000/-</h1>
          <p>Terms and conditons applied*</p>
          </div>
          <div>
          <img src="./referral.svg" alt="referral" height={400} width={400}/>
          </div>
        </div>

        <div className=" card_bg rounded-xl mb-3 flex flex-col md:flex-row text-center justify-center px-2 py-10 md:p-16 h-full">
          <div className="text-white me-3">
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
          <img src="./whyus.svg" alt="referral" height={400} width={400} className="hidden md:block"/>
        </div>

        <div className="card_bg rounded-xl mb-3 flex text-center justify-center px-2 py-10 md:p-16 h-full">
          <img src="./train.svg" alt="referral" height={400} width={400} className="hidden md:block"/>
          <div className="text-white">
            <h1 className="lg:text:6xl md:text-4xl text-2xl mb-3 font-semibold">
              Train on your own data
            </h1>
            <div className="morph p-5 md:p-10 mt-6 text-left leading-8">
              <b>Upload Your Stuff:</b> Mail us at{" "}
              <a href={`mailto:ashutosh@gmail.com?subject=Request to train my AI&body=I want to train my companion . Here are the documents i want to train my bot with. I am sharing this documents as per my own will and i am aware the platform's privacy policy.`}>
                <b>support@exambuddyai.com</b>
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

        <div id="pricing" className=" card_bg rounded-xl mb-3 flex text-center justify-center px-5 py-10 md:p-16 h-full">
          <div className="text-white">
            <h1 className="lg:text:6xl md:text-4xl text-2xl mb-3 font-semibold">
              Pricing
            </h1>

            <div className="morph p-5 md:p-10 mt-6 text-left leading-8">
              <div className="flex flex-wrap justify-center gap-10 ">
                {/* <div className="rounded-xl p-2 md:p-6 phone-1 max-w-sm flex flex-col gap-4">
                  <h1 className="font-bold">Free Plan</h1>
                  <p>You will be able to access the companion.</p>
                  <div>
                    <span className="font-bold text-xl">&#8377; 0</span>/month
                  </div>
                  <p>&#x2714; Free</p>
                  <Link
                    href={user ? "/chat" : "/login"}
                    className="login_btn p-4 rounded-md font-bold text-center text-white mt-auto"
                  >
                    Chat Now
                  </Link>
                </div> */}

                <div className="rounded-xl p-2 md:p-6 phone-1 max-w-sm flex flex-col gap-4">
                  <h1 className="font-bold">Premium Plan</h1>
                  <p>You will be able to access the companion</p>
                  <div>
                    <span className="font-bold text-xl">&#8377; 799</span>/month
                  </div>
                  <p>&#x2714; 24/7 Customer Support</p>
                  <button
                    disabled={loading}
                    // onClick={() =>
                    //   user
                    //     ? createSubscription("premium_plan")
                    //     : router.push("/login")
                    // }
                    onClick={()=>document.getElementById("my_modal_1").showModal()}
                    className="login_btn p-4 rounded-md font-bold text-center text-white mt-auto"
                  >
                    {loading ? (
                      <span className="loading loading-dots loading-sm "></span>
                    ) : (
                      "Get Plan"
                    )}
                  </button>
                </div>
                <div className="rounded-xl p-2 md:p-6 phone-1 max-w-sm flex flex-col gap-4">
                  <h1 className="font-bold">Supreme Plan</h1>
                  <p>
                    You will be able to access the companion 30 days for free
                    from the data of Joining{" "}
                  </p>

                  <div>
                    <span className="font-bold text-xl">&#8377; 7999</span>
                    /lifetime
                  </div>
                  <p>&#x2714; 24/7 Customer Support</p>
                  <p>&#x2714; LifeTime Access</p>
                  <p>&#x2714; Custom ChatBot With Own Data</p>
                  <button
                    disabled={loading}
                    // onClick={() =>
                    //   user ? displayRazorpay(799900) : router.push("/login")
                    // }
                    onClick={()=>document.getElementById("my_modal_1").showModal()}
                    className="login_btn p-4 rounded-md font-bold text-center text-white mt-auto"
                  >
                    {loading ? (
                      <span className="loading loading-dots loading-sm "></span>
                    ) : (
                      "Get Plan"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Toaster />
      </div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box text-center ">
          <h3 className="font-bold text-lg">
            Make payment and send screenshot to  <a  href={`mailto:ashutosh@gmail.com?subject=Payment Succesful.&body= Hello, ExamBuddy. I just made a payment to the provided UPI ID.Please activate my account as soon as possible`}>
                <b className="text-blue-700">support@exambuddyai.com</b>
            </a>
          </h3>
          <p className="py-4">
            Account will be activated in 24hrs of successful payment..
          </p>
          <img className="mx-auto" src="./Payment QR.jpg" alt="qr" />
        </div>
        <form>
        <button className="btn btn-sm mt-3">Close</button>
        </form>
      </dialog>
      <Footer />
    </>
  );
}
