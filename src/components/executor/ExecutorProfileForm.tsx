"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";

function TaskForm() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const charCount = 600;
  const [loading, setLoading] = useState(false);
  const [executor, setExecutor] = useState({
    title: "",
    bio: "",
    category: "",
    skills: "",
    rate: 0,
    experience: {
      jobTitle: "",
      company: "",
      start: "",
      end: "",
    },
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
        experience: {
          ...executor.experience,
          [name]: value,
        },
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/create-profile/${session?.user.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: executor.title,
          bio: executor.bio,
          category: executor.category,
          skills: executor.skills,
          rate: executor.rate,
          experience: {
            jobTitle: executor.experience.jobTitle,
            company: executor.experience.company,
            start: executor.experience.start,
            end: executor.experience.end,
          },
          education: {
            school: executor.education.school,
            degree: executor.education.degree,
            start: executor.education.start,
            end: executor.education.end,
          },
          address: {
            country: executor.address.country,
            city: executor.address.city,
            town: executor.address.town,
            street: executor.address.street,
          },
          phone: executor.phone,
          executorId: session?.user.id,
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

  if (status === "unauthenticated") {
    router.push("/");
  }

  return (
    <article className="w-full max-w-full px-4 pb-5 m-auto font-montserrat">
      <h3 className="text-xl lg:text-2xl font-bold">
        Tell us what you are about
      </h3>

      <div className="border-2 mt-10 rounded-xl mb-7 px-4 py-8">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">
              Add a title to tell everyone what you do
            </label>
            <input
              type="text"
              name="title"
              value={executor.title}
              onChange={handleChange}
              placeholder="Choose a professional title that really describe your skills"
              className="border-2 h-9 p-2 focus:outline-primary w-full rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="bio">
              Write a bio to tell the world about yourself
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
                  charCount - executor.bio.length <= 50
                    ? "text-red-600"
                    : "text-gray-500"
                }`}
              >
                {charCount - executor.bio.length} characters left
              </small>
            </div>
          </div>
          <div>
            <label htmlFor="category">
              What are the main services you offer?
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={executor.category}
              onChange={handleChange}
              placeholder="Web Design"
              className="border-2 h-9 p-2 focus:outline-primary w-full rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="skills">
              Your skills show creators what you can offer.
            </label>
            <input
              type="text"
              id="skills"
              name="skills"
              value={executor.skills}
              onChange={handleChange}
              placeholder="Enter skills here"
              className="border-2 h-9 p-2 focus:outline-primary w-full rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="jobTitle">Relevant work experience(s).</label>
            <div className="flex gap-4">
              <input
                type="text"
                id="jobTitle"
                name="jobTitle"
                value={executor.experience.jobTitle}
                onChange={handleChange}
                placeholder="Software Developer"
                className="border-2 h-9 p-2 focus:outline-primary w-full rounded-lg"
              />
              <input
                type="text"
                name="company"
                value={executor.experience.company}
                onChange={handleChange}
                placeholder="Google"
                className="border-2 h-9 p-2 focus:outline-primary w-full rounded-lg"
              />
              <input
                type="text"
                name="start"
                value={executor.experience.start}
                onChange={handleChange}
                placeholder="From"
                className="border-2 h-9 p-2 focus:outline-primary w-full rounded-lg"
              />
              <input
                type="text"
                name="end"
                value={executor.experience.end}
                onChange={handleChange}
                placeholder="to"
                className="border-2 h-9 p-2 focus:outline-primary w-full rounded-lg"
              />
            </div>
          </div>
          <div>
            <label htmlFor="education">
              Creators like to know how much you know
            </label>
            <div className="flex gap-4">
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
            <div className="flex flex-col">
              <label htmlFor="country">Country</label>
              <input
                id="country"
                type="text"
                name="country"
                value={executor.address.country}
                onChange={handleChange}
                className="border-2 h-9 p-2 focus:outline-primary w-full rounded-lg"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="city">City</label>
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
              <div className="flex flex-col w-full">
                <label htmlFor="town">Town</label>
                <input
                  id="town"
                  type="text"
                  name="town"
                  value={executor.address.town}
                  onChange={handleChange}
                  className="border-2 h-9 p-2 focus:outline-primary w-full rounded-lg"
                />
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="street">Street</label>
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
              <div className="flex flex-col w-full">
                <label htmlFor="rate">
                  Rate per hour for the services you offer
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
              <div className="flex flex-col w-full">
                <label htmlFor="phone">Phone</label>
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
              type="submit"
              className="bg-primary rounded-2xl place-self-end text-white py-1 px-6 lg"
            >
              Save
            </button>
          )}
        </form>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </article>
  );
}

export default TaskForm;
