"use client";

import axios from "axios";
import moment from "moment";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center text-center h-[90vh]">
        <div className="bg-blue-100 ">
          <iframe
            data-retune-chat={process.env.NEXT_PUBLIC_RETUNE_ID_BHAGWAT}
            className="w-[100vw] h-[90vh]"
          ></iframe>
          <Script
            id="retune.so/frame1"
            src={`https://retune.so/api/script/chat.js?iframe&id=${process.env.NEXT_PUBLIC_RETUNE_ID_BHAGWAT}`}
            async
          ></Script>
        </div>
    </div>
  );
}
