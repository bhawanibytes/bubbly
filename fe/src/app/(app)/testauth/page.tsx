import Link from "next/link";
import React from "react";

function page() {
  return (
    <>
      <div>OAuth-Page</div>
      <div>{`Link here==>`} </div>
      <Link
        href={"http://localhost:4000/google/auth"}
        className="min-h-8 min-w-10 rounded-2xl border-1 border-gray-600 px-2 shadow-2xl"
      >
        {" "}
        Click Me, I am box
      </Link>
    </>
  );
}

export default page;
