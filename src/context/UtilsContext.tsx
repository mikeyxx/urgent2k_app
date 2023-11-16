"use client";

import { CreatorProfileDocument, ExecutorProfileDocument } from "@/utils/lib";
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
  editedState: ExecutorProfileDocument | null;
  setEditedState: Dispatch<SetStateAction<ExecutorProfileDocument | null>>;
  creatorProfile: CreatorProfileDocument[] | null;
  setCreatorProfile: Dispatch<SetStateAction<CreatorProfileDocument[] | null>>;
  getCreatorProfile: (id: string | undefined | string[]) => void;
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
  const [editedState, setEditedState] =
    useState<ExecutorProfileDocument | null>(null);
  const [creatorProfile, setCreatorProfile] = useState<
    CreatorProfileDocument[] | null
  >(null);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [screenSize]);

  // const getDBUser = useCallback(async (id: string | undefined | string[]) => {
  //   try {
  //     const res = await fetch(`http://localhost:3000/api/user/${id}`);
  //     const data = await res.json();
  //     setDBUser(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, []);

  // const getExecutorProfile = useCallback(
  //   async (id: string | undefined | string[]) => {
  //     try {
  //       const res = await fetch(
  //         `http://localhost:3000/api/executorProfile/${id}`
  //       );
  //       const data = await res.json();
  //       setExecutorProfile(data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   },
  //   []
  // );

  const getCreatorProfile = useCallback(
    async (id: string | undefined | string[]) => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/creatorProfile/${id}`
        );
        const data = await res.json();
        setCreatorProfile(data);
      } catch (error) {
        console.error(error);
      }
    },
    []
  );

  // const getSentProposals = useCallback(
  //   async (id: string | undefined | string[]) => {
  //     try {
  //       const response = await fetch(
  //         `http://localhost:3000/api/proposal/${id}`
  //       );

  //       const data = await response.json();
  //       setSentProposal(data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   },
  //   []
  // );

  // const getAcceptedProposal = useCallback(
  //   async (id: string | undefined | string[]) => {
  //     try {
  //       const res = await fetch(
  //         `http://localhost:3000/api/proposal/acceptedProposal/${id}`
  //       );

  //       const data = await res.json();
  //       setAcceptedProposal(data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   },
  //   []
  // );

  return (
    <UtilsContext.Provider
      value={{
        screenSize,
        inputDivStyle,
        setInputDivStyle,
        creatorProfile,
        setCreatorProfile,
        getCreatorProfile,
        editedState,
        setEditedState,
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
