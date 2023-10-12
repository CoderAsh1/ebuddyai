"use client";

import axios from "axios";
import moment from "moment";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useEffect, useState } from "react";

export default function page() {
  const router = useRouter();

  const [user, setUser] = useState({});
  const [loader, setLoader] = useState(true);

  async function getUser() {
    try {
      let user = await axios.get("/api/user");
      if (!user.data.user.isVerified) {
        return router.push("/verifyemail");
      }
      if (!user.data.user.hasCompanion) {
        return router.push("/choose_companion");
      }
      setUser(user.data.user);
    } catch (error) {
      console.log(error, "this is the error");
    } finally {
      setLoader(false);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  if(loader) return  <span className="loading loading-spinner loading-lg text-white"></span>

  return (
    <div className="flex justify-center items-center text-center h-[90vh]">
      {!user?.isSubscribed && moment.unix(user.freeTill).isBefore(moment()) ? (
        <div className="flex justify-center items-center flex-col">
          <img src="./no_payment.webp" alt="no" height={100} width={100} />
          <p className="mb-3">Credits Expired</p>
          <div>
            {" "}
            Please{" "}
            <button
              className="btn-sm rounded-lg  bg-[#382b98] hover:bg-[#241c65] text-white"
              onClick={() => router.push("/#pricing")}
            >
              Subscribe
            </button>{" "}
            to continue
          </div>
        </div>
      ) : (
        <div className="bg-blue-100 ">
          <iframe
            data-retune-chat={process.env.NEXT_PUBLIC_RETUNE_ID}
            className="w-[100vw] h-[90vh]"
          ></iframe>
          <Script
            id="retune.so/frame"
            src={`https://retune.so/api/script/chat.js?iframe&id=${process.env.NEXT_PUBLIC_RETUNE_ID}`}
            defer
          ></Script>
        </div>
      )}
    </div>
  );
}
