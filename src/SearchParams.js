import React, { useState, useEffect } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import useDropdown from "./useDropdown";

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
      <form>
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
        <button>SUBMIT</button>
      </form>
    </div>
  );
};

export default SearchParams;
