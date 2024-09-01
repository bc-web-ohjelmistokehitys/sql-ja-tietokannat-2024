import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useQuery } from "@tanstack/react-query";
import { getRadarData } from "./services/radar";
import Radar from "./Radar";

function App() {
  const [count, setCount] = useState(0);

  const { data, error, isLoading } = useQuery({
    queryKey: ["radar"],
    queryFn: async () => {
      return getRadarData();
    },
  });

  if (isLoading) {
    return <>laddare</>;
  }

  if (error) {
    return <>errore</>;
  }

  console.log(data);

  return (
    <>
      <Radar config={{}} data={data} />
    </>
  );
}

export default App;
