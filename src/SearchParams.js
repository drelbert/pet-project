import React, { useState, useEffect, useContext } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import useDropdown from "./useDropdown";
import Results from "./Results";
import ThemeContext from "./ThemeContext";

//effect lifecycle step one: SearchParams renders for the first time with all the variables
const SearchParams = () => {
  //this is a hook and enables stateful logic
  //useState creates the hook
  //returns an array of 2 things, [current state, updater function]
  //and the variable is using destructuring
  const [location, setLocation] = useState("Seattle, WA");
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);
  const [pets, setPets] = useState([]);
  const [theme, setTheme] = useContext(ThemeContext);

  //async function returns a promise that resolves when funct completes
  async function requestPets() {
    const { animals } = await pet.animals({
      location,
      breed,
      type: animal
    });

    setPets(animals || []);
  }

  //effect lifecycle step two is the scheduling of useEffect
  //effect lifecycle step four is the running of the effect and the calling of the function
  //useEffect getting a function that is just scheduling useEffect to run after the below return()
  useEffect(() => {
    setBreeds([]);
    setBreed(" ");

    pet.breeds(animal).then(({ breeds: apiBreeds }) => {
      const breedStrings = apiBreeds.map(({ name }) => name);
      setBreeds(breedStrings);
    }, console.error);
  }, [animal, setBreed, setBreeds]); //this [] is a set of dependencies to control the useEffect schedule and update

  //effect lifecycle step three is the return of all the markup to be rendered to the DOM
  //note the {} is for using the expressions from above
  //eg location is declared above and will render in as an h1
  return (
    <div className="search-params">
      <h1>{location}</h1>
      <form
        onSubmit={e => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={e => setLocation(e.target.value)}
          />
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        <label htmlFor="theme">
          Theme
          <select
            value={theme}
            onChange={e => setTheme(e.target.value)}
            onBlur={e => setTheme(e.target.value)}
          >
            <option value="grey">Grey</option>
            <option value="darkgrey">Dark Grey</option>
            <option value="darkblue">Dark Blue</option>
            <option value="pink">Pink</option>
          </select>
        </label>
        <button style={{ backgroundColor: theme }}>SUBMIT</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
