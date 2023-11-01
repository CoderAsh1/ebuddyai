"use client";
import axios from "axios";
import { getSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { setCookie } from "cookies-next";



export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [navigating, setNavigating] = useState(true);

  async function handleLogin(e) {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post("/api/login", user);
      let userInfo = await axios.get("/api/user");
      if (!userInfo?.data?.user?.isVerified) {
        await axios.put("/api/send_code", {
          email: user.email,
          type: "VERIFY",
        });
        toast.success("Code has been sent to your email.");
        return router.push("/verifyemail");
      }
      if (!user.isSubscribed) {
        return router.push("/");
      }
      router.push(
        userInfo?.data?.user?.hasCompanion ? "/chat" : "/choose_companion"
      );
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  }

  async function sendCode() {
    try {
      if (!user.email) return toast.error("Please enter email !");

      let userData = await axios.post("/api/fetch_user", {
        field: "email",
        value: user.email,
      });
      if (userData?.data?.user?.length === 0)
        return toast.error("User not found !");

      await axios.put("/api/send_code", { email: user.email, type: "RESET" });
      toast.success("Code has been sent to your email.");
      router.push(`/reset_password?id=${user.email}`);
    } catch (error) {
      console.log(error);
      toast.error("Failed to send code.");
    }
  }

  async function getAuthUser() {
    try {
    const session = await getSession();
    if (session) setNavigating(true);
    else return setNavigating(false);

    let userInfo = await axios.post("/api/fetch_user", {
      field: "email",
      value: session.user.email,
    });

    if(userInfo.data.user.length === 0){
        toast.error("Incorrect Info")
        signOut()
        setNavigating(false)
        return
    }
    const user = userInfo.data.user[0]
    setCookie("userId",user._id)
    
    if (!user.isSubscribed) {
        return router.push("/");
      }
      router.push(
        user?.hasCompanion ? "/chat" : "/choose_companion"
        );
        console.log(user)

        
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
    getAuthUser();
  }, []);


  return (
    <div className="flex justify-center items-center h-screen w-screen  bg-blue-100 card_bg p-10">
      <div className="card_blur md:p-10 px-5 py-7  lg:w-[30vw] min-w-[300px]">
        <div className="text-center font-bold text-xl ">ExamBuddyAI</div>
        {navigating ? (
          <div className="text-center mt-6">
              <span className="loading loading-spinner loading-lg "></span>
            </div>
        ) : (
          <form onSubmit={handleLogin}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold text-md">Email</span>
              </label>
              <input
                required
                autoFocus
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full "
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text font-bold ">Password</span>
                <span
                  className="label-text-alt font-semibold cursor-pointer"
                  onClick={sendCode}
                >
                  Forget Password ?
                </span>
              </label>
              <input
                required
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, password: e.target.value }))
                }
              />
            </div>
            {loading ? (
              <button className="btn w-full mt-4 bg-grad bg-gradient-to-l from-fuchsia-600 via-violet-900 to-indigo-600 text-white">
                <span className="loading loading-spinner"></span>
              </button>
            ) : (
              <>
              <button className="btn w-full mt-4 bg-gradient-to-l from-fuchsia-600 via-violet-900 to-indigo-600 text-white hover:bg-gradient-to-l from-voilet-600 ">
                Login
              </button>
              <div className="text-center">-OR-</div>
              <button type="button" onClick={() =>{
                setLoading(true)
                signIn("google")}}  className="btn w-full mt-1  ">
             Login with <img src="./google.png"/>
            </button>
              </>
            )}
            <div className="text-center mt-5 text-sm text-slate-700">
              Don't have an Account ?
            </div>
            <Link href="/signup">
              <button
                className="btn w-full mt-4 text-white bg-[#190978] hover:bg-[#211a47]"
                type="button"
              >
                Register Now
              </button>
            </Link>
          </form>
        )}
      </div>
      <Toaster />
    </div>
  );
}
