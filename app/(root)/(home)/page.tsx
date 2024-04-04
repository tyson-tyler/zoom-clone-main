import MeetingTypeList from "@/components/MeetingTypeList";

import React from "react";

const page = () => {

  const now = new Date();
  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = now.toDateString();
  
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <div className="h-[300px] w-full rounded-md bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11 p-5">
           <a href="https://inter-fawn-psi.vercel.app/" target="_blank">
          <h2 className="bg-gray-800 max-w-[270px]  py-3 text-center text-base font-semibold rounded-md glow-on-hover">
           Go back to Mypager.
            </h2>
            </a>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl usespan">
              {time}
            </h1>
            <p className="text-lg  font-medium text-sky-1 lg:text-2xl">{date}</p>
          </div>
        </div>
        <div className="flex-center">
          <span className="usespan text-2xl text-center sm:text-2xl md:text-4xl lg:text-6xl pt-8 pb-8 font-semibold">Explore, the Video calling Features</span>
        </div>
        <MeetingTypeList />
      </div>
    </section>
  );
};

export default page;
