import { useVoteContext } from "../../../../contexts/VoteContext";
import { VoteTables } from "../VoteTables/VoteTables";
import styles from "./voting-zone.module.scss";


export function VotingZone() {

  const {
    currentVoter, 
    actualCandidate,
    votingFor,
    ChangeScreen, 
    getVotingCategories,
  } = useVoteContext();

  if(!currentVoter){
    ChangeScreen("NotElegible");
    return <></>;
  }

  const categorys = Object.entries(getVotingCategories());
  const votingIn = categorys[votingFor]&&categorys[votingFor][0];

  return (
    <div className={styles.VotingZone}>
      <header>
        Usuário: {currentVoter.Nome} <span>#{currentVoter.Id}</span>
      </header>
      <h2>Seu voto para:</h2>
      <h3>{votingIn}</h3>
      <div className={styles.idInsert}>{("Número:").padEnd(20, " ")} <VoteTables/></div>
     
      {actualCandidate && (
        <img src={`/candidates/${actualCandidate.pictureUrl || "Question.png"}`} alt="Foto do candidato" />
      )}
     
      <p>Nome: {actualCandidate?.Nome}</p>
      <p>Partido: {actualCandidate?.Partido}</p>
      <footer>
        <hr />
        <h3>Aperte a tecla:</h3>
        <p>CONFIRMA para CONFIRMAR seu voto para {votingIn}</p>
        <p>CORRIGE para CORRIGIR o número digitado</p>
        <p>BRANCO para votar em BRANCO</p>
      </footer>
    </div>
  )
}
