import React from "react";
import User from "./User";

function UserTypes() {
  return (
    <section className="flex flex-col w-full justify-between mt-20 gap-28">
      <User
        imageString="/add_notes_green.svg"
        imageAlt="Create"
        title="Creator"
        desc1="Post a task, finding talent/help for that urgent task doesn’t have to be a chore."
        desc2="Easily hand over your project to a talented freelancer in minutes."
        desc3=""
        action="Join Urgent2k"
      />
      <User
        imageString="/freelancer_green.svg"
        imageAlt="Executor"
        title="Executor"
        desc1="Learn a skill and earn with it."
        desc2="Need that urgent2k? Register and explore different tasks and projects."
        desc3="Start building your own brand"
        action="Join Urgent2k"
      />
    </section>
  );
}

export default UserTypes;
