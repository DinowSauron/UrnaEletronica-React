import { useEffect } from "react";
import { useVoteContext } from "../../../../../contexts/VoteContext";
import styles from "./errorAlreadyVoted.module.scss"


export function ErrorAlreadyVoted() {

  const {setStatus} = useVoteContext()

  useEffect(() => {
    const audio = new Audio("/plililim.mp3");
    audio.play();

    setTimeout(() => {
      setStatus("WaitingVoter");
    }, 2000);
  }, [])


  return (
    <div className={styles.ErrorAlreadyVoted}>
      <img src="brasaooficialcolorido.png" alt="brasão ministério público" />
      <h2>Error</h2>
      <p>O Voto deste eleitor já foi cadastrado!</p>
    </div>
  )
}
