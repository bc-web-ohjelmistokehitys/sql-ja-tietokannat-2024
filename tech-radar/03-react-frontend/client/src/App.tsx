import "./App.css";
import Header from "./Header";
import MainContainer from "./MainContainer";
import Footer from "./Footer";

import Radar from "./radar/Radar";

function App() {
  return (
    <>
      <Header />
      <MainContainer>
        <Radar />
      </MainContainer>
      <Footer />
    </>
  );
}

export default App;
