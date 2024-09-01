import { FC, useEffect, useId } from "react";
import { radar_visualization } from "./services/radar";

type Props = {
  config: {};
  data: {
    date: string;
    entries: [];
  };
};

const Radar: FC<Props> = ({ config, data }) => {
  const id = useId();
  useEffect(() => {
    radar_visualization({
      svg_id: id,
      repo_url: "https://github.com/Dr. Kobros/tech-radar",
      title: "Dr. Kobros Tech Radar",
      date: data.date,
      quadrants: [
        { name: "Languages & Frameworks" },
        { name: "Tools & Techniques" },
        { name: "Datastores" },
        { name: "Platforms" },
      ],
      rings: [
        { name: "ADOPT", color: "#5ba300" },
        { name: "TRIAL", color: "#009eb0" },
        { name: "ASSESS", color: "#c7ba00" },
        { name: "HOLD", color: "#e09b96" },
      ],
      entries: data.entries,
    });
  }, []);

  return <svg id="radar"></svg>;
};

export default Radar;
