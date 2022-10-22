import { HTMLAttributes } from "react";
import { Numpad } from "./Numpad/Numpad";
import styles from "./Interface.module.scss"
import { Button } from "./Button/Button";
import { useVoteContext } from "../../../contexts/VoteContext";


interface DisplayProps extends HTMLAttributes<HTMLDivElement>{
  className?: string;
}
export function Interface({className, ...props}: DisplayProps){

  
  const { 
    setSelectedNumbers, 
    selectedNumbers, 
    maxCharacters,
    status,
    nextState,
    setStatus,
  } = useVoteContext();
  const audio = new Audio("/plim.mp3");




  function handleNumpadKeyPress(key: number) {
    audio.play();
    // console.log("Preview Numbers: "+selectedNumbers);

    if(selectedNumbers.length >= maxCharacters || status === "Loading" || status === "Finalized")
      return;
    setSelectedNumbers((selectedNumbers + key).toString());
  }

  function handleCorrectKeyPress() {
    audio.play();
    setSelectedNumbers(selectedNumbers.slice(0,selectedNumbers.length - 1));
  }

  function handleWhiteKeyPress() {
    audio.play();
    ReturnIfNeeded();
    nextState(true);
  }

  function handleConfirmKeyPress() {
    audio.play();
    ReturnIfNeeded();
    if(status === "Loading" || selectedNumbers.length < maxCharacters) 
      return;
    nextState();
  }

  function ReturnIfNeeded(){
    if(status === "VoteViewer") {
      setStatus("WaitingVoter");
      setSelectedNumbers("");
    }
  }

  return (
    <aside 
      className={styles.display + ` ${className}`} 
      {...props}
    >
      <header>
        <img src="/brasaooficialcolorido.png" alt="brasão ministério da república federativa do Brasil" />

        <h1>Justiça Eleitoral</h1>
      </header>

      <div>
        
        <Numpad onKeyPress={handleNumpadKeyPress}/>

        <div className={styles.buttons}>
          <Button 
            format="text" 
            color="#fff" 
            disabled={status === "WaitingVoter"}
            onClick={() => handleWhiteKeyPress()}
          >
            BRANCO <span>⠃⠗⠁⠝⠉⠕</span>
          </Button>

          <Button 
            format="text" 
            color="#cc6f35" 
            onClick={() => handleCorrectKeyPress()}
          >
            CORRIGE <span>⠉⠕⠗⠗⠊⠛⠑</span>
          </Button>

          <Button 
            format="stretch" 
            color="#1a9d4a" 
            style={{height: "2rem"}}
            onClick={() => handleConfirmKeyPress()}
          >
            <big>CONFIRMA</big> <span>⠉⠕⠝⠋⠊⠗⠍⠁</span>
          </Button>
        </div>
      </div>
    </aside>
  )
}