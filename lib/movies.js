import Airtable from "airtable";
import { remark } from "remark";
import html from "remark-html";
import { getOMDbDataForMovie } from "./omdb";

// INIT DATA SOURCES
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

// PRIVATE FUNCTIONS

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
        filterByFormula: "{Published}",
      })
      .all()
      .then((records) => {
        // console.log("Fetched " + records.length + " movies");
        records.forEach(function (record) {
          movieList.push(formatMovie(record));
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

      let movie = formatMovie(record);
      resolve(movie);
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
