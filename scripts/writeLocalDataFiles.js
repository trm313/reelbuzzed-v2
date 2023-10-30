const { writeFileSync, mkdirSync } = require("fs");
const { resolve, join } = require("path");
require("dotenv").config();

const Airtable = require("airtable");

if (!process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN) {
  console.log("Environment variables not set");
}

Airtable.configure({ apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN });
const base = new Airtable().base(process.env.AIRTABLE_BASE_ID);

const moviesTable = base("Movies");
const listsTable = base("Listicles");

async function getMovies() {
  const movies = await moviesTable
    .select({
      view: "Published",
      filterByFormula: "NOT({Error})",
    })
    .all();
  return movies;
}

async function getLists() {
  const lists = await listsTable.select({ view: "Published" }).all();
  return lists;
}

async function writeFile(filename, data) {
  try {
    let dirPath = join(process.cwd(), "static");
    let filePath = join(dirPath, filename);
    mkdirSync(dirPath, { recursive: true }); // recursive - means it won't throw an error if directory already exists
    writeFileSync(filePath, JSON.stringify(data));

    console.log("File created: ", filename);
    return;
  } catch (error) {
    console.error("Error writing file: ", filename, error);
    return;
  }
}

// ----------------------

async function main() {
  try {
    const movies = await getMovies();
    const lists = await getLists();

    writeFile("movies.json", movies);
    writeFile("lists.json", lists);

    return;
  } catch (error) {
    console.error("Error generating data:", error);
    return;
  }
}

main();
