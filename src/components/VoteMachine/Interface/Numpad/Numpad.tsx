
import styles from "./numpad.module.scss";
import { Button } from "../Button/Button";

interface NumpadProps {
  onKeyPress: (agr0: number) => void;
}


export function Numpad({onKeyPress, ...props}: NumpadProps){

  return (
    <div className={styles.numPad} {...props}>

      <div className={styles.line}>
        <Button onClick={() => onKeyPress(1)}> 1 <span>⠼⠁</span></Button>
        <Button onClick={() => onKeyPress(2)}> 2 <span>⠼⠃</span></Button>
        <Button onClick={() => onKeyPress(3)}> 3 <span>⠼⠉</span></Button>
      </div>
      <div className={styles.line}>
        <Button onClick={() => onKeyPress(4)}> 4 <span>⠼⠙</span></Button>
        <Button onClick={() => onKeyPress(5)}> 5 <span>⠼⠑</span></Button>
        <Button onClick={() => onKeyPress(6)}> 6 <span>⠼⠋</span></Button>
      </div>
      <div className={styles.line}>
        <Button onClick={() => onKeyPress(7)}> 7 <span>⠼⠛</span></Button>
        <Button onClick={() => onKeyPress(8)}> 8 <span>⠼⠓</span></Button>
        <Button onClick={() => onKeyPress(9)}> 9 <span>⠼⠊</span></Button>
      </div>
      <div className={styles.line}>
        <Button onClick={() => onKeyPress(0)}> 0 <span>⠼⠚</span></Button>
      </div>
    </div>
  )
}


