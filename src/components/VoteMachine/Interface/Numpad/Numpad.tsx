
import { HTMLAttributes } from "react";
import styles from "./numpad.module.scss"
import { Button } from "../Button/Button"

interface NumpadProps extends  HTMLAttributes<HTMLDivElement>{
  
}

export function Numpad({ ...props}: NumpadProps){
  


  return (
    <div className={styles.numPad} {...props}>

      <div className={styles.line}>
        <Button >1 <span>⠼⠁</span></Button>
        <Button > 2 <span>⠼⠃</span></Button>
        <Button > 3 <span>⠼⠉</span></Button>
      </div>
      <div className={styles.line}>
        <Button > 4 <span>⠼⠙</span></Button>
        <Button > 5 <span>⠼⠑</span></Button>
        <Button > 6 <span>⠼⠋</span></Button>
      </div>
      <div className={styles.line}>
        <Button > 7 <span>⠼⠛</span></Button>
        <Button > 8 <span>⠼⠓</span></Button>
        <Button > 9 <span>⠼⠊</span></Button>
      </div>
      <div className={styles.line}>
        <Button > 0 <span>⠼⠚</span></Button>
      </div>
    </div>
  )
}


