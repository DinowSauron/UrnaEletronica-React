
import { useVoteContext } from "../../../../contexts/VoteContext";
import styles from "./VoteTable.module.scss"



export function VoteTable() {

  const { selectedNumbers, maxCharacters } = useVoteContext();
  let index = -1;

  return (
    <div className={styles.VoteTable}>
      <div className={styles.numbers}>

        {[...Array(maxCharacters)].map(() => {
          index++;
          return <div key={index}>{selectedNumbers[index] || "⠀"}</div>
        })}

      </div>
    </div>
  )
}