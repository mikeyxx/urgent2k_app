"use client";

import { DBUser, ProfileDocument, ProposalProps } from "@/utils/lib";
import {
  useContext,
  createContext,
  useState,
  useEffect,
  ReactNode,
  SetStateAction,
  Dispatch,
  useCallback,
} from "react";

export type UtilityContext = {
  screenSize: number;
  inputDivStyle: number;
  setInputDivStyle: Dispatch<SetStateAction<number>>;
  dbUser: DBUser | null;
  setDBUser: Dispatch<SetStateAction<DBUser | null>>;
  getDBUser: (id: string | undefined | string[]) => void;
  sentProposals: string[] | null;
  setSentProposal: Dispatch<SetStateAction<string[] | null>>;
  getSentProposals: (id: string | undefined | string[]) => void;
  acceptedProposal: ProposalProps[] | null;
  setAcceptedProposal: Dispatch<SetStateAction<ProposalProps[] | null>>;
  getAcceptedProposal: (id: string | undefined | string[]) => void;
  editedState: ProfileDocument | null;
  setEditedState: Dispatch<SetStateAction<ProfileDocument | null>>;
  userProfile: ProfileDocument | null;
  setUserProfile: Dispatch<SetStateAction<ProfileDocument | null>>;
  getUserProfile: (id: string | undefined | string[]) => void;
};

export const UtilsContext = createContext<UtilityContext | null>(null);

type UtilityProviderProps = {
  children: ReactNode;
};

export default function UtilsContextProvider({
  children,
}: UtilityProviderProps) {
  const [screenSize, setScreenSize] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const [inputDivStyle, setInputDivStyle] = useState(0);
  const [dbUser, setDBUser] = useState<DBUser | null>(null);
  const [userProfile, setUserProfile] = useState<ProfileDocument | null>(null);
  const [sentProposals, setSentProposal] = useState<string[] | null>(null);
  const [acceptedProposal, setAcceptedProposal] = useState<
    ProposalProps[] | null
  >(null);
  const [editedState, setEditedState] = useState<ProfileDocument | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [screenSize]);

  const getDBUser = useCallback(async (id: string | undefined | string[]) => {
    try {
      const res = await fetch(`http://localhost:3000/api/user/${id}`);
      const data = await res.json();
      setDBUser(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const getUserProfile = useCallback(
    async (id: string | undefined | string[]) => {
      try {
        const res = await fetch(`http://localhost:3000/api/profile/${id}`);
        const data = await res.json();
        setUserProfile(data);
      } catch (error) {
        console.error(error);
      }
    },
    []
  );

  const getSentProposals = useCallback(
    async (id: string | undefined | string[]) => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/proposal/${id}`
        );

        const data = await response.json();
        setSentProposal(data);
      } catch (error) {
        console.error(error);
      }
    },
    []
  );

  const getAcceptedProposal = useCallback(
    async (id: string | undefined | string[]) => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/proposal/acceptedProposal/${id}`
        );

        const data = await res.json();
        setAcceptedProposal(data);
      } catch (error) {
        console.error(error);
      }
    },
    []
  );

  return (
    <UtilsContext.Provider
      value={{
        screenSize,
        inputDivStyle,
        setInputDivStyle,
        dbUser,
        setDBUser,
        getDBUser,
        sentProposals,
        setSentProposal,
        getSentProposals,
        acceptedProposal,
        setAcceptedProposal,
        getAcceptedProposal,
        editedState,
        setEditedState,
        userProfile,
        setUserProfile,
        getUserProfile,
      }}
    >
      {children}
    </UtilsContext.Provider>
  );
}

export function useUtilsContext() {
  const utilContext = useContext(UtilsContext);

  if (!utilContext) {
    throw new Error("useChatContext must be used inside a ChatContextProvider");
  }

  return utilContext;
}
