
import styles from "./VoteTable.module.scss"


interface VoteTableProps {
  numbers: number;
}
export function VoteTable({numbers}: VoteTableProps) {

  

  return (
    <div className={styles.VoteTable}>
      <div className={styles.numbers}>
        <div>⠀</div>
        <div>⠀</div>
        <div>⠀</div>
        <div>⠀</div>
      </div>
    </div>
  )
}