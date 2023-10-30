import { remark } from "remark";
import html from "remark-html";

export async function markdownToHtml(md) {
  const processContent = await remark().use(html).process(md);
  return processContent.toString();
}

export function getMovies() {
  const movies = require("../static/movies.json");
  let validMovies = movies.filter(
    (movie) =>
      movie.id && movie.fields.Slug && movie.fields.imdb_id && movie.fields.OMDB
  );
  return validMovies.map((movie) => {
    return {
      id: movie.id,
      SlugArr: movie.fields.Slug.split("/"),
      Details: JSON.parse(movie.fields.OMDB),
      ...movie.fields,
    };
  });
}

export function getLists() {
  const lists = require("../static/lists.json");
  let validLists = lists.filter((list) => list.id && list.fields.Slug);
  return validLists.map((list) => {
    return {
      id: list.id,
      SlugArr: [list.fields.Slug],
      ...list.fields,
    };
  });
}

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

export function getMoviePaths() {
  const movies = getMovies();
  return movies.map((movie) => {
    return {
      params: {
        slug: movie.SlugArr,
      },
    };
  });
}

export async function getMovie(id) {
  const movies = getMovies();
  const movie = movies.find((m) => m.id === id);
  if (movie) {
    movie.RulesHtml = await markdownToHtml(movie.Rules);
    return movie;
  } else {
    console.log("getMovie(id) - Not found: ", id);
  }
}

export function getListPaths() {
  const lists = getLists();
  return lists.map((list) => {
    return {
      params: {
        slug: list.SlugArr,
      },
    };
  });
}

export function getList(slug) {
  const lists = getLists();
  const list = lists.find(
    (list) => list.Slug.toLowerCase() === slug.toLowerCase()
  );
  return list;
}
