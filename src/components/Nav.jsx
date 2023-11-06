import styles from "../styles/nav.module.css";
import { useEffect, useRef } from "react";

export default function Nav({ updateType }) {
  //Refs
  const logoRef = useRef();

  //State changes
  const onClickForecast = () => {
    updateType("Temperatura", true);
  };
  const onClickAwareness = () => {
    updateType("Alertas", true);
  };
  const onClickHome = () => {
    updateType(null, false);
  };

  //Scroll events
  const toggleLogoVisibility = () => {
    if (window.scrollY > 0) {
      logoRef.current.style.display = "none";
    } else if (window.scrollY === 0) {
      logoRef.current.style.display = "list-item";
    }
  };

  useEffect(() => {
    window.addEventListener("load", toggleLogoVisibility);
    window.addEventListener("scroll", toggleLogoVisibility);

    return () => {
      window.addEventListener("load", toggleLogoVisibility);
      window.removeEventListener("scroll", toggleLogoVisibility);
    };
  }, []);

  //Render
  return (
    <div className={styles.nav}>
      <ul className={styles.navBar}>
        <li className={styles.item} id={styles.logo} ref={logoRef}>
          Weather App
        </li>
        <li className={styles.item} onClick={onClickHome}>
          Início
        </li>
        <li className={styles.item} onClick={onClickForecast}>
          Temperatura
        </li>
        <li className={styles.item} onClick={onClickAwareness}>
          Alertas
        </li>
      </ul>
    </div>
  );
}
