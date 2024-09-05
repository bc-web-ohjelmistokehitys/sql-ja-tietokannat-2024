import "./App.css";
import Header from "./Header";
import MainContainer from "./MainContainer";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <MainContainer>
        <Outlet />
      </MainContainer>
      <Footer />
    </>
  );
}

export default App;
