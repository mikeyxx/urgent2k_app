import Image from "next/image";
import React from "react";

function Feature() {
  return (
    <section className="flex items-center justify-between gap-28 flex-col-reverse xl:flex-row p-4 mt-20">
        <div className="flex flex-col gap-16">
          <h2 className="uppercase font-bold text-2xl xl:text-3xl">
            top freelance platform in Africa
          </h2>
          <div className="flex flex-col gap-10 text-lg xl:text-xl text-gray-600">
            <p>
              Seamlessly monitor your projects with our built-in project
              management tool. Gain privileged access to an exclusive talent
              network spanning across Nigeria.
            </p>
            <p>
              Discover exceptional freelance talent at your fingertips,
              available on-demand.
            </p>
            <p>
              Embrace a user-friendly communication platform, bolstered by
              robust security measures and effective freelance project
              management utilities.
            </p>
            <p>
              Enroll with Urgent2k today and relish the convenience of swiftly
              identifying the perfect freelancer for your projects in record
              time.
            </p>
            <p>
              Embrace the opportunities that Urgent2k offers, connecting you
              with lucrative prospects, enabling you to earn, and taking your
              career to new heights.
            </p>
          </div>
        </div>
        <Image src="/collaboration.svg" alt="" width={400} height="400" />
    </section>
  );
}

export default Feature;
