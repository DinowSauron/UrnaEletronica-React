
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { getVotersData } from "../Data/Voters";
import { getVotingCategoriesData } from "../Data/VotingCategories";
import { FindArrById } from "../lib/FindArrById";

export type ScreenTypes = 
  "Loading" | 
  "WaitingVoter" | 
  "VoteZone" | 
  "Transition" | // Screen where nothing happens
  "NotElegible" |
  "VoteViewer" |
  "AlreadyVoted" |
  "Finalized";

type VoteContextProviderData = {
  selectedNumbers: string;
  maxCharacters: number;
  status: ScreenTypes;
  votingFor: number;
  currentVoter: votingSpecs | undefined;
  actualCandidate: votingSpecs | undefined;
  getVotersRegistred: () => votingSpecs[];
  setSelectedNumbers: (numbers: string) => void;
  ChangeScreen: (newScreen: ScreenTypes) => void;
  nextStep: (isWhiteVote?: boolean) => void;
  getVotingCategories: () => {
    [key:string]: { 
      digits: number;
      candidates: votingSpecs[];
    }
  }
}
type VoteContextProviderProps = {
  children: ReactNode;
}
export type votingSpecs = {
  Id: number;
  Nome: string;
  Partido?: string;
  pictureUrl?: string;
}


export const VoteContext = createContext({} as VoteContextProviderData)
export function VoteContextProvider(props: VoteContextProviderProps) {

  const [selectedNumbers, setSelectedNumbers] = useState("");
  const [maxCharacters, setMaxCharacters] = useState(4);
  const [votingFor, setVotingFor] = useState(0);
  const [status, setScreen] = useState<ScreenTypes>("Loading");
  const [actualCandidate, setActualCandidate] = useState<votingSpecs|undefined>(undefined);
  const [votes, setVotes] = useState<number[]>([]);
  const [currentVoter, setCurrentVoter] = useState<votingSpecs|undefined>(undefined);

  const voters = getVotersRegistred();
  const votingCategorys = getVotingCategories();



  useEffect(() => {
    setTimeout(() => {
      // First Load timing...
      setScreen("WaitingVoter")
    }, 3000);
  },[]);

  /** Shows in real time the current candidate */
  useEffect(() => {
    if(status != "VoteZone")
      return;

    const candidates = getAvalibleCandidates();
    if(selectedNumbers.length >= maxCharacters && candidates) { // if all numbers is inserted
      const newCadidate = FindArrById(candidates,selectedNumbers)
      if(!newCadidate) {
        const isNull = !selectedNumbers.includes("•");
        setActualCandidate({ //if the number is incorrect shows 'Nulo'
          Id: isNull ? 0 : -1,
          Nome: isNull ? "Nulo" : "Voto em Branco",
        }) 
      }else{
        setActualCandidate(newCadidate);
      }
    } else {
      setActualCandidate(undefined);
    }
  },[selectedNumbers, status])



  /** when 'CONFIRMA/BRANCO' key is pressed */
  function nextStep(isWhiteVote = false) {
    
    if(status === "Loading")
      return

    if(["WaitingVoter", "NotElegible"].includes(status)){
      if(selectedNumbers === "0000"){
        ChangeScreen("VoteViewer");
        return;
      }
      const VoterPerson = FindArrById(voters, Number(selectedNumbers));
      setCurrentVoter(VoterPerson);
      setVotingFor(0);
      setSelectedNumbers("");

      if(VoterPerson){
        const allVotersIdInStorage = localStorage.getItem("Voters") || "[]";
        const allVotersId = JSON.parse(allVotersIdInStorage) as number[];
        if(allVotersId.includes(VoterPerson.Id)){
          ChangeScreen("AlreadyVoted");
        }else {
          ChangeScreen("VoteZone");
        }
      }
      else {
        ChangeScreen("NotElegible");
      }
    }
    
    if(status == "VoteZone") {
      const voteIn = isWhiteVote ? -1: actualCandidate!.Id
      setVotes(votes => [...votes, voteIn]);
      setVotingFor(num => (num + 1));
      setSelectedNumbers("");
      ChangeScreen("VoteZone");
    }
  }

  /** Get vote options(candidates) and set maxChars  */
  function getAvalibleCandidates() {
    const voteOptions = Object.entries(votingCategorys);
    if(votingFor > voteOptions.length - 1) { 
      // if don't have more options, end votation:
      HandleEndVotation();
      return;
    }
    const option = voteOptions[votingFor][1];
    setMaxCharacters(option.digits);
    return option.candidates;
  }

  /** Simple animation to blink the screen */
  function ChangeScreen(newScreen: ScreenTypes) {
    setScreen("Transition");
    setTimeout(() => {
      setScreen(newScreen);
    }, 50); // simulate load or an transition between 2 screens
  }

  function HandleEndVotation(){
    if(!currentVoter){
      ChangeScreen("NotElegible");
      return;
    }

    ChangeScreen("Finalized");
    
    SaveVote({
      voter: currentVoter!,
      votes: votes
    });

    // Reset all states
    setActualCandidate(undefined);
    setMaxCharacters(4);
    setSelectedNumbers("");
    setVotes([]);
    setVotingFor(0);

    setTimeout(() => {
      setScreen("WaitingVoter");
    }, 3000);
  }
  
  function getVotingCategories() {
    // fetch the data...
    const data = getVotingCategoriesData();
    return data;
  }
  function getVotersRegistred() {
    // fetch the data...
    const data = getVotersData();
    return data;
  }

  type VoteProps = {
    voter: votingSpecs;
    votes: number[];
  }
  function SaveVote({votes, voter}: VoteProps){
    // console.log("Saved: " + votes + " " + voter.Nome)
    const allVotersInStorage = localStorage.getItem("Voters") || "[]";
    const allVoters = JSON.parse(allVotersInStorage) as number[];
    localStorage.setItem("Voters", JSON.stringify([...allVoters, voter.Id]))

    for(let i = 0; i < votes.length;i++){
      const key = `${i}/${votes[i]}`; //save name
      const prevVotes = localStorage.getItem(key) || "0";
      const newVotes = Number(prevVotes) + 1;
      localStorage.setItem(key,String(newVotes));
    }
  }
  
  return <VoteContext.Provider value={{
    status,
    votingFor,
    currentVoter,
    maxCharacters,
    selectedNumbers,
    actualCandidate,
    getVotingCategories,
    setSelectedNumbers,
    getVotersRegistred,
    ChangeScreen,
    nextStep
  }}>
    {props.children}
  </VoteContext.Provider>
}


/** Hook for use the Vote Context */
export function useVoteContext() {
  const voteContext = useContext(VoteContext)

  return voteContext
}