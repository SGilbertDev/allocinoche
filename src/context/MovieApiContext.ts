import { createContext } from "react";
import MovieApi from "@core/MovieApi";
export default createContext(new MovieApi());
