const { writeFileSync, mkdirSync } = require("fs");
const { resolve, join } = require("path");
require("dotenv").config();
const axios = require("axios");

const Airtable = require("airtable");

if (!process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN) {
  console.log("Missing environment variable: AIRTABLE_PERSONAL_ACCESS_TOKEN");
}
if (!process.env.OMDB_API) {
  console.log("Missing environment variable: OMDB_API");
}

Airtable.configure({ apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN });
const base = new Airtable().base(process.env.AIRTABLE_BASE_ID);

const moviesTable = base("Movies");
// const moviesTable = base("STAGING_Movies");

function log(message) {
  console.log(`${Date.now()} | ${message}`);
}

async function getMovies() {
  const movies = await moviesTable
    .select({
      view: "Published",
      filterByFormula: "NOT({Error})",
    })
    .all();
  log(`${movies.length} movie games in database`);
  return movies;
}

async function filterMovies(movies) {
  return movies.filter((movie) => {
    let { Slug, OMDB, imdb_id, Year } = movie.fields;
    if (!Slug || !OMDB || !imdb_id || !Year) {
      return movie;
    }
  });
}

async function getOMDb(imdb_id = null, title = null, year = null) {
  try {
    let OMDB_URL = `http://www.omdbapi.com/?apikey=${process.env.OMDB_API}&`;
    let params;
    if (imdb_id) {
      params = `i=${imdb_id}`;
    } else {
      params = `t=${title}&y=${year}`;
    }

    let omdbRes = await axios.get(OMDB_URL + params);
    if (omdbRes.Response === "False") {
      log(`Failed: getOMDb | ${omdbRes.Error}`);
      return;
    }

    return omdbRes.data;
  } catch (error) {
    log(`Failed: getOMDb | ${imdb_id} ${title} ${year}`);
  }
}

function slugify(string) {
  try {
    if (!string) return;
    const a =
      "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
    const b =
      "aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
    const p = new RegExp(a.split("").join("|"), "g");

    return string
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
      .replace(/&/g, "-and-") // Replace & with 'and'
      .replace(/[^\w\-]+/g, "") // Remove all non-word characters
      .replace(/\-\-+/g, "-") // Replace multiple - with single -
      .replace(/^-+/, "") // Trim - from start of text
      .replace(/-+$/, ""); // Trim - from end of text
  } catch (error) {
    console.log("Failed to slugify: ", string);
    console.log("slugify()", error);
  }
}

async function processMovies(movies) {
  log(`Processing ${movies.length} new games`);
  return movies.map(async (movie) => await processMovie(movie));
}

async function processMovie(movie) {
  try {
    log(`Updating movie: ${movie.Movie}`);
    let { id } = movie;
    let { imdb_id, Movie, Year } = movie.fields;
    let omdbData = await getOMDb(imdb_id, Movie, Year);

    if (!omdbData) return;

    let fields = {};
    fields.imdb_id = omdbData.imdbID;
    fields.Images = [
      {
        url: omdbData.Poster,
      },
    ];
    fields.Slug = [slugify(Movie), slugify(Year), movie.id].join("/");
    fields.OMDB = JSON.stringify(omdbData);
    if (!Year) {
      fields.Year = parseInt(omdbData.Year);
    }

    let updatedRecord = {
      id,
      fields,
    };

    moviesTable
      .update([updatedRecord])
      .then((result) => {
        log(`Updated: ${id} ${Movie}`);
        return result;
      })
      .catch((error) => {
        console.log("Update Failed: ", updatedRecord, error);
        // moviesTable.update([{ id, Error: true }]);
      });
  } catch (error) {
    log(`Update Failed: ${movie.id} ${movie.Movie} | ${error}`);
  }
}

async function main() {
  try {
    let movies = await getMovies();
    let newMovies = await filterMovies(movies);
    let processedMovies = await processMovies(newMovies);
    log(`Processed: ${processedMovies.length}`);
  } catch (error) {
    log("Failed: processNewMovieGames", error);
  }
}

main();
