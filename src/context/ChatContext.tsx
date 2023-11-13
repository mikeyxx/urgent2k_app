"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction,
  ReactNode,
  useReducer,
} from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Timestamp, doc, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase";

export type Message = {
  id: string;
  text: string;
  senderId: string;
  date: Timestamp;
  file?: string;
  img?: string;
  fileName?: string;
};

export type ConversationProps = {
  _id: string;
  userInfo: {
    name: string;
    photo: string;
    userId: string;
  };
  date: Timestamp;
  lastMessage: {
    text: string;
  };
};

type StateType = {
  chatId: string | null;
  user: {
    name: string;
    photo: string;
    userId: string;
  };
};

export type ChangeUserAction = {
  type: "CHANGE_USER";
  payload: {
    name: string;
    photo: string;
    userId: string;
  };
};

export type ResetStateAction = {
  type: "RESET_STATE";
};

type ActionType = ChangeUserAction | ResetStateAction;

export interface MessageContext {
  conversations: ConversationProps[] | null;
  setConversations: Dispatch<SetStateAction<ConversationProps[] | null>>;
  state: StateType;
  dispatch: Dispatch<ActionType>;
  messages: Message[] | null;
  setMessages: Dispatch<SetStateAction<Message[] | null>>;
  fileName: string | null;
  setFileName: Dispatch<SetStateAction<string | null>>;
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
  searchedConversation: ConversationProps[] | null;
  setSearchedConversation: Dispatch<SetStateAction<ConversationProps[] | null>>;
}

export const ChatContext = createContext<MessageContext | null>(null);

type MessageProviderProps = {
  children: ReactNode;
};

export default function ChatContextProvider({
  children,
}: MessageProviderProps) {
  const [conversations, setConversations] = useState<
    ConversationProps[] | null
  >(null);
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [searchedConversation, setSearchedConversation] = useState<
    ConversationProps[] | null
  >(null);
  const [searchText, setSearchText] = useState("");

  const { user, isLoading } = useKindeBrowserClient();

  useEffect(() => {
    if (user) {
      const unsubscribe = onSnapshot(
        doc(db, "conversations", user.id),
        (doc) => {
          if (doc.exists()) {
            // Ensure the document exists
            const data = doc.data();
            const dataArray = Object.entries(data);

            const formattedData = dataArray.map(([id, data]) => ({
              id,
              ...data,
            }));

            setConversations(formattedData);
          }
        }
      );

      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  const INITIAL_STATE: StateType = {
    chatId: null,
    user: {
      name: "",
      photo: "",
      userId: "",
    },
  };

  const chatReducer = (state: StateType, action: ActionType) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            user && user.id > action.payload.userId
              ? user.id + action.payload.userId
              : action.payload.userId + user?.id,
        };
      case "RESET_STATE":
        return INITIAL_STATE;

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  useEffect(() => {
    if (state.chatId) {
      const unsubscribe = onSnapshot(doc(db, "chats", state.chatId), (doc) => {
        if (doc.exists()) {
          // Ensure the document exists
          const data = doc.data().messages;

          setMessages(data);
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [state.chatId]);

  return (
    <ChatContext.Provider
      value={{
        conversations,
        setConversations,
        state,
        dispatch,
        messages,
        setMessages,
        fileName,
        setFileName,
        searchText,
        setSearchText,
        searchedConversation,
        setSearchedConversation,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const chatContext = useContext(ChatContext);

  if (!chatContext) {
    throw new Error("useChatContext must be used inside a ChatContextProvider");
  }

  return chatContext;
}
