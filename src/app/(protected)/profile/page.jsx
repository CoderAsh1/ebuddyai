"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import debounce from 'lodash/debounce';
import moment from "moment";

export default function page() {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getUser() {
    try {
      let res = await axios.get("/api/user");
      let refferedTo = await axios.post("/api/fetch_user",{field: "refferedBy" ,value : res.data.user.referralCode})
      setUser({...res.data.user,refferedTo : refferedTo.data.user});
    } catch (error) {
      console.log(user);
    } finally {
      setLoading(false);
    }
  }

  async function updateUser(){
    try {
        await axios.put("/api/user",user)
        toast.success("Profile updated successfully")
    } catch (error) {
        console.log(error)
        toast.error("Failed to update profile !")
    }
  }
  const debouncedUpdate = debounce(updateUser,600) 

  function copyToClip(){
    navigator.clipboard.writeText(`${user?.referralCode}`).then(()=>toast.success("Copied to clipboard"))
  }
console.log(user)
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-[90vh] card_bg">
      {loading ? (
        <span className="loading loading-spinner loading-lg text-white"></span>
      ) : (
        <div className="artboard artboard-horizontal w-[90vw] mt-10 md:mt-0 min-h-[70vh] md:min-w-[50vw] rounded-md card_blur p-5 md:p-10">
          <div className="flex flex-col w-full lg:flex-row h-full gap-7">
            <div className="grid flex-[2] h-full card card_blur rounded-xl place-items-center p-5">
              <div className="avatar">
                <div className="w-24 rounded-xl">
                  <img src={user?.image || "https://www.disneyplusinformer.com/wp-content/uploads/2021/06/Luca-Profile-Avatars-3.png"} />
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
                  value={user?.image}
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
                  <span className="label-text font-bold text-md ">
                    Referral Code <i className="hidden md:inline pointer" onClick={copyToClip}>copy</i>
                  </span>
                </label>
                <input
                  required
                  disabled
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  value={user?.referralCode}
                  onChange={(e) =>
                    setUser((prev) => ({ ...prev, referralCode: e.target.value }))
                  }
                />
              </div>
              <button className="ms-auto btn mt-5  bg-[#190978] hover:bg-[#211a47] text-white" onClick={debouncedUpdate}>
                Save
              </button>
            </div>
            <div className="flex-1 gap-5">
              <div className="gap-3 mb-5 card card_blur rounded-xl h-fit p-5">
                <h4 className="font-bold">Manage Subscription</h4>
                <div className="flex justify-between text-sm">
                  <p>Current Plan</p>
                  <p>{user?.subscriptionName}</p>
                </div>
                <div className="flex justify-between text-sm">
                  <p>Renews on</p>
                  <p>{user?.subscriptionRenewsOn && moment(user?.subscriptionRenewsOn).format("ddd DD MMM YYYY")}</p>
                </div>
                <button className=" text-xs p-2 rounded-md font-bold bg-[#fff8f8] hover:bg-[#aecbfc] ">
                  Update / Cancel Subscription
                </button>
              </div>
              <div className="gap-2 mb-5 card card_blur rounded-xl  p-5">
                <h4 className="font-bold">Refferd to</h4>
                <div>
                  {user?.refferedTo?.map(item=>(
                  <div className="flex justify-between text-xs">
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
     <Toaster/>
    </div>
  );
}
