"use client";

import React, { useState } from "react";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "@/utils/HashLoader";

function AddUserRole() {
  const [role, setRole] = useState("creator");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:3000/api/user/${userId}`, {
        method: "PATCH",
        body: JSON.stringify({
          role,
        }),
      });
      if (response.ok) {
        if (role === "creator") {
          router.push("/creator/active-tasks");
        } else {
          router.push("/executor/feed");
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <form
      className="border flex-center flex-col gap-8 lg:w-[750px] w-fit h-[600px] lg:h-[450px] rounded-xl font-montserrat px-4 py-6"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-bold">Join as Creator or Executor</h2>
      <div className="flex flex-col lg:flex-row items-center gap-4">
        <label
          htmlFor="creator"
          className="border p-4 rounded-xl w-[250px] h-[170px] flex flex-col gap-2 cursor-pointer hover:border-primary hover:border-2"
        >
          <input
            id="creator"
            type="radio"
            value="creator"
            name="role"
            checked={role === "creator"}
            onChange={(e) => setRole(e.target.value)}
            className="place-self-end"
          />
          <div>
            <Image src="/content_creator.svg" alt="" width={80} height={80} />

            <p className="font-semibold">
              I&apos;m a creator, hiring for a project
            </p>
          </div>
        </label>
        <label
          htmlFor="executor"
          className="border p-4 rounded-xl w-[250px] h-[170px] flex flex-col gap-2 cursor-pointer hover:border-primary hover:border-2"
        >
          <input
            id="executor"
            type="radio"
            name="role"
            checked={role === "executor"}
            value="executor"
            onChange={(e) => setRole(e.target.value)}
            className="place-self-end"
          />
          <div className="flex flex-col gap-2">
            <Image src="/executor.svg" alt="" width={80} height={80} />

            <p className="font-semibold">
              I&apos;m an executor, looking for tasks
            </p>
          </div>
        </label>
      </div>

      <button
        type="submit"
        className="inline-block bg-primary py-1 px-4 w-[250px] text-white rounded-2xl text-xl font-semibold"
      >
        Submit
      </button>
    </form>
  );
}

export default AddUserRole;
