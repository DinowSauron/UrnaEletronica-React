import { GetTodayDateFormated } from "../../../../lib/GetTodayDateFormated";
import { VoteTables } from "../VoteTables/VoteTables";
import styles from "./waiting-voter.module.scss";


export function WaitingVoter() {
  return (
    <div className={styles.WaitingVoter}>
      <header>
        <span>{GetTodayDateFormated()}</span>
        <h3>TREINAMENTO</h3>
      </header>

      <h2>Urna pronta para receber o seu voto</h2>
      <p>Use o teclado numérico</p>
      <p>para se identificar</p>

      <div className={styles.idInsert}>Seu ID: <VoteTables/></div>

      <footer>
        <hr />
        <h3>Aperte a tecla:</h3>
        <p>CONFIRMA para CONFIRMAR sua identificação</p>
        <p>CORRIGE para CORRIGIR o número digitado</p>
      </footer>
    </div>
  )
}