import { FC } from "react";
import styles from "./Header.module.css";

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.heading}>Tech Radar App</h1>
    </header>
  );
};

export default Header;
