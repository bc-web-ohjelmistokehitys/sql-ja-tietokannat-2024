import { FC } from "react";
import { useParams } from "react-router";
import Radar from "../radar/Radar";

const RadarPage: FC = () => {
  const { id } = useParams() as { id: string };

  return <Radar id={id} />;
};

export default RadarPage;
