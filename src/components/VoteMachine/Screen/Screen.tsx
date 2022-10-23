import React, { HTMLAttributes } from "react";
import { useVoteContext } from "../../../contexts/VoteContext";
import { Loading } from "./Loading/Loading";
import styles from "./screen.module.scss";

import { WaitingVoter } from "./WaitingVoter/WaitingVoter";
import { NotElegible } from "./NotElegible/NotElegible";
import { VotingZone } from "./VotingZone/VotingZone";
import { Finalized } from "./Finalized/Finalized";
import { VoteViewer } from "./VoteViewer/VoteViewer";
import { ErrorAlreadyVoted } from "./ErrorAlreadyVoted/ErrorAlreadyVoted";


interface ScreenProps extends HTMLAttributes<HTMLDivElement>{
  className?: string;
}

export function Screen({className, ...props}: ScreenProps){

  const { status } = useVoteContext();

  const screens = {
    Loading: <Loading/>,
    WaitingVoter: <WaitingVoter/>,
    NotElegible: <NotElegible/>,
    VoteZone: <VotingZone/>,
    Finalized: <Finalized/>,
    VoteViewer: <VoteViewer/>,
    AlreadyVoted: <ErrorAlreadyVoted/>,
  }

  return (
    <main 
      className={[
        styles.screen, 
        className
      ].join(" ")}
      {...props}
    >
      {Object.entries(screens).map(([key, Component]) => {
        if(key === status)
          return <React.Fragment key={key}>{Component}</React.Fragment>;
      })}

      {/* 
      {status === "Loading" && <Loading/>}
      {status === "WaitingVoter" && <WaitingVoter />}
      {status === "NotElegible" && <NotElegible />}
      {status === "VoteZone" && <VotingZone />}
      {status === "Finalized" && <Finalized />}
      {status === "VoteViewer" && <VoteViewer />}
      {status === "AlreadyVoted" && <ErrorAlreadyVoted />} 
      */}
    </main>
  )
}

