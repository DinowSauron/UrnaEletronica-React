import { useVoteContext } from "../../../../../contexts/VoteContext"
import { GetTodayDateFormated } from "../../../../../lib/GetTodayDateFormated"
import { VoteTable } from "../../VoteTable/VoteTable"
import styles from "./VoteViewer.module.scss"


export function VoteViewer() {
  
  const {
    getVotingCategories,
    getVotersRegistred
  } = useVoteContext();
  const categories = getVotingCategories();
  const voters = getVotersRegistred();
  const VotersVoted = localStorage.getItem("Voters") || "[]";
  const votersQuantity = JSON.parse(VotersVoted).length;

  const usersVotedPercent = (100 / voters.length * votersQuantity).toFixed(1);

  return (
    <div className={styles.VoteViewer}>
      <header>
        <span>{GetTodayDateFormated()}</span>
        <h3>APURAÇÃO</h3>
      </header>

      <section>

        <div>
          <h3>Apuração: </h3>
          <p>Porcentagem : {usersVotedPercent}%</p>
          <p>Votos Totais: {votersQuantity}</p>
          <p>Cadastrados : {voters.length}</p>
        </div>
        
        <hr />

        {Object.entries(categories).map((category,index) => {
          const nulos = localStorage.getItem(`${index}/0`) || "0";
          const brancos = localStorage.getItem(`${index}/-1`) || "0";
  
          return (
          <div>
            <h3>{category[0]}:</h3>
            {category[1].candidates.map(candidate => {
              const votes = localStorage.getItem(`${index}/${candidate.Id}`) || "0";
              return ShowCandidateInformation(candidate.Nome,votes, votersQuantity);
            })}
            <hr/>
            <p>{ShowCandidateInformation("Nulos", nulos, votersQuantity)}</p>
            <p>{ShowCandidateInformation("Brancos", brancos, votersQuantity)}</p>
          </div>
          )
        })}
      </section>

      <footer>
        <hr />
        <h3>Aperte a tecla:</h3>
        <p>BRANCO ou CONFIRMA para sair da visualização</p>
      </footer>
    </div>
  )
}

function ShowCandidateInformation(name: string,votes: string, votersQuantity: number) {
  const percent = votersQuantity * Number(votes) + "%";
  

  return <p>
    {(name).padEnd(20,"_")}
    {(percent).padStart(4,"_")} - Votes: {votes} 
  </p>
}