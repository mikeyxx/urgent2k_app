import React from "react";
import Chat_History_Search from "./Chat_History_Search";
import Conversations from "./Conversations";
import { useChatContext } from "@/context/ChatContext";
import { useUtilsContext } from "@/context/UtilsContext";

function Chat_History() {
  const { state } = useChatContext();
  const { screenSize } = useUtilsContext();

  return (
    <div
      className={`flex-1 w-full h-full ${
        !state.chatId && screenSize < 1280 && "block"
      } ${state.chatId && screenSize < 1280 && "hidden"}`}
    >
      <Chat_History_Search />
      <Conversations />
    </div>
  );
}

export default Chat_History;
