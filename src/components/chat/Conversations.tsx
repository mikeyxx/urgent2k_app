import React from "react";
import Conversation from "./Conversation";
import { useChatContext } from "@/context/ChatContext";

function Conversations() {
  const { conversations, searchedConversation, searchText } = useChatContext();

  // Define the data to map through based on the presence of searchText
  const dataToMap = searchText ? searchedConversation : conversations;

  return (
    <div className="bg-b/25 p-[10px] h-[calc(100%-50px)] overflow-y-scroll overflow-x-hidden w-full">
      {dataToMap
        ?.sort(
          (a, b) => b.date?.toDate().getTime() - a.date?.toDate().getTime()
        )
        .map((convo) => (
          <Conversation key={convo.userInfo.userId} conversation={convo} />
        ))}
    </div>
  );
}

export default Conversations;
