import React from "react";
import CustomSearchbox from "./CustomSearchbox";
import Image from "next/image";
import Link from "next/link";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";

function Homepage() {
  return (
    <section className="mt-[70px] md:mt-8 xl:ml-32 px-4 w-full flex text-black justify-between h-full">
      <div className="w-full flex-center flex-col gap-32">
        <div className="bg-primary w-full flex-center flex-col rounded-full h-[220px] gap-4">
          <h1 className="place-self-center text-3xl xl:text-4xl text-white">
            Need Cash?
          </h1>
          <p className="text-xl text-white">Complete a task and get paid</p>

          <button className="border place-self-center rounded-2xl bg-white text-black p-2 font-bold mt-8 w-36 text-lg">
            <RegisterLink> Get Started</RegisterLink>
          </button>
        </div>

        <CustomSearchbox />
      </div>

      <div className="xl:flex w-full items-center justify-center hidden">
        <Image
          quality={100}
          src="/mobile_search_green.svg"
          alt=""
          width={300}
          height={30}
          objectFit="contain"
          className="inline-block h-[500px]"
        />
      </div>
    </section>
  );
}

export default Homepage;
