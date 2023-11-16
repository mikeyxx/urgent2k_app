"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  BsFillFileEarmarkPdfFill,
  BsFillFileEarmarkWordFill,
  BsPenFill,
} from "react-icons/bs";
import { VscCopy } from "react-icons/vsc";
import { Message, useChatContext } from "@/context/ChatContext";
import { format } from "date-fns";
import Link from "next/link";
import { CreatorProfileDocument, DBUser } from "@/utils/lib";
import { getCreatorProfile } from "@/api";

type ChatProps = {
  message: Message;
  own: boolean;
  user: any;
  dbUser: DBUser;
};

function Chat({ own, message, user, dbUser }: ChatProps) {
  const [visible, setVisible] = useState(false);
  const [copyStatus, setCopyStatus] = useState(false);
  const [creatorProfile, setCreatorProfile] = useState<
    CreatorProfileDocument[] | null
  >(null);
  const { state } = useChatContext();

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const handleMouseEnter = () => {
    setVisible(true);
  };

  const handleMouseLeave = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const getCurrentTimeWithAMPM = useMemo(() => {
    const now = new Date(message.date.toDate());
    return format(now, "h:mm a");
  }, [message]);

  const copyToClipboard = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
    setCopyStatus(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setCopyStatus(false);
    }, 3000);
  }, [copyStatus]);

  useEffect(() => {
    const getData = async () => {
      const data = await getCreatorProfile(state.user.userId);

      setCreatorProfile(data);
    };

    getData();
  }, [state.user.userId]);

  return (
    <div
      ref={scrollRef}
      className={`flex flex-col items-start mb-4 ${own && "items-end"}`}
    >
      <div className={`flex ${own && "flex-row-reverse"}`}>
        <Image
          src={`${
            message?.senderId === user.id
              ? user?.picture ?? "/no-profile-icon.png"
              : state?.user?.photo ||
                creatorProfile?.[0]?.image ||
                "/no-profile-icon.png"
          }`}
          alt="my avatar"
          height={30}
          width={30}
          className="place-self-start border border-white rounded-full w-[30px] h-[30px] object-cover"
        />

        <div
          className={`flex items-center gap-1 ml-[10px] ${own && "mr-[10px]"}`}
        >
          <p className="text-gray-400 text-sm">
            {message.senderId === user.id ? user.given_name : state.user.name}
          </p>
          <span className="text-xs text-gray-300">
            {getCurrentTimeWithAMPM}
          </span>
        </div>
      </div>

      <div
        className={`ml-10 relative ${own && "mr-10"}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className={`flex flex-col max-w-[300px] w-full bg-gray-100 p-3 gap-1 ${
            own
              ? "bg-primary text-white rounded-l-xl rounded-br-xl"
              : "rounded-r-xl rounded-bl-xl"
          }`}
        >
          {message.img && (
            <Image
              src={message?.img ?? "/no-profile-icon.png"}
              alt="USer avatar"
              width={300}
              height={200}
              className="h-[200px] object-cover"
            />
          )}

          {message?.file && (
            <div
              className={`flex items-center ${
                message?.fileName?.split(".")[1] === "pdf"
                  ? "bg-red-600 text-white"
                  : "bg-white text-black"
              } rounded-lg h-14 w-full px-4 gap-3`}
            >
              {message?.fileName?.split(".")[1] === "pdf" ? (
                <BsFillFileEarmarkPdfFill />
              ) : (
                <BsFillFileEarmarkWordFill className="text-blue-500" />
              )}

              <Link href={message?.file} target="_blank">
                {message?.fileName && message?.fileName?.length > 20
                  ? message?.fileName?.substring(0, 20) + "..."
                  : message?.fileName}
              </Link>
            </div>
          )}
          <p className="text-sm">{message?.text}</p>
        </div>

        {dbUser?.role === "creator" && (
          <div
            className={`absolute ${
              !own && "right-[-8rem] bg-gray-200 text-black"
            } px-2 py-2 rounded-lg ${
              own && "left-[-8rem] bg-primary text-white"
            } top-3 ${
              visible ? "opacity-100" : "opacity-0"
            } transition-all duration-200`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button className="flex items-center text-sm mb-3">
              <BsPenFill />
              <span className="ml-2">Add as task</span>
            </button>
            <button
              className="flex items-center text-sm"
              onClick={() => copyToClipboard(message?.text)}
            >
              <VscCopy />
              <span className="ml-2">{copyStatus ? "Copied" : "Copy"}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;
