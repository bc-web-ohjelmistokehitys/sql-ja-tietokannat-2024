import { FC } from "react";
import { FaSpinner } from "react-icons/fa";
import styles from "./Spinner.module.css";

const Spinner: FC = () => {
  return <FaSpinner className={styles.spin} />;
};

export default Spinner;
