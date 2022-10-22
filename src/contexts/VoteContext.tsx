
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { FindArrById } from "../lib/FindArrById";

export type StatusTypes = 
  "Loading" | 
  "WaitingVoter" | 
  "VoteZone" | 
  "Transition" | // states where nothing happens
  "NotElegible" |
  "VoteViewer" |
  "AlreadyVoted" |
  "Finalized";

type VoteContextProviderData = {
  selectedNumbers: string;
  maxCharacters: number;
  status: StatusTypes;
  votingFor: number;
  currentVoter: votingSpecs | undefined;
  actualCandidate: votingSpecs | undefined;
  getVotersRegistred: () => votingSpecs[];
  setSelectedNumbers: (numbers: string) => void;
  getVoteOptions: () => votingSpecs[] | undefined; // undefined = finalized
  setStatus: (stats: StatusTypes) => void;
  nextState: (isWhiteVote?: boolean) => void;
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
}


export const VoteContext = createContext({} as VoteContextProviderData)
export function VoteContextProvider(props: VoteContextProviderProps) {

  const [selectedNumbers, setSelectedNumbers] = useState("");
  const [maxCharacters, setMaxCharacters] = useState(4);
  const [votingFor, setVotingFor] = useState(0);
  const [status, setStatus] = useState<StatusTypes>("Loading");
  const [actualCandidate, setActualCandidate] = useState<votingSpecs|undefined>(undefined);
  const [votes, setVotes] = useState<number[]>([])
  const [currentVoter, setCurrentVoter] = useState<votingSpecs|undefined>(undefined);

  useEffect(() => {
    setTimeout(() => {
      // Load time...
      setStatus("WaitingVoter")
    }, 3000);
  },[]);

  /** shows in real time the current number candidate */
  useEffect(() => {
    // console.log("votes: " + votes);
    if(status != "VoteZone")
      return;

    const candidates = getVoteOptions();
    if(selectedNumbers.length >= maxCharacters && candidates) { // if all numbers is inserted
      const newCadidate = FindArrById(candidates,selectedNumbers)
      if(!newCadidate) {
        setActualCandidate({ //if the number is incorrect shows 'Nulo'
          Id: 0,
          Nome: "Nulo",
        })
      }else{
        setActualCandidate(newCadidate);
      }
    } else {
      setActualCandidate(undefined);
    }
  },[selectedNumbers, status])


  const voters = [
    {Id: 1234, Nome: "Eleitor A"},
    {Id: 5678, Nome: "Eleitor B"},
    {Id: 9012, Nome: "Eleitor C"},
    {Id: 9314, Nome: "Eleitor D"},
    {Id: 1601, Nome: "Luiz Claudio"},
    {Id: 5500, Nome: "Lucas"},
  ]
  const votingCategorys = {
    lanches: {
      digits: 2,
      candidates: [
        {Id: 11, Nome: "Hamburguer", Partido: "Breadzil"},
        {Id: 22, Nome: "Pizza", Partido: "Brapzza"},
        {Id: 33, Nome: "Pastel", Partido: "Massa"}
      ]
    },
    bebidas: {
      digits: 3,
      candidates: [
        {Id: 444, Nome: "Refrigerante", Partido: "RefriBra"},
        {Id: 777, Nome: "Suco", Partido: "Frutas"},
        {Id: 999, Nome: "Água", Partido: "Potável"}
      ]
    },
    automôveis: {
      digits: 6,
      candidates: [
        {Id: 555555, Nome: "Carro", Partido: "Poluidos"},
        {Id: 888888, Nome: "Bicicleta", Partido: "Ambiente"},
        {Id: 101010, Nome: "Avião", Partido: "Nuvens"}
      ]
    }
  }



  /** when 'CONFIRMA/BRANCO' key is pressed */
  function nextState(isWhiteVote = false) {
    
    if(status === "Loading")
      return


    if(status === "WaitingVoter" || status === "NotElegible"){
      if(selectedNumbers === "0000"){
        ChangeState("VoteViewer");
        return;
      }


      const person = FindArrById(voters, Number(selectedNumbers));
      setCurrentVoter(person);
      setVotingFor(0);
      setSelectedNumbers("");

      if(person){
        const allVotersInStorage = localStorage.getItem("Voters") || "[]";
        const allVoters = JSON.parse(allVotersInStorage) as number[];
        if(allVoters.includes(person.Id)){
          ChangeState("AlreadyVoted");
        }else {
          ChangeState("VoteZone");
        }
      }
      else
        ChangeState("NotElegible");
    }
    if(status == "VoteZone") {
      const voteIn = isWhiteVote ? -1: actualCandidate!.Id
      setVotes(votes => [...votes, voteIn]);
      setVotingFor(num => (num + 1));
      setSelectedNumbers("");
      ChangeState("VoteZone");
    }
  }


  /** Get vote options(candidates) and set maxChars  */
  function getVoteOptions() {
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

  /** Simple animation to flick the screen */
  function ChangeState(newState: StatusTypes) {
    setStatus("Transition");
    setTimeout(() => {
      setStatus(newState);
    }, 50); // simulate load or an transition between screens
  }

  function HandleEndVotation(){
    setStatus("Finalized");
    
    SaveVote({
      voter: currentVoter!,
      votes: votes
    })

    setActualCandidate(undefined);
    setMaxCharacters(4);
    setSelectedNumbers("");
    setVotes([]);
    setVotingFor(0);



    setTimeout(() => {
      setStatus("WaitingVoter")
    }, 3000);
  }

  
  function getVotingCategories() {
    return votingCategorys;
  }
  function getVotersRegistred() {
    return voters;
  }

  type VoteProps = {
    voter: votingSpecs;
    votes: number[];
  }
  function SaveVote({votes, voter}: VoteProps){
    console.log("Saved: " + votes + " " + voter.Nome)
    const allVotersInStorage = localStorage.getItem("Voters") || "[]";
    const allVoters = JSON.parse(allVotersInStorage) as number[];
    localStorage.setItem("Voters", JSON.stringify([...allVoters, voter.Id]))

    for(let i = 0; i < votes.length;i++){
      const key = `${i}/${votes[i]}`
      const prevVotes = localStorage.getItem(key) || "0";
      const newVotes = Number(prevVotes) + 1;
      localStorage.setItem(key,String(newVotes));
    }
    
  }
  
  return <VoteContext.Provider value={{
    selectedNumbers,
    maxCharacters,
    status,
    votingFor,
    currentVoter,
    actualCandidate,
    getVotingCategories,
    setSelectedNumbers,
    getVotersRegistred,
    getVoteOptions,
    setStatus,
    nextState
  }}>
    {props.children}
  </VoteContext.Provider>
}



export function useVoteContext() {
  const voteContext = useContext(VoteContext)

  return voteContext
}