import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Characters } from "../types";
import axios from "axios";

const Details = () => {
  const location = useLocation();
  const [filmNames, setFilmNames] = useState<string[]>([]);
  const { person } = location.state as { person: Characters };

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const fetchFilms = person.films.map((url) => axios.get(url));
        const filmResponse = await Promise.all(fetchFilms);
        const filmTitles = filmResponse.map((response) => response.data.title);
        setFilmNames(filmTitles);
      } catch (err) {
        throw new Error("Failed to fetch film details");
      }
    };

    fetchFilms();
  }, [person.films]);

  return (
    <div>
      <h1>Details</h1>
      <p>
        <strong>Name:</strong> {person.name}
      </p>
      <p>
        <strong>Height:</strong> {person.height}
      </p>
      <p>
        <strong>Skin Color:</strong> {person.skin_color}
      </p>
      <h2>Films</h2>
      <ul>
        {filmNames.map((film, index) => (
          <li key={index}>{film}</li>
        ))}
      </ul>
    </div>
  );
};

export default Details;
