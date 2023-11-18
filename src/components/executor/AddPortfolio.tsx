"use client";

import Loading from "@/utils/HashLoader";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function AddPortfolio() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [experiences, setExperiences] = useState([
    { jobTitle: "", company: "", startDate: "", endDate: "", location: "" },
  ]);
  const [certifications, setCertifications] = useState([
    { title: "", org: "", date: "" },
  ]);
  const [projects, setProjects] = useState([
    { link: "", image: "", title: "" },
  ]);

  const handleAddExperience = () => {
    if (experiences.length < 2) {
      setExperiences([
        ...experiences,
        { jobTitle: "", company: "", startDate: "", endDate: "", location: "" },
      ]);
    } else {
      toast.error("You can only add two previous experiences.");
    }
  };

  const handleAddCertification = () => {
    if (certifications.length < 2) {
      setCertifications([...certifications, { title: "", org: "", date: "" }]);
    } else {
      toast.error("You can only add two certifications.");
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const imageDataURL = reader.result as string;
        const updatedProjects = [...projects];
        updatedProjects[index].image = imageDataURL;
        setProjects(updatedProjects);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProject = () => {
    if (projects.length < 2) {
      setProjects([...projects, { link: "", image: "", title: "" }]);
    } else {
      toast.error("You can only add two projects.");
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const response = await fetch(`/api/update-profile/${params.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          experiences: experiences.map((experience) => ({
            jobTitle: experience.jobTitle,
            company: experience.company,
            startDate: experience.startDate,
            endDate: experience.endDate,
            location: experience.location,
          })),
          certifications: certifications.map((certification) => ({
            title: certification.title,
            org: certification.org,
            date: certification.date,
          })),
          projects: projects.map((project) => ({
            title: project.title,
            image: project.image,
            link: project.link,
          })),
        }),
      });
      if (response.ok) {
        toast.success("Your profile has been updated");
        setTimeout(() => {
          router.push("/executor/profile");
        }, 3000);
      } else {
        console.error("Failed to update user profile");
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
    <div className="flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {experiences.map((experience, index) => (
          <div key={index} className="border p-4 rounded-lg mb-5">
            <h2 className="text-xl mb-4">Add Experience</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Job Title"
                value={experience.jobTitle}
                onChange={(e) => {
                  const updatedExperiences = [...experiences];
                  updatedExperiences[index].jobTitle = e.target.value;
                  setExperiences(updatedExperiences);
                }}
                className="border px-2 py-1 rounded-lg"
              />
              <input
                type="text"
                placeholder="company"
                value={experience.company}
                onChange={(e) => {
                  const updatedExperiences = [...experiences];
                  updatedExperiences[index].company = e.target.value;
                  setExperiences(updatedExperiences);
                }}
                className="border px-2 py-1 rounded-lg"
              />
              <input
                type="text"
                placeholder="Start Date"
                value={experience.startDate}
                onChange={(e) => {
                  const updatedExperiences = [...experiences];
                  updatedExperiences[index].startDate = e.target.value;
                  setExperiences(updatedExperiences);
                }}
                className="border px-2 py-1 rounded-lg"
              />
              <input
                type="text"
                placeholder="End Date"
                value={experience.endDate}
                onChange={(e) => {
                  const updatedExperiences = [...experiences];
                  updatedExperiences[index].endDate = e.target.value;
                  setExperiences(updatedExperiences);
                }}
                className="border px-2 py-1 rounded-lg"
              />
              <input
                type="text"
                placeholder="Location"
                value={experience.location}
                onChange={(e) => {
                  const updatedExperiences = [...experiences];
                  updatedExperiences[index].location = e.target.value;
                  setExperiences(updatedExperiences);
                }}
                className="border px-2 py-1 rounded-lg"
              />
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handleAddExperience}
        className="p-2 bg-blue-500 text-white rounded-full place-self-start"
      >
        + Add Experience
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
        {certifications.map((certificate, index) => (
          <div key={index} className="border p-4 rounded-lg mb-5">
            <h2 className="text-xl mb-4">Add Certificate</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Certificate Title"
                value={certificate.title}
                onChange={(e) => {
                  const updatedCertifications = [...certifications];
                  updatedCertifications[index].title = e.target.value;
                  setCertifications(updatedCertifications);
                }}
                className="border px-2 py-1 rounded-lg"
              />
              <input
                type="text"
                placeholder="Organization"
                value={certificate.org}
                onChange={(e) => {
                  const updatedCertifications = [...certifications];
                  updatedCertifications[index].org = e.target.value;
                  setCertifications(updatedCertifications);
                }}
                className="border px-2 py-1 rounded-lg"
              />
              <input
                type="text"
                placeholder="Certificate Date"
                value={certificate.date}
                onChange={(e) => {
                  const updatedCertifications = [...certifications];
                  updatedCertifications[index].date = e.target.value;
                  setCertifications(updatedCertifications);
                }}
                className="border px-2 py-1 rounded-lg"
              />
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handleAddCertification}
        className="p-2 bg-blue-500 text-white rounded-full place-self-start"
      >
        + Add Certification
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
        {projects.map((project, index) => (
          <div key={index} className="border p-4 rounded-lg mb-5">
            <h2 className="text-xl mb-4">Add Project</h2>
            <div className="flex flex-col gap-4">
              <input type="file" onChange={(e) => handleFileChange(e, index)} />
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Project Title"
                  value={project.title}
                  onChange={(e) => {
                    const updatedProjects = [...projects];
                    updatedProjects[index].title = e.target.value;
                    setProjects(updatedProjects);
                  }}
                  className="border px-2 py-1 rounded-lg"
                />

                <input
                  type="text"
                  placeholder="Link"
                  value={project.link}
                  onChange={(e) => {
                    const updatedProjects = [...projects];
                    updatedProjects[index].link = e.target.value;
                    setProjects(updatedProjects);
                  }}
                  className="border px-2 py-1 rounded-lg"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handleAddProject}
        className="p-2 bg-blue-500 text-white rounded-full place-self-start"
      >
        + Add Project
      </button>
      <button
        onClick={handleSubmit}
        className="mt-5 bg-primary py-2 px-8 rounded-lg text-white place-self-center"
      >
        Submit
      </button>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default AddPortfolio;
