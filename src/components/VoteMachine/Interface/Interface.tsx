import { HTMLAttributes } from "react";
import { Numpad } from "./Numpad/Numpad";
import styles from "./Interface.module.scss"
import { Button } from "./Button/Button";


interface DisplayProps extends HTMLAttributes<HTMLDivElement>{
  className?: string;
}
export function Interface({className, ...props}: DisplayProps){

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
        
        <Numpad />
        <div className={styles.buttons}>
          <Button format="text" color="#fff">
            BRANCO <span>⠃⠗⠁⠝⠉⠕</span>
          </Button>
          <Button format="text" color="#cc6f35">
            CORRIGE <span>⠉⠕⠗⠗⠊⠛⠑</span>
          </Button>
          <Button format="stretch" color="#1a9d4a" style={{height: "2rem"}}>
            <big>CONFIRMA</big> <span>⠉⠕⠝⠋⠊⠗⠍⠁</span>
          </Button>
        </div>
      </div>

    </aside>
  )
}