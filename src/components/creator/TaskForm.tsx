"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/firebase";
import toast, { Toaster } from "react-hot-toast";
import { ImAttachment } from "react-icons/im";
import { FiImage } from "react-icons/fi";

function TaskForm() {
  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState<string | null>(null);
  const [docFile, setDocFile] = useState<File | null>(null);
  const [filename, setFilename] = useState<string | null>(null);
  const [skillsArray, setSkillsArray] = useState<string[]>([]);
  const [categoriesArray, setCategoriesArray] = useState<string[]>([]);
  const [skills, setSkills] = useState("");
  const [categories, setCategories] = useState("");
  const [task, setTask] = useState({
    title: "",
    description: "",
    budget: "",
    experience: "Beginner",
    pricing: "Fixed rate",
    payRate: "",
    duration: "Less than one month",
    timeRequirement: "",
  });
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");

  const router = useRouter();

  const charCount = 1000;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.currentTarget;
    if (name === "description") {
      if (charCount - value.length >= 0) {
        setTask({ ...task, [name]: value });
      }
    } else if (name === "budget") {
      setTask({
        ...task,
        [name]: value,
        payRate: value ? "" : task.payRate, // Clear payRate if budget is entered
        pricing: value ? "Fixed rate" : task.pricing, // Set pricing based on input
      });
    } else if (name === "payRate") {
      setTask({
        ...task,
        [name]: value,
        budget: value ? "" : task.budget, // Clear budget if payRate is entered
        pricing: value ? "Hourly" : task.pricing, // Set pricing based on input
      });
    } else {
      setTask({ ...task, [name]: value });
    }
  };

  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        // Check if the selected file is an image
        if (selectedFile.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = () => {
            const result = reader.result as string;
            setImg(result);
          };
          reader.readAsDataURL(selectedFile);
          setDocFile(null);
          setFilename(selectedFile.name);
        } else {
          console.log("Selected file is not an image.");
        }
      }
    }
  };

  const handleDocumentFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        const allowedExtensions = [
          ".doc",
          ".docx",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          ".pdf",
          "application/pdf",
        ];
        if (
          allowedExtensions.includes(selectedFile.type) ||
          allowedExtensions.includes(selectedFile.name.toLowerCase())
        ) {
          setDocFile(selectedFile);
          setImg(null);
          setFilename(selectedFile.name);
        } else {
          console.log("Selected file is not a valid document.");
        }
      }
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

  const uploadFileToFirebase = async (file: File) => {
    const storageRef = ref(storage, `task-attachment/${filename}`);
    await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (docFile) {
        const downloadUrl = await uploadFileToFirebase(docFile);
        const response = await fetch("/api/create-task", {
          method: "POST",
          body: JSON.stringify({
            title: task.title,
            description: task.description,
            img: img,
            docFile: downloadUrl,
            filename: filename,
            categories: categoriesArray,
            skills: skillsArray,
            budget: task.budget,
            experience: task.experience,
            pricing: task.pricing,
            payRate: task.payRate,
            duration: task.duration,
            timeRequirement: task.timeRequirement,
            creatorId: userId,
          }),
        });

        toast.success("Your new task has been created");

        if (response.ok) {
          router.push("/creator/active-tasks");
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <article className="w-full max-w-full px-4 pb-5 m-auto font-montserrat">
      <h3 className="text-xl lg:text-2xl font-bold">Task Details</h3>

      <div className="border-2 mt-10 rounded-xl mb-7 px-4 py-8">
        <div className="flex flex-col gap-8">
          <div>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="UI/UX Designer | Web Developer"
              value={task.title}
              onChange={handleChange}
              className="border-2 placeholder:text-sm h-9 p-2 focus:outline-primary w-full rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Describe what you need"
              value={task.description}
              onChange={handleChange}
              rows={6}
              className="border-2 placeholder:text-sm p-2 focus:outline-primary w-full rounded-lg"
            ></textarea>
            <div className="flex items-center justify-between mt-2">
              <div className="flex w-16 items-center justify-between">
                <label
                  htmlFor="imageFile"
                  className="hover:bg-c cursor-pointer h-8 w-8 flex items-center justify-center rounded-lg"
                >
                  <input
                    type="file"
                    id="imageFile"
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handleImageFile}
                  />
                  <FiImage />
                </label>
                <label
                  htmlFor="documentFile"
                  className="hover:bg-c cursor-pointer h-8 w-8 flex items-center justify-center rounded-lg"
                >
                  <input
                    type="file"
                    id="documentFile"
                    accept=".doc, .docx, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, .pdf, application/pdf"
                    style={{ display: "none" }}
                    onChange={handleDocumentFile}
                  />

                  <ImAttachment />
                </label>
              </div>
              <small
                className={`${
                  charCount - task.description.length <= 50
                    ? "text-red-600"
                    : "text-gray-500"
                }`}
              >
                {charCount - task.description.length} characters left
              </small>
            </div>
            {filename && (
              <div className="bg-white shadow-xl p-3 rounded-lg max-w-[300px]">
                <div className="flex items-center gap-4 w-full">
                  <p
                    className="w-full"
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {filename}
                  </p>
                  <span
                    className="font-bold text-red-600 rounded-full cursor-pointer shadow-xl"
                    onClick={() => setFilename(null)}
                  >
                    ✖
                  </span>
                </div>
              </div>
            )}
          </div>
          <div>
            <label htmlFor="category">Category</label>
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
                placeholder="Enter the task categories.. e.g: Web Design"
                className="w-full outline-none h-full"
                onChange={handleCategoryInputChange}
                onKeyDown={handleCategoryKeyDown}
              />
            </div>
          </div>
          <div>
            <label htmlFor="skills">Skills</label>
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
                placeholder="Enter task specific skills here"
                className="w-full outline-none h-full"
                onChange={handleSkillInputChange}
                onKeyDown={handleSkillKeyDown}
              />
            </div>
          </div>
          <div>
            <label htmlFor="budget">Budget</label>
            <input
              id="budget"
              name="budget"
              value={task.budget}
              onChange={handleChange}
              type="text"
              placeholder="50,000"
              className={`border-2 placeholder:text-sm h-9 p-2 focus:outline-primary w-full rounded-lg ${
                task.payRate ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={task.payRate !== ""}
            />
          </div>

          <div>
            <label htmlFor="payRate">Pay rate</label>
            <input
              id="payRate"
              name="payRate"
              value={task.payRate}
              onChange={handleChange}
              type="text"
              placeholder="250 - 500"
              className={`border-2 placeholder:text-sm h-9 p-2 focus:outline-primary w-full rounded-lg ${
                task.budget ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={task.budget !== ""}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="pricing">Pricing</label>
            <select
              name="pricing"
              value={task.pricing}
              className="border-2 h-9 focus:outline-primary w-full rounded-lg"
              onChange={handleChange}
              disabled
            >
              <option value="Fixed rate">Fixed rate</option>
              <option value="Hourly">Hourly</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="experience">Experience</label>
            <select
              name="experience"
              value={task.experience}
              className="border-2 h-9 focus:outline-primary w-full rounded-lg"
              onChange={handleChange}
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Expert">Expert</option>
            </select>
          </div>

          <div>
            <label htmlFor="duration">Duration</label>
            <select
              name="duration"
              value={task.duration}
              className="border-2 h-9 focus:outline-primary w-full rounded-lg"
              onChange={handleChange}
            >
              <option value="Less than one month">Less than one month</option>
              <option value="Less than three months">
                Less than three months
              </option>
              <option value="Less than six months">Less than six months</option>
            </select>
          </div>
          <div>
            <label htmlFor="timeRequirement">Time Requirement</label>
            <input
              id="timeRequirement"
              name="timeRequirement"
              value={task.timeRequirement}
              onChange={handleChange}
              type="text"
              placeholder="Less than 4 hours a day"
              className="border-2 placeholder:text-sm h-9 p-2 focus:outline-primary w-full rounded-lg"
            />
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
              onClick={handleSubmit}
              className="bg-primary rounded-2xl place-self-end text-white py-1 px-6 lg:text-lg"
            >
              Post this task
            </button>
          )}
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </article>
  );
}

export default TaskForm;
