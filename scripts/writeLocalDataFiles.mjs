// const fs = require("fs");
// const path = require("path");
// const { fetchMovieList } = require("../lib/movies");
// const { getListLinks, populateLists } = require("../lib/listicles");

import fs from "fs";
import path from "path";
import { fetchMovieList } from "../lib/movies.js";
import { getListLinks, populateLists } from "../lib/listicles.js";

async function generateJSONFiles() {
  try {
    const movies = await fetchMovieList();
    const lists_raw = await getListLinks();
    const lists = populateLists(lists_raw, movies); // Your populateLists function

    fs.writeFileSync(
      path.resolve(__dirname, "../public/data/movies.json"),
      JSON.stringify(movies)
    );
    fs.writeFileSync(
      path.resolve(__dirname, "../public/data/lists.json"),
      JSON.stringify(lists)
    );

    console.log("Data generated successfully!");
  } catch (error) {
    console.error("Error generating data:", error);
  }
}

generateJSONFiles();
