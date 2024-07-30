import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { Characters } from "./types";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SingleCell from "./components/SingleCell/SingleCell";
import Details from "./pages/Details";

function App() {
  const [characters, setCharacters] = useState<Characters[]>([]);
  const url = "https://swapi.dev/api/people/";
  const groupedPeople = [];

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    try {
      const { data } = await axios.get(url);
      setCharacters(data.results);
    } catch (err) {
      throw new Error("Failed to fetch characters");
    }
  };

  for (let i = 0; i < characters.length; i += 5) {
    groupedPeople.push(characters.slice(i, i + 5));
  }

  return (
    <div className="table_container">
      <Router>
        <Routes>
          <Route
            path="/"
            element={groupedPeople.map((group, index) => (
              <SingleCell key={index} group={group} />
            ))}
          />
          <Route path="/details" element={<Details />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
