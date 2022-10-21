import styles from "./vote-machine.module.scss"
import { Screen } from "./Screen/Screen"
import { Interface } from "./Interface/Interface"

export function VoteMachine(){

  return (
    <div className={styles.machine}>


      <Screen className={styles.screen} />

      <Interface className={styles.display} />

      <footer>
        <Spaces manyTimes={11}/>
      </footer>
    </div>
  )
}



function Spaces({manyTimes}: {manyTimes: number}){
  let i = 0;
  return (
    <>
      {[...Array(manyTimes)].map(() => {i++; return <div key={i}></div>})}
    </>
  )
}
