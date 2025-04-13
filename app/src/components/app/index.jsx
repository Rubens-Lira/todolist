import { BrowserRouter } from "react-router";
import { Header, Routes } from "../";
import styles from "./style.module.css";

function App() {
  return (
    <BrowserRouter>
      <div className={styles.wrapper}>
        <Header />
        <Routes />
      </div>
    </BrowserRouter>
  );
}

export default App;

