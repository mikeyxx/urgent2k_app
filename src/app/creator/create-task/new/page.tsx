import TaskForm from "@/components/creator/TaskForm";
import React from "react";

function Page() {
  return (
    <section className="w-[1200px] pt-16 max-w-full lg:pt-8 px-4 pb-5 flex items-center m-auto">
      <TaskForm />
    </section>
  );
}

export default Page;
