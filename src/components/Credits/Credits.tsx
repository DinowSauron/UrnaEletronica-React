import styles from "./credits.module.scss";


export function Credits(){


  return (
    <footer className={styles.credits}>
      <p>Luiz Claudio</p>
      <p>•</p>
      <a 
        href="http://luizclaudio.dev.br/"
        target="_blank"
        rel="noreferrer"
      >
        Portfólio
      </a>
      <a 
        href="https://github.com/DinowSauron"
        target="_blank"
        rel="noreferrer"
      >
        Github
      </a>
      <a 
        href="https://www.linkedin.com/in/luiz-claudio-cardoso/"
        target="_blank"
        rel="noreferrer"
      >
        Linkedin
      </a>
      <p>•</p>
      <a 
        href="https://github.com/DinowSauron/UrnaEletronica-React"
        target="_blank"
        rel="noreferrer"
      >
        Código Fonte 
      </a>
    </footer>
  )
}

