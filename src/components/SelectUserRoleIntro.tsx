import Link from "next/link";
import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

async function SelectUserRoleIntro() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="max-w-md text-center">
        <h1 className="text-5xl font-bold mb-4">Hurrayyyy! 🚀</h1>
        <p className="text-lg mb-6">
          Awesome! You&apos;ve just joined Urgent2k, the place where magic
          happens. Now, let&apos;s decide your role:
        </p>
        <div className="mb-8">
          <h2 className="text-3xl font-semibold mb-2">Choose Your Role:</h2>
          <p className="text-lg mb-4">
            <span className="font-bold">Creators:</span> You are the dreamers,
            the visionaries, the magic makers! Whether you&apos;re looking to
            bring your ideas to life or need a helping hand, Urgent2k is your
            creative playground.
          </p>
          <p className="text-lg mb-4">
            <span className="font-bold">Executors:</span> You are the doers, the
            achievers, the task conquerors! Earn while you learn and showcase
            your skills. Urgent2k is your platform to grow and shine.
          </p>
          <Link
            href={`/user/role/select?id=${user?.id}`}
            className="bg-primary px-6 py-2 rounded-lg mt-4 text-white inline-block text-xl font-semibold"
          >
            Select user role
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SelectUserRoleIntro;
