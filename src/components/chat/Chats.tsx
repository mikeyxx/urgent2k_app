"use client";

import React from "react";
import Chat from "./Chat";
import { useChatContext } from "@/context/ChatContext";
import { useUtilsContext } from "@/context/UtilsContext";
import { DBUser } from "@/utils/lib";

interface ChatsProps {
  user: any;
  dbUser: DBUser;
}

function Chats({ user, dbUser }: ChatsProps) {
  const { messages } = useChatContext();
  const { inputDivStyle } = useUtilsContext();

  const totalHeight = `calc(100% - ${50 + inputDivStyle}px)`;

  return (
    <div
      className="bg-c/5 p-[10px] overflow-y-scroll overflow-x-hidden transition-all duration-300 ease-in-out"
      style={{ height: totalHeight }}
    >
      {messages?.map((message) => (
        <Chat
          key={message.id}
          own={message?.senderId === user.id}
          message={message}
          user={user}
          dbUser={dbUser}
        />
      ))}
    </div>
  );
}

export default Chats;
