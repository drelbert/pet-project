import { createContext, useState } from "react";

// Here, telling CreateContext, what type of thing that is passed which is string with a function that that takes in a string, but returns nothing
// Like a parameter to a type
const ThemeContext = createContext<[string, (theme: string) => void]>([
  "grey",
  () => {}
]);

export default ThemeContext;
