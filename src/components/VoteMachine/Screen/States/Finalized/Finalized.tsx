import { useEffect } from "react";
import styles from "./Finalized.module.scss"


export function Finalized() {

  useEffect(() => {
    const audio = new Audio("/plililim.mp3");
    audio.play();
  },[])

  return (
    <div className={styles.Finalized}>
      <img src="brasaooficialcolorido.png" alt="brasão ministério público" />
      <h2>FIM</h2>
      <p>VOTOU</p>
    </div>
  )
}
