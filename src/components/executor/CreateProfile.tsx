"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import { MdModeEditOutline } from "react-icons/md";
import Loading from "@/utils/HashLoader";

function CreateProfile({ user }: { user: any }) {
  const router = useRouter();
  const charCount = 600;
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [skillsArray, setSkillsArray] = useState<string[]>([]);
  const [categoriesArray, setCategoriesArray] = useState<string[]>([]);
  const [skills, setSkills] = useState("");
  const [categories, setCategories] = useState("");
  const [executor, setExecutor] = useState({
    title: "",
    bio: "",
    rate: "",
    education: {
      school: "",
      degree: "",
      start: "",
      end: "",
    },
    address: {
      country: "",
      city: "",
      town: "",
      street: "",
    },
    phone: "",
  });

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;

    if (name === "bio") {
      if (charCount - value.length >= 0) {
        setExecutor({ ...executor, [name]: value });
      }
    } else {
      setExecutor({
        ...executor,
        [name]: value,
        education: {
          ...executor.education,
          [name]: value,
        },
        address: {
          ...executor.address,
          [name]: value,
        },
      });
    }
  };

  const handleSkillInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkills(e.target.value);
  };

  const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && skills.trim() !== "") {
      setSkillsArray((prevSkills) => [...prevSkills, skills]);
      setSkills("");
    }
  };

  const handleCategoryInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCategories(e.target.value);
  };

  const handleCategoryKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && categories.trim() !== "") {
      setCategoriesArray((prevCategories) => [...prevCategories, categories]);
      setCategories("");
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    const userEducation = {
      school: executor.education.school,
      degree: executor.education.degree,
      start: executor.education.start,
      end: executor.education.end,
    };

    const userAddress = {
      country: executor.address.country,
      city: executor.address.city,
      town: executor.address.town,
      street: executor.address.street,
    };

    try {
      const response = await fetch("/api/executorProfile/", {
        method: "POST",
        body: JSON.stringify({
          image: selectedImage,
          title: executor.title,
          bio: executor.bio,
          categories: categoriesArray,
          skills: skillsArray,
          rate: executor.rate,

          education: userEducation,
          address: userAddress,
          phone: executor.phone,
          executorId: user?.id,
        }),
      });

      if (response.ok) {
        toast.success("Your profile has been updated");
        setTimeout(() => {
          router.push("/executor/profile");
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
    <article className="w-full max-w-full px-4 pb-5 m-auto font-montserrat">
      <h3 className="text-xl lg:text-2xl font-bold">
        Create your profile by telling us what you are about
      </h3>

      <div className="mt-10 rounded-xl mb-7 px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8 w-full">
          <div className="lg:w-[300px] w-full border rounded-xl flex-center flex-col p-6 gap-3 place-self-start">
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

              <button onClick={handleSubmit} className="font-semibold mt-5">
                Upload
              </button>
            </div>

            <div className="flex flex-col w-full gap-3">
              <label htmlFor="rate" className="text-center">
                Set your rate per hour
              </label>
              <input
                id="rate"
                type="number"
                name="rate"
                value={executor.rate}
                onChange={handleChange}
                className="border-2 h-9 p-2 focus:outline-primary w-full rounded-lg"
              />
            </div>
          </div>
          <div className="flex flex-col border rounded-lg p-4 h-full gap-4">
            <div className="flex flex-col gap-3">
              <label htmlFor="title" className="font-semibold">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={executor.title}
                onChange={handleChange}
                placeholder="Choose a professional title that really describe your skills"
                className="border-2 h-9 p-2 focus:outline-primary w-full rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="bio" className="font-semibold">
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                value={executor.bio}
                onChange={handleChange}
                placeholder="Help people get to know you at a glance. What skills do you have and
          what work do you do best? Tell them clearly."
                rows={8}
                className="border-2 p-2 focus:outline-primary w-full rounded-lg"
              ></textarea>
              <div className="place-self-end">
                <small
                  className={`${
                    executor.bio && charCount - executor.bio.length <= 50
                      ? "text-red-600"
                      : "text-gray-500"
                  }`}
                >
                  {executor.bio && charCount - executor.bio.length} characters
                  left
                </small>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="category" className="font-semibold">
                What are the main services you offer?
              </label>
              <div className="border-2 h-9 py-1 px-2 rounded-lg flex gap-3">
                {categoriesArray?.map((category, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-b/25 text-xs whitespace-nowrap p-2 rounded-lg"
                  >
                    <small className="text-xs">{category}</small>
                    <span
                      className="cursor-pointer"
                      onClick={() =>
                        setCategoriesArray((prevCategories) =>
                          prevCategories.filter((s, i) => i !== index)
                        )
                      }
                    >
                      ✖
                    </span>
                  </div>
                ))}

                <input
                  type="text"
                  id="category"
                  value={categories}
                  placeholder="Enter your services.. e.g: Web Design"
                  className="w-full outline-none h-full"
                  onChange={handleCategoryInputChange}
                  onKeyDown={handleCategoryKeyDown}
                />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="skills" className="font-semibold">
                Your skills show creators what you can offer.
              </label>
              <div className="border-2 h-9 py-1 px-2 rounded-lg flex gap-3">
                {skillsArray?.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-b/25 text-xs whitespace-nowrap p-2 rounded-lg"
                  >
                    <small className="text-xs">{skill}</small>
                    <span
                      className="cursor-pointer"
                      onClick={() =>
                        setSkillsArray((prevSkills) =>
                          prevSkills.filter((s, i) => i !== index)
                        )
                      }
                    >
                      ✖
                    </span>
                  </div>
                ))}
                <input
                  type="text"
                  id="skills"
                  value={skills}
                  placeholder="Enter skills here"
                  className="w-full outline-none h-full"
                  onChange={handleSkillInputChange}
                  onKeyDown={handleSkillKeyDown}
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label htmlFor="education" className="font-semibold">
                Creators like to know how much you know
              </label>
              <div className="flex flex-col lg:flex-row gap-4">
                <input
                  type="text"
                  id="education"
                  name="school"
                  value={executor.education.school}
                  onChange={handleChange}
                  placeholder="University Of Ibadan"
                  className="border-2 h-9 p-2 focus:outline-primary w-full rounded-lg"
                />
                <input
                  type="text"
                  name="degree"
                  value={executor.education.degree}
                  onChange={handleChange}
                  placeholder="BSc, Psychology"
                  className="border-2 h-9 p-2 focus:outline-primary w-full rounded-lg"
                />
                <input
                  type="text"
                  name="start"
                  value={executor.education.start}
                  onChange={handleChange}
                  placeholder="From"
                  className="border-2 h-9 p-2 focus:outline-primary w-full rounded-lg"
                />
                <input
                  type="text"
                  name="end"
                  value={executor.education.end}
                  onChange={handleChange}
                  placeholder="to"
                  className="border-2 h-9 p-2 focus:outline-primary w-full rounded-lg"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3">
                <label htmlFor="country" className="font-semibold">
                  Country
                </label>
                <input
                  id="country"
                  type="text"
                  name="country"
                  value={executor.address.country}
                  onChange={handleChange}
                  className="border-2 h-9 p-2 focus:outline-primary w-full rounded-lg"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="city" className="font-semibold">
                  City
                </label>
                <input
                  id="city"
                  type="text"
                  name="city"
                  value={executor.address.city}
                  onChange={handleChange}
                  className="border-2 h-9 p-2 focus:outline-primary w-full rounded-lg"
                />
              </div>
              <div className="flex flex-col lg:flex-row gap-5 w-full">
                <div className="flex flex-col w-full gap-3">
                  <label htmlFor="town" className="font-semibold">
                    Town
                  </label>
                  <input
                    id="town"
                    type="text"
                    name="town"
                    value={executor.address.town}
                    onChange={handleChange}
                    className="border-2 h-9 p-2 focus:outline-primary w-full rounded-lg"
                  />
                </div>
                <div className="flex flex-col w-full gap-3">
                  <label htmlFor="street" className="font-semibold">
                    Street
                  </label>
                  <input
                    id="street"
                    name="street"
                    type="text"
                    value={executor.address.street}
                    onChange={handleChange}
                    className="border-2 h-9 p-2 focus:outline-primary w-full rounded-lg"
                  />
                </div>
              </div>
              <div className="flex flex-col lg:flex-row gap-5 w-full">
                <div className="flex flex-col w-full gap-3">
                  <label htmlFor="phone" className="font-semibold">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    value={executor.phone}
                    onChange={handleChange}
                    className="border-2 h-9 p-2 focus:outline-primary w-full rounded-lg"
                  />
                </div>
              </div>
            </div>
            {loading ? (
              <button
                type="button"
                className="bg-gradient-to-r from-blue-500 to-primary text-white py-2 px-4 rounded-full transition-opacity duration-300 ease-in-out opacity-75 hover:opacity-100 cursor-not-allowed"
                disabled
              >
                Sending...
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="bg-primary rounded-2xl place-self-end text-white py-1 px-6 lg"
              >
                Save
              </button>
            )}
          </div>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </article>
  );
}

export default CreateProfile;
