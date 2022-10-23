import { useState } from "react";
import { getVotersData } from "../../Data/Voters";
import { getVotingCategoriesData } from "../../Data/VotingCategories";
import styles from "./info.module.scss";

export function Info() {
  const [showInfo, setShowInfo] = useState(false);


  return (
    <div className={styles.info}>
      <button
        className={styles.infoIconButton}
        onClick={() => setShowInfo(e => !e)}
      >
        <img src="info.png" alt="Informação"/>
      </button>


      {showInfo && 
        <>
          <button className={styles.exitButtonInBackground} onClick={() => setShowInfo(e => !e)} aria-label="Sair">
            Fechar Notação
          </button>
          
          <div>
            <h2>Cola Da Urna</h2>
            <p>Não sabe as informações? Utilize essa colinha!</p>
            <hr />
            <h3>Eleitores Cadastrados:</h3>
            <p>ID: 0000 - Apuração dos votos</p>
            {getVotersData().map(voter => (
              <p key={voter.Nome}>ID: {(voter.Id).toString().padStart(4,"0")} - Nome: {voter.Nome}</p>
            ))}
            <hr />
            <h3>Votos Disponíveis:</h3>
            {Object.entries(getVotingCategoriesData()).map(type => (
              <div key={type[0]}>
                <h4>{type[0]}:</h4>
                {type[1].candidates.map(candidate => (
              <p key={candidate.Nome}>ID: {(candidate.Id).toString().padStart(type[1].digits,"0")} - Nome: {candidate.Nome}</p>
                ))}
              </div>
            ))}
            <footer>
              <hr />
              <p>Para sair clique no icone de Informação no canto superior esquerdo</p>
            </footer>
          
          </div>
        </>
      }
    </div>
  )
}