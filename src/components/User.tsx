import React from "react";
import Image from "next/image";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";

interface UserProps {
  imageString: string;
  imageAlt: string;
  title: string;
  desc1: string;
  desc2: string;
  desc3: string;
  action: string;
}

function User({
  imageString,
  imageAlt,
  title,
  desc1,
  desc2,
  desc3,
  action,
}: UserProps) {
  return (
    <div className="flex-center gap-16 xl:gap-32 flex-col xl:flex-row p-4">
      <Image src={imageString} alt={imageAlt} width={300} height={300} />
      <div className="flex flex-col gap-4">
        <h2 className="font-bold text-2xl xl:text-3xl">{title}</h2>
        <div className="mt-4 flex flex-col gap-6">
          <ul className="xl:list-disc text-lg xl:text-xl flex flex-col gap-4 text-gray-600">
            <li>{desc1}</li>
            <li>{desc2}</li>
            <li className={`${desc3 === "" && "hidden"}`}>{desc3}</li>
          </ul>
          <div className="text-center">
            <RegisterLink>
              <button className="border border-primary bg-primary p-2 rounded-xl text-white text-lg xl:text-xl">
                {action}
              </button>
            </RegisterLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
