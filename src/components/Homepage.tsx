import React from "react";
import CustomSearchbox from "./CustomSearchbox";
import Image from "next/image";
import Link from "next/link";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";

function Homepage() {
  return (
    <section className="mt-[70px] md:mt-8 xl:ml-32 px-4 w-full flex flex-col-reverse xl:flex-row text-black justify-between h-full gap-20 xl:gap-0">
      <div className="flex-center flex-col gap-32 xl:w-[900px]">
        <div className="bg-primary w-full flex-center flex-col rounded-full h-[220px] gap-4">
          <h1 className="place-self-center text-3xl xl:text-4xl text-white">
            Need Cash?
          </h1>
          <p className="text-xl text-white">Complete a task and get paid</p>

          <button className="border place-self-center rounded-2xl bg-white text-black p-2 font-bold mt-8 w-36 text-lg">
            <RegisterLink>Get Started</RegisterLink>
          </button>
        </div>

        <CustomSearchbox />
      </div>

      <div className="flex w-full items-center justify-center">
        <Image
          quality={100}
          src="https://res.cloudinary.com/talentql-inc/image/upload/v1700450597/talentql/bubble_hero_image_txypkx.png"
          alt=""
          width={300}
          height={30}
          objectFit="contain"
          className="inline-block w-[350px] xl:w-[600px] object-cover"
        />
      </div>
    </section>
  );
}

export default Homepage;
