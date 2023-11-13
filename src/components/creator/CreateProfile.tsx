"use client";

import Image from "next/image";
import React, { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Loading from "@/utils/HashLoader";

function CreateProfile({ user }: { user: any }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState({
    city: "",
    country: "",
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setLocation({
      ...location,
      [name]: value,
    });
  };

  const handleImageUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          setSelectedImage(result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const userLocation = {
      city: location.city,
      country: location.country,
    };

    try {
      const response = await fetch(`/api/creatorProfile`, {
        method: "POST",
        body: JSON.stringify({
          image: selectedImage,
          location: userLocation,
          userId: user.id,
        }),
      });

      if (response.ok) {
        toast.success("Your profile has been updated");
        setTimeout(() => {
          router.push("/creator/profile");
        }, 3000);
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
    <article className="w-full max-w-full px-4 pb-5 m-auto font-montserrat flex items-center justify-center flex-col">
      <h3 className="text-xl lg:text-2xl font-bold mb-10">
        Create your profile by telling us a bit about yourself
      </h3>

      <form
        className="w-full border rounded-xl flex-center flex-col p-6 gap-3 place-self-start"
        onSubmit={handleSubmit}
      >
        <div className="w-full flex-center flex-col pb-3">
          <div className="relative">
            <Image
              src={selectedImage ?? "/no-profile-icon.png"}
              alt="profile picture"
              width={100}
              height={100}
              className="rounded-full w-[150px] h-[150px] object-cover"
            />

            <label
              htmlFor="photo"
              className="h-fit w-fit p-1 rounded-full border border-primary bg-primary text-white absolute top-0 right-0 cursor-pointer"
            >
              <input
                type="file"
                id="photo"
                accept="image/*"
                onChange={handleImageUpdate}
                className="hidden"
              />
              <MdModeEditOutline />
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <p className="font-semibold">What part of the world do you live?</p>
          <div>
            <label htmlFor="city" className="text-center">
              City
            </label>
            <input
              id="city"
              type="text"
              name="city"
              value={location.city}
              onChange={handleChange}
              className="border-2 h-9 p-2 focus:outline-primary w-full rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="country" className="text-center">
              Country
            </label>
            <input
              id="country"
              type="text"
              name="country"
              value={location.country}
              onChange={handleChange}
              className="border-2 h-9 p-2 focus:outline-primary w-full rounded-lg"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-primary rounded-lg py-2 px-5 text-white font-bold"
        >
          Submit
        </button>
      </form>

      <Toaster position="top-center" reverseOrder={false} />
    </article>
  );
}

export default CreateProfile;
