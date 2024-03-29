import Airtable from "airtable";
import axios from "axios";

import { getOMDbDataForMovie } from "./omdb";

// INIT DATA SOURCES
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

const CACHE = {};

// BUILD STEPS
function getAndUpdateRecords() {
  return new Promise((resolve, reject) => {
    let movies = [];
    base("Movies")
      .select({
        view: "Published",
        filterByFormula: "NOT({Error})",
      })
      .all()
      .then((records) => {
        records.forEach(async function (record) {
          await updateRecord(record);
          movies.push(record);
        });
        resolve(movies);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}

const updateAirtableRecord = (newRecord) => {
  return new Promise((resolve, reject) => {
    base("Movies").update([newRecord], function (err, records) {
      if (err) reject(err);
      resolve(records);
    });
  });
};

const updateRecord = async (record) => {
  let id = record.id;
  let title = record.get("Movie");
  let year = record.get("Year");
  let imdb_id = record.get("imdb_id");
  let images = record.get("Images");
  let slug = record.get("Slug");
  let omdb = record.get("OMDB");

  let omdbData = await getOMDbDataForMovie({
    imdb_id,
    title,
    year,
  });

  if (omdbData.Response === "False") {
    console.log("Failed to match to OMDB data:", omdbData.Error, id, title);
    let errorRecord = {
      id,
      fields: {
        Error: true,
      },
    };
    await updateAirtableRecord(errorRecord);
  } else {
    let fields = {};
    let fieldUpdateCount = 0;

    if (!imdb_id) {
      fields.imdb_id = omdbData.imdbID;
      fieldUpdateCount++;
    }

    if (!images || images.length === 0) {
      fields.Images = [
        {
          url: omdbData.Poster,
        },
      ];
      fieldUpdateCount++;
    }

    if (!slug) {
      fields.Slug = [
        slugify(record.fields.Movie),
        slugify(record.fields.Year),
        record.id,
      ].join("/");
      fieldUpdateCount++;
    }

    if (!omdb) {
      fields.OMDB = JSON.stringify(omdbData);
      fieldUpdateCount++;
    }

    let updatedRecord = {
      id,
      fields,
    };

    // Only update when needed
    if (fieldUpdateCount > 0) {
      try {
        await updateAirtableRecord(updatedRecord);
        console.log(`Updated: ${id} ${title}`);
      } catch (error) {
        console.log(`Failed to update: ${id} ${title}`);
        return;
      }
    }
  }
};

function slugify(string) {
  try {
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

export const updateDatabase = async () => {
  /**
   * 1. Page through Airtable records
   * 2. Fetch data from OMDB
   * 3. Sync missing data to Airtable record (imdb_id, stringified OMDB object, slug)
   */
  // let movies = await getAndUpdateRecords();
  let movies = await getAndUpdateRecords();
  if (!movies) {
    console.log("updateDatabase movies undefined");
    // TODO: Currently here
  } else {
    console.log("updateDatabase movies defined", movies.length);
  }
};

export function setCache(key, data) {
  CACHE[key] = data;
  console.log("Updated Cache: " + key);
}

export function getCache(key) {
  return CACHE[key];
}
