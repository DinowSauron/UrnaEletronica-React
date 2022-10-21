
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type StatusTypes = "Loading" | "WaitingVoter";
type VoteContextProviderData = {
  selectedNumbers: string;
  maxCharacters: number;
  setSelectedNumbers: (agr0: string) => void;
  status: StatusTypes;
  setStatus: (stats: StatusTypes) => void
}
export const VoteContext = createContext({} as VoteContextProviderData)

type VoteContextProviderProps = {
  children: ReactNode;
}


export function VoteContextProvider(props: VoteContextProviderProps) {

  const [selectedNumbers, setSelectedNumbers] = useState("");
  const [maxCharacters, setMaxCharacters] = useState(4);
  const [status, setStatus] = useState<StatusTypes>("Loading");

  
  return <VoteContext.Provider value={{
    selectedNumbers,
    maxCharacters,
    setSelectedNumbers,
    setStatus,
    status,
  }}>
    {props.children}
  </VoteContext.Provider>
}



export function useVoteContext() {
  const voteContext = useContext(VoteContext)

  return voteContext
}