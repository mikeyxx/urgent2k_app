import {
  ChangeUserAction,
  ConversationProps,
  useChatContext,
} from "@/context/ChatContext";
import { format, differenceInHours, isToday, isYesterday } from "date-fns";
import Image from "next/image";
import React, { useMemo } from "react";

function Conversation({ conversation }: { conversation: ConversationProps }) {
  const { dispatch } = useChatContext();

  const handleSelect = (userInfo: {
    name: string;
    photo: string;
    userId: string;
  }) => {
    const changeUserAction: ChangeUserAction = {
      type: "CHANGE_USER",
      payload: userInfo,
    };
    dispatch(changeUserAction);
  };

  const getCurrentTimeWithAMPM = useMemo(() => {
    if (conversation.date) {
      const now = new Date();
      const conversationDate = new Date(conversation.date.toDate());

      // Calculate the time difference in hours
      const hoursDiff = differenceInHours(now, conversationDate);

      if (hoursDiff >= 24) {
        return format(conversationDate, "dd-MM-yyyy");
      } else if (isYesterday(conversationDate)) {
        return "Yesterday";
      } else if (isToday(conversationDate)) {
        return format(conversationDate, "hh:mm a");
      } else {
        return format(conversationDate, "dd-MM-yyyy");
      }
    }
  }, [conversation]);

  return (
    <div
      className="flex p-[10px] items-start cursor-pointer hover:bg-c justify-between w-full rounded-md h-16"
      onClick={() => handleSelect(conversation.userInfo)}
    >
      <div className="rounded-full flex items-start justify-between w-full">
        <div className="relative">
          <Image
            src={conversation.userInfo.photo}
            alt="profile avatar"
            width={50}
            height={50}
            className="rounded-full w-[40px] h-[40px] object-cover"
          />
          <span className="absolute w-[7px] h-[7px] top-0 right-0 bg-primary rounded-full"></span>
        </div>
        <div className="flex flex-col w-full justify-between h-full">
          <div className="w-full flex justify-between items-center">
            <p className="font-semibold text-sm text-e ml-2">
              {conversation.userInfo.name}
            </p>
            <p className="text-sm text-gray-500">{getCurrentTimeWithAMPM}</p>
          </div>
          <div className="w-full flex justify-between items-center">
            {conversation.lastMessage && (
              <small className="text-gray-500 ml-2">
                {conversation.lastMessage.text.length > 20
                  ? conversation.lastMessage.text.substring(0, 20) + "..."
                  : conversation.lastMessage.text}
              </small>
            )}

            {/* <span className="bg-transparent text-white place-self-end text-center rounded-full h-4 w-4 text-xs">3</span> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Conversation;
