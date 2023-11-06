import home from "../img/home.jpg";
import styles from "../styles/home.module.css";

export default function Home() {
  //Render
  return (
    <div className={styles.content}>
      <img className={styles.image} src={home} alt="homepage" />
      <section className={styles.section}>
        <p className={styles.textHead}>
          Temperaturas e alertas meteorológicos em todo Portugal Continental
        </p>
        <p className={styles.textBody}>
          Obtenha as informações climáticas que mais necessita, a qualquer
          instante. Sua fonte fiável de previsões em tempo real, para que possa
          planear seu dia com confiança. Simples, preciso e sempre ao seu
          alcance.
        </p>
        <p className={styles.textBody}>
          Bem-vindo ao seu companheiro de clima de confiança.
        </p>
      </section>
    </div>
  );
}
