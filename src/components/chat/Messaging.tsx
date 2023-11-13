"use client";

import React from "react";
import Chat_History from "./Chat_History";
import Messages from "./Messages";
import { DBUser } from "@/utils/lib";

interface MessagingProps {
  user: any;
  dbUser: DBUser;
}

function Messaging({ user, dbUser }: MessagingProps) {
  return (
    <div className="rounded-lg w-[80%] h-[95%] flex flex-col xl:flex-row overflow-hidden">
      <Chat_History />
      <Messages user={user} dbUser={dbUser} />
    </div>
  );
}

export default Messaging;
