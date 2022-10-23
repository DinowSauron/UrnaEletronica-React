import styles from "./vote-machine.module.scss";
import { Screen } from "./Screen/Screen";
import { Interface } from "./Interface/Interface";
import { Spacers } from "../Spacers/Spacers";
import { VoteContextProvider } from "../../contexts/VoteContext";

export function VoteMachine(){

  return (
    <div className={styles.machine}>

      <VoteContextProvider>
        <Screen className={styles.screen} />
        <Interface className={styles.interface} />
      </VoteContextProvider>

      <footer>
        <Spacers manyTimes={11}/>
      </footer>
    </div>
  )
}
