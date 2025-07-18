"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useRef } from "react";

export default function Signup() {
  const pinRef = useRef(null);
  const pinVisiblity = () => {
    if (pinRef.current.type == "password"){

      pinRef.current.type = "text"
    } else {
      pinRef.current.type = "password"
    }
  }
  return (
    <div className="mx-40 mt-5 flex h-dvh min-w-70 flex-col py-5">
      <div className="w-full text-left text-2xl font-medium">Sign Up</div>
      <div className="mt-6 flex h-10 w-[80%] items-center gap-2 rounded-xl border-[0.1rem] border-[#cccccc] p-2">
        <FontAwesomeIcon icon={faUser} className="max-h-5 max-w-5" />
        <input
          className="h-full w-full outline-none"
          type="text"
          name=""
          id=""
          placeholder="John Deo"
        />
      </div>
      <div className="mt-6 flex h-10 w-[80%] items-center gap-2 rounded-xl border-[0.1rem] border-[#cccccc] p-2">
        <FontAwesomeIcon icon={faPhone} className="max-h-4 max-w-4" />
        <input
          className="h-full w-full outline-none"
          type="number"
          name=""
          id=""
          placeholder="9876543210"
        />
      </div>
      <div className="mt-6 flex h-10 w-[80%] items-center gap-2 rounded-xl border-[0.1rem] border-[#cccccc] p-2">
        <FontAwesomeIcon icon={faLock} className="max-h-4 max-w-4" />
        <input
          className="h-full w-full outline-none"
          ref={pinRef}
          type="password"
          name=""
          id=""
          placeholder="1234"
        />

        
        <FontAwesomeIcon icon={faEyeSlash} className="max-h-4 max-w-4" onClick={pinVisiblity} />
      </div>
    </div>
  );
}
