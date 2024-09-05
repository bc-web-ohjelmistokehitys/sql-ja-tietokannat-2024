import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { getAllRadars } from "../services/radar";
import Spinner from "../Spinner";
import { Link } from "react-router-dom";

const IndexPage: FC = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["radars"],
    queryFn: async () => {
      return getAllRadars();
    },
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error loading radars.</div>;
  }

  if (!data) {
    return <div>Zero radars found.</div>;
  }

  return (
    <ul>
      {data.map((radar) => {
        return (
          <li key={radar.id}>
            <Link to={`/radar/${radar.id}`}>
              {radar.name} ({radar.date})
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default IndexPage;
