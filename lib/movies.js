import Airtable from "airtable";
import { remark } from "remark";
import html from "remark-html";
import { getOMDbDataForMovie } from "./omdb";

// INIT DATA SOURCES
// import { base } from "./airtable";

Airtable.configure({ apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN });
const base = new Airtable().base(process.env.AIRTABLE_BASE_ID);
// const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
//   process.env.AIRTABLE_BASE_ID
// );

// PRIVATE FUNCTIONS
const isMovieValid = (record) => {
  let { id, fields } = record;
  if (!id || !fields.Slug || !fields.OMDB || !fields.Published) {
    return false;
  }
  return true;
};
const formatMovie = (record) => {
  return {
    id: record.id,
    SlugArr: record.fields.Slug.split("/"),
    Details: JSON.parse(record.fields.OMDB),
    ...record.fields,
  };
};

const getAirtableMovieRecords = async () => {
  const fetchPromise = new Promise((resolve, reject) => {
    let movieList = [];
    base("Movies")
      .select({
        view: "Published",
        filterByFormula: "NOT({Error})",
      })
      .all()
      .then((records) => {
        console.log("Fetched " + records.length + " movies");

        records.forEach(function (record) {
          if (isMovieValid(record)) {
            movieList.push(formatMovie(record));
          } else {
            console.log(
              "Movie validation failed: ",
              record.id,
              record.fields.Movie
            );
          }
        });

        resolve(movieList);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });

  let movieList = await fetchPromise;
  return movieList.sort((a, z) => a.Movie > z.Movie);
};

const getAirtableMovieRecord = async (id) => {
  const fetchPromise = new Promise((resolve, reject) => {
    base("Movies").find(id, (err, record) => {
      if (err) {
        console.error(err);
        reject(err);
      }

      if (isMovieValid(record)) {
        let movie = formatMovie(record);
        resolve(movie);
      } else {
        reject(`Movie not valid: ${record.id} ${record.fields.Movie}`);
      }
    });
  });

  let movie = await fetchPromise;

  return movie;
};

// Use remark to convert the markdown into HTML string
const parseMarkdown = async (md) => {
  const processContent = await remark().use(html).process(md);
  return processContent.toString();
};

// PUBLIC FUNCTIONS
export const fetchMovieList = async () => {
  try {
    // console.log("fetchMovieList()");
    let movies = await getAirtableMovieRecords();
    // console.log("return movies", movies[0]);
    return movies;
  } catch (error) {
    console.log("Error in fetchMovieList()", error);
  }
};

export const getMoviePaths = async () => {
  try {
    let movies = await getAirtableMovieRecords();
    return movies.map((movie) => {
      return {
        params: {
          slug: movie.SlugArr,
        },
      };
    });
  } catch (error) {
    console.log("Error in getMoviePaths()", error);
  }
};

export const getMovieRecord = async (id) => {
  let movie = await getAirtableMovieRecord(id);
  movie.RulesHtml = await parseMarkdown(movie.Rules);
  return movie;
};
