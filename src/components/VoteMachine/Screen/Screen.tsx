import { HTMLAttributes, useEffect, useState } from "react";
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

  const { status, setStatus } = useVoteContext();


  /** Mouse Flare Handle Effect */
  function handleWindowMouseMove(event: MouseEvent) {
    const flare = document.getElementById("flare");
    flare!.style.setProperty("--mouseX", (event.pageX - 500) + "%");
  }
  useEffect(() => {
    // window.addEventListener('mousemove', handleWindowMouseMove); maybe you like it?
  },[]);



  return (
    <main 
      className={styles.screen + ` ${className}`} 
      {...props}
    >
      {/* <div id="flare" className={styles.flare}></div> */}
      
      {status === "Loading" && <Loading/>}
      {status === "WaitingVoter" && <WaitingVoter />}
      {status === "NotElegible" && <NotElegible />}
      {status === "VoteZone" && <VotingZone />}
      {status === "Finalized" && <Finalized />}
      {status === "VoteViewer" && <VoteViewer />}
      {status === "AlreadyVoted" && <ErrorAlreadyVoted />}
    </main>
  )
}

