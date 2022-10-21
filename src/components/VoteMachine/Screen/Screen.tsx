import { HTMLAttributes, useEffect, useState } from "react"
import { useVoteContext } from "../../../contexts/VoteContext";
import { GetTodayDateFormated } from "../../../lib/GetTodayDateFormated";
import { Loading } from "./Loading/Loading";
import styles from "./screen.module.scss"
import { WaitingVoter } from "./WaitingVoter/Loading";



interface ScreenProps extends HTMLAttributes<HTMLDivElement>{
  className?: string;
}
type StatusStates = 
  "Loading" | 
  "WaitingVoter" | "";

export function Screen({className, ...props}: ScreenProps){

  const { status, setStatus } = useVoteContext();


  /** Mouse Flare Handle Effect */
  function handleWindowMouseMove(event: MouseEvent) {
    const flare = document.getElementById("flare");
    flare!.style.setProperty("--mouseX", (event.pageX - 500) + "%");
  }

  useEffect(() => {
    window.addEventListener('mousemove', handleWindowMouseMove);

    setInterval(() => {
      setStatus("WaitingVoter")
    }, 5000)
  })


  return (
    <main 
      className={styles.screen + ` ${className}`} 
      {...props}
    >
      <div id="flare" className={styles.flare}></div>
      {status === "Loading" && <Loading/>}

      {status === "WaitingVoter" && <WaitingVoter />}
    </main>
  )
}

