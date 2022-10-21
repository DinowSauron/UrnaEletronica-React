import { VoteMachine } from "../components/VoteMachine/VoteMachine"
import styles from "../styles/vote-session.module.scss"

export function VoteSession() {

  return (
    <div className={styles.container}>
      
      <VoteMachine />
    </div>
  )
}
