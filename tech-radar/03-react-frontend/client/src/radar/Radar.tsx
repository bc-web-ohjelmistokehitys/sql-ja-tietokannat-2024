import { FC } from "react";
import RadarChart from "./RadarChart";
import { useQuery } from "@tanstack/react-query";
import { getRadarData } from "../services/radar";
import Spinner from "../Spinner";

const Radar: FC = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["radar"],
    queryFn: async () => {
      return getRadarData();
    },
  });

  if (isLoading) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Spinner /> Error loading data. Open developer tools and debug.
      </>
    );
  }

  if (!data) {
    return <>No data for some reason...</>;
  }

  return <RadarChart data={data} />;
};

export default Radar;
