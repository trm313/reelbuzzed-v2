import Head from "next/head";
import { Flex, Text } from "@chakra-ui/react";

import { getMoviePaths, getMovieRecord } from "../../lib/movies";
import { getListLinks } from "../../lib/listicles";

import Layout from "../../components/Layout/Layout";
import MoviePage from "../../components/MoviePage/MoviePage";

export async function getStaticPaths() {
  const paths = await getMoviePaths();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const movie = await getMovieRecord(params.slug[2]);
  const lists = await getListLinks();
  return {
    props: {
      movie,
      lists,
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
    </Layout>
  );
}
