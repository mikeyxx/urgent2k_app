import React from "react";
import ActiveChatHeader from "./ActiveChatHeader";
import Chats from "./Chats";
import Chat_Input from "./Chat_Input";
import { useChatContext } from "@/context/ChatContext";
import Image from "next/image";
import { useUtilsContext } from "@/context/UtilsContext";
import { DBUser } from "@/utils/lib";

interface MessagesProps {
  user: any;
  dbUser: DBUser;
}

function Messages({ user, dbUser }: MessagesProps) {
  const { state } = useChatContext();
  const { screenSize } = useUtilsContext();

  return (
    <div
      className={`flex-3 h-full ${
        !state?.chatId && screenSize < 1280 && "hidden"
      } ${state?.chatId && screenSize < 1280 && "block"}`}
    >
      {state.chatId ? (
        <>
          <ActiveChatHeader user={user} dbUser={dbUser} />
          <Chats user={user} dbUser={dbUser} />
          <Chat_Input user={user} dbUser={dbUser} />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full w-full font-semibold bg-c/5">
          <Image
            src="/savings.svg"
            alt="urgent2k icon"
            width={100}
            height={100}
            className="mb-5"
          />
          <p className="text-xl">Start a chat</p>
        </div>
      )}
    </div>
  );
}

export default Messages;
