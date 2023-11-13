"use client";

import { useChatContext } from "@/context/ChatContext";
import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";

function Chat_History_Search() {
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const { conversations, setSearchedConversation, searchText, setSearchText } =
    useChatContext();

  const filterConversation = (searchText: string) => {
    if (!conversations) {
      return [];
    }

    const regex = new RegExp(searchText, "i");
    return conversations.filter((convo) => regex.test(convo.userInfo.name));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    setSearchText(e.target.value);

    //debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterConversation(e.target.value);
        setSearchedConversation(searchResult);
      }, 500)
    );
  };

  return (
    <div className="flex items-center w-full border-b border-b-primary bg-b/25 h-[50px] p-[10px] text-e">
      <BiSearch />
      <input
        placeholder="Search chat"
        value={searchText}
        onChange={handleSearchChange}
        className="outline-none px-3 h-full w-full bg-transparent"
      />
    </div>
  );
}

export default Chat_History_Search;
