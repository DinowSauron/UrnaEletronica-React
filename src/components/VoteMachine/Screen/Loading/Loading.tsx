import styles from "./loading.module.scss";


export function Loading() {
  return (
    <div className={styles.loading}>
      <img src="brasaooficialcolorido.png" alt="brasão ministério público" />
      <h2>Justiça eleitoral</h2>
    </div>
  )
}