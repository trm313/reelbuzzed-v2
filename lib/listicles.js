import Airtable from "airtable";
import { fetchMovieList } from "./movies";

// INIT DATA SOURCES
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

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
