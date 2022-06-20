import Airtable from "airtable";
import axios from "axios";

import { getOMDbDataForMovie } from "./omdb";

// INIT DATA SOURCES
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

// BUILD STEPS
const getRecords = () => {
  base("Movies")
    .select({
      view: "Published",
      filterByFormula: "{Published}",
      // maxRecords: 4,
    })
    .eachPage(
      function page(records, fetchNextPage) {
        records.forEach(function (record) {
          updateRecord(record);
        });

        fetchNextPage();
      },
      function done(err) {
        if (err) {
          console.error(err);
          return;
        }
      }
    );
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
    console.log(`Updating: ${id} ${title}`);
    base("Movies").update([updatedRecord]);
  }
};

function slugify(string) {
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
}

export const updateDatabase = () => {
  /**
   * 1. Page through Airtable records
   * 2. Fetch data from OMDB
   * 3. Sync missing data to Airtable record (imdb_id, stringified OMDB object, slug)
   */
  getRecords();
};
