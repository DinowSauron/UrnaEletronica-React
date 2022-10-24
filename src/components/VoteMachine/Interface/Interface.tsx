import { HTMLAttributes } from "react";
import { Numpad } from "./Numpad/Numpad";
import styles from "./interface.module.scss";
import { Button } from "./Button/Button";
import { useVoteContext } from "../../../contexts/VoteContext";


interface DisplayProps extends HTMLAttributes<HTMLDivElement>{
  className?: string;
}
export function Interface({className, ...props}: DisplayProps){

  const { 
    status,
    selectedNumbers, 
    maxCharacters,
    nextStep,
    ChangeScreen,
    setSelectedNumbers,
  } = useVoteContext();
  const audio = new Audio("./Plim.mp3");


  function handleNumpadKeyPress(key: number) {
    audio.play();
    // console.log("Preview Numbers: "+selectedNumbers);
    
    if(
      selectedNumbers.length >= maxCharacters && 
      !selectedNumbers.includes("•") ||
      ["Loading", "Finalized"].includes(status)
    ) return;
    
    // if the vote is white, dont pass
    const previousNumbers = selectedNumbers.includes("•") ? "": selectedNumbers;
    setSelectedNumbers((previousNumbers + key).toString());
  }

  function handleCorrectKeyPress() {
    audio.play();
    const newNumber = selectedNumbers.includes("•") ? "" :
    selectedNumbers.slice(0,selectedNumbers.length - 1);

    setSelectedNumbers(newNumber);
  }

  function handleWhiteKeyPress() {
    audio.play();
    if(status === "VoteViewer") {
      // clear all data
      localStorage.clear();
      ChangeScreen("VoteViewer");
      setSelectedNumbers("");
    }
    setSelectedNumbers("".padStart(maxCharacters,"•"));
    // nextStep(true);
  }

  function handleConfirmKeyPress() {
    audio.play();
    ReturnIfNeeded();
    if(status === "Loading" || selectedNumbers.length < maxCharacters) 
      return; // do nothing...
    nextStep();
  }


  /** Return to main State if need */
  function ReturnIfNeeded(){
    if(status === "VoteViewer") {
      ChangeScreen("WaitingVoter");
      setSelectedNumbers("");
    }
  }

  return (
    <aside 
      className={[
        styles.display,
        className
      ].join(" ")}
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
            disabled={["WaitingVoter", "NotElegible", "Loading", "AlreadyVoted"].includes(status)}
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