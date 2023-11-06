"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import debounce from "lodash/debounce";
import moment from "moment";
import Script from "next/script";
import Link from "next/link";

export default function page() {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getUser() {
    try {
      let res = await axios.get("/api/user");
      let refferedTo = await axios.post("/api/fetch_user", {
        field: "refferedBy",
        value: res.data.user.referralCode,
      });
      setUser({ ...res.data.user, refferedTo: refferedTo.data.user });
    } catch (error) {
      console.log(user);
    } finally {
      setLoading(false);
    }
  }

  async function updateUser() {
    try {
      await axios.put("/api/user", user);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile !");
    }
  }

  function copyToClip() {
    navigator.clipboard
      .writeText(`${process.env.NEXT_PUBLIC_DOMAIN}/signup?referral=${user?.referralCode}`)
      .then(() => toast.success("Copied to clipboard"));
  }

  async function cancelSub() {
    try {
      setLoading(true)
      await axios.post("/api/cancel_subscription", {
        subscriptionId: user?.subscriptionId,
      });
      toast.success("Subscription cancelled.");
      getUser()
    } catch (error) {
      console.log(error);
      toast.error("Failed to cancel Subscription.");
    }finally{setLoading(false)}
  }

  const debouncedUpdate = debounce(updateUser, 600);
  const debouncedCancelSub = debounce(cancelSub, 600);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-[90vh] card_bg z-1">
      {loading ? (
        <span className="loading loading-spinner loading-lg text-white"></span>
      ) : (
        <div className="artboard artboard-horizontal w-[90vw] mt-10 md:mt-0 min-h-[70vh] md:min-w-[50vw] rounded-md p-5 md:p-10 z-1">
          <div className="flex flex-col w-full lg:flex-row h-full gap-7">
            <div className="grid flex-[2] h-full card card_blur rounded-xl place-items-center p-5">
              <div className="avatar">
                <div className="w-24 rounded-xl">
                  <img src={user?.image || "/policy-bg.svg"} />
                </div>
              </div>
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text font-bold text-md ">
                    Profile Photo
                  </span>
                </label>
                <input
                  required
                  type="text"
                  placeholder="Paste link here"
                  className="input input-bordered w-full"
                  value={user?.image || ""}
                  onChange={(e) =>
                    setUser((prev) => ({ ...prev, image: e.target.value }))
                  }
                />
              </div>
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text font-bold text-md ">Name</span>
                </label>
                <input
                  required
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  value={user?.name}
                  onChange={(e) =>
                    setUser((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text font-bold text-md ">Email</span>
                </label>
                <input
                  required
                  disabled
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  value={user?.email}
                  onChange={(e) =>
                    setUser((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
              </div>
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text font-bold text-md cursor-pointer">
                    Referral Link{" "}
                    <i
                      className="hidden md:inline"
                      onClick={copyToClip}
                    >
                      (copy link)
                    </i>
                  </span>
                </label>
                <input
                  required
                  disabled
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  value={process.env.NEXT_PUBLIC_DOMAIN +"/signup?referral=" +user?.referralCode}
                  onChange={(e) =>
                    setUser((prev) => ({
                      ...prev,
                      referralCode: e.target.value,
                    }))
                  }
                />
              </div>
              <button
                className="ms-auto btn mt-5  bg-[#190978] hover:bg-[#211a47] text-white"
                onClick={debouncedUpdate}
              >
                Save
              </button>
            </div>
            <div className="flex-1 gap-5">
              <div className="gap-3 mb-5 card card_blur rounded-xl h-fit p-5">
                <h4 className="font-bold">Manage Subscription</h4>
                <div className="flex justify-between text-sm">
                  <p>Current Plan</p>
                  <p>{user?.subscriptionName || "Free Plan"}</p>
                </div>
                <div className="flex justify-between text-sm">
                  {console.log(user)}
                  <p>Renews on</p>
                  <p>
                    {user?.subscriptionRenewsOn &&
                      moment(user?.subscriptionRenewsOn).format(
                        "ddd DD MMM YYYY"
                      )}
                    {user?.subscriptionRenewsOn === false &&
                      "Lifetime"}
                  </p>
                </div>
                {/* {user.isSubscribed ? (
                  <button
                    className=" text-xs p-2 rounded-md font-bold bg-[#fff8f8] hover:bg-[#aecbfc] "
                    onClick={() =>document.getElementById("my_modal_1").showModal()}
                  >
                    Cancel Subscription
                  </button>
                ) : (
                  <Link href="/#pricing" className="text-center text-xs p-2 rounded-md font-bold bg-[#fff8f8] hover:bg-[#aecbfc] ">
                    Explore plans
                  </Link>
                )} */}
                 <Link href="/#pricing" className="text-center text-xs p-2 rounded-md font-bold bg-[#fff8f8] hover:bg-[#aecbfc] ">
                    Explore plans
                  </Link>
                {user?.isSubscribed ? (
                  <Link href={`mailto:ashutosh@gmail.com?subject=Request to train my AI&body=Hi, I am ${user.name}.I want to train my companion . Here are the documents i want to train my bot with. I am sharing this documents as per my own will and i am aware the platform's privacy policy.`}
                  className="text-center text-xs p-2 rounded-md font-bold bg-[#fff8f8] hover:bg-[#aecbfc] "
                  >
                    Send Request to Train your AI
                  </Link>
                    ) :  <button disabled
                    className=" text-xs p-2 rounded-md font-bold bg-[#fff8f8]"
                  >
                    Subscribe to Send Request to Train your AI
                  </button>}
              </div>
              <div className="gap-2 mb-5 card card_blur rounded-xl  p-5">
                <h4 className="font-bold">Reffered to</h4>
                <div>
                  {user?.refferedTo?.map((item) => (
                    <div
                      key={item.email}
                      className="flex justify-between text-xs"
                    >
                      <p>{item.name}</p>
                      <p>{item.email}</p>
                      <p>{item.subscriptionName || "Free Plan"}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Do you really want to cancel your Subscription ?
          </h3>
          <p className="py-4">
            You won't be able to access the comapnion anymore.
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn" onClick={debouncedCancelSub}>
                Yes
              </button>
              <button className="btn bg-black text-white ms-1">No</button>
            </form>
          </div>
        </div>
      </dialog>
      <Toaster />
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
    </div>
  );
}
