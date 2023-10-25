import Airtable from "airtable";
import { fetchMovieList } from "./movies";

// INIT DATA SOURCES
Airtable.configure({ apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN });
const base = new Airtable().base(process.env.AIRTABLE_BASE_ID);
// const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
//   process.env.AIRTABLE_BASE_ID
// );

// Refactoring
// const moviesTable = base("Movies");
// const listsTable = base("Listicles");

async function fetchAirtableData() {
  try {
    const lists = await listsTable.select({ view: "Published" }).all();
    const movies = await moviesTable.select().all();

    return {
      lists: lists.map((record) => record.fields),
      movies: movies.map((record) => record.fields),
    };
  } catch (error) {
    console.error("Failed: fetchAirtableData()", error);
  }
}

// PRIVATE FUNCTIONS
const isListValid = (record) => {
  let { id, fields } = record;
  if (!id || !fields.Slug) {
    return false;
  }
  return true;
};

const formatList = (record) => {
  return {
    id: record.id,
    SlugArr: [record.fields.Slug],
    // SlugArr: [record.fields.Slug, record.id],
    ...record.fields,
  };
};

const getAirtableListRecords = async () => {
  const fetchPromise = new Promise((resolve, reject) => {
    base("Listicles")
      .select({
        view: "Published",
        // filterByFormula: "{Published}",
      })
      .all()
      .then((records) => {
        console.log("Fetched " + records.length + " lists");
        let lists = [];
        records.forEach(function (record) {
          lists.push(formatList(record));
        });
        resolve(lists);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });

  let lists = await fetchPromise;
  return lists;
};

const populateMovieRecordsInList = async (ListMovieIds, AllMovies) => {
  const fetchPromise = new Promise((resolve, reject) => {
    let populatedList = ListMovieIds.map((id) => {
      let movie = AllMovies.find((m) => m.id === id);
      return movie;
    });

    resolve(populatedList);
  });

  let populatedList = await fetchPromise;
  return populatedList;
};

// PUBLIC FUNCTIONS
export const getListPaths = async () => {
  try {
    let lists = await getAirtableListRecords();
    return lists.map((list) => {
      return {
        params: {
          slug: list.SlugArr,
        },
      };
    });
  } catch (error) {
    console.log("Error in getListiclePaths()", error);
  }
};

export const getListRecord = async (slug) => {
  let lists = await getAirtableListRecords();
  let list = lists.find((l) => l.Slug.toLowerCase() === slug.toLowerCase());

  let movies = await fetchMovieList();
  list.PopulatedMovies = await populateMovieRecordsInList(list.Movies, movies);

  return list;
};

export const getListLinks = async () => {
  let lists = await getAirtableListRecords();
  return lists;
};

export function populateLists(lists, movies) {
  return lists.map((list) => {
    if (!list.Movies) {
      console.error("Missing Movies field:", list);
      return list;
    }

    const populatedMovies = list.Movies.map((movieId) => {
      const movie = movies.find((m) => m.id === movieId);
      if (!movie) {
        console.warn("Movie not found for ID:", movieId);
      }
      const { id, Movie, Slug, Images } = movie;
      return { id, Movie, Slug, Images };
    }).filter(Boolean);

    return {
      ...list,
      Movies: populatedMovies,
    };
  });
}
