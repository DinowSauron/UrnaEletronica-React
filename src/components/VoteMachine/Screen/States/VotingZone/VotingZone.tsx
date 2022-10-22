import { useEffect, useState } from "react";
import { useVoteContext, votingSpecs } from "../../../../../contexts/VoteContext"
import { FindArrById } from "../../../../../lib/FindArrById";
import { GetTodayDateFormated } from "../../../../../lib/GetTodayDateFormated"
import { VoteTable } from "../../VoteTable/VoteTable"
import styles from "./VotingZone.module.scss"


export function VotingZone() {

  const {
    currentVoter, 
    actualCandidate,
    votingFor,
    getVotingCategories,
    setStatus, 
  } = useVoteContext();

  if(!currentVoter){
    setStatus("NotElegible");
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
      <div className={styles.idInsert}>{("Número:").padEnd(20, " ")} <VoteTable/></div>
     
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
