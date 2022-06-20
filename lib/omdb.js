import axios from "axios";

// Fetch OMDB data for movie
/* API: https://www.omdbapi.com/ */
// http://www.omdbapi.com/?apikey=[yourkey]&[i=imdb_id || t=Movie&y=Year]
export const getOMDbDataForMovie = async ({
  imdb_id = null,
  title = null,
  year = null,
}) => {
  let OMDB_URL = `http://www.omdbapi.com/?apikey=${process.env.OMDB_API}&`;
  let params;
  if (imdb_id) {
    params = `i=${imdb_id}`;
  } else {
    params = `t=${title}&y=${year}`;
  }

  let omdbRes = await axios.get(OMDB_URL + params);
  return omdbRes.data;
};

// PUBLIC FUNCTIONS
export const updateDatabase = () => {
  getRecords();
};
