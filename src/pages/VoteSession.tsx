import { Credits } from "../components/Credits/Credits";
import { Info } from "../components/Info/Info";
import { VoteMachine } from "../components/VoteMachine/VoteMachine";
import styles from "../styles/vote-session.module.scss";

export function VoteSession() {

  return (
    <div className={styles.container}>
      
      <VoteMachine />
      <Info/>
      <Credits/>
    </div>
  )
}

