import React from "react";
import styles from "../../styles/Loading.module.css";

interface LoaderProps {
  active?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ active = true }) => {
  return (
    <div className={active ? styles.loading : styles.none}>
      <div className={styles.uil_ring_css} style={{ transform: "scale(0.79)" }}>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
