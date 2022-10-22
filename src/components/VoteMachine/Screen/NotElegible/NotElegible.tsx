import { GetTodayDateFormated } from "../../../../lib/GetTodayDateFormated";
import { VoteTable } from "../VoteTable/VoteTable";
import styles from "./not-elegible.module.scss";


export function NotElegible() {
  return (
    <div className={styles.NotElegible}>
      <header>
        <span>{GetTodayDateFormated()}</span>
        <h3>TREINAMENTO</h3>
      </header>

      <h2>Pessoa Não Identificada</h2>
      <p>Verifique seu ID</p>
      <p>Digite novamente</p>

      <div className={styles.idInsert}>Seu ID: <VoteTable/></div>

      <footer>
        <hr />
        <h3>Aperte a tecla:</h3>
        <p>CONFIRMA para CONFIRMAR sua identificação</p>
        <p>CORRIGE para CORRIGIR o número digitado</p>
      </footer>
    </div>
  )
}