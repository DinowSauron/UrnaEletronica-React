
import { useVoteContext } from "../../../../contexts/VoteContext";
import styles from "./vote-table.module.scss";


export function VoteTables() {

  const { selectedNumbers, maxCharacters } = useVoteContext();
  let index = -1;

  return (
    <div className={styles.VoteTables}>
      <div className={styles.numbers}>

        {[...Array(maxCharacters)].map(() => {
          index++;
          return <div key={index}>{selectedNumbers[index] || "⠀"}</div>
        })}

      </div>
    </div>
  )
}