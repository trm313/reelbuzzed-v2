import Head from "next/head";
import { Flex, Text } from "@chakra-ui/react";

import Layout from "../../components/Layout/Layout";
import MoviePage from "../../components/MoviePage/MoviePage";
import CollectionList from "../../components/Listicles/CollectionList";
import ShareBtns from "../../components/ShareBtns";

import {
  getMovies,
  getLists,
  populateLists,
  getMoviePaths,
  getMovie,
} from "../../lib/data";

export async function getStaticPaths() {
  const paths = await getMoviePaths();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const movie = await getMovie(params.slug[2]);
  const movies = getMovies();
  const lists = getLists();
  const listsPopulated = populateLists(lists, movies);

  return {
    props: {
      movie,
      lists: listsPopulated,
    },
  };
}

export default function Movie({ movie, lists }) {
  // console.log(movie);
  return (
    <Layout>
      <Head>
        <title>{`${movie.Movie} (${movie.Year}) Drinking Game`}</title>
      </Head>

      <MoviePage movie={movie} lists={lists} />
      <Flex my={16} justifyContent='center'>
        <ShareBtns
          shareText={`${movie.Movie} Drinking Game`}
          shareUrl={`https://reelbuzzed.com/movies/${movie.Slug}`}
        />
      </Flex>
      <CollectionList collections={lists} />
    </Layout>
  );
}
