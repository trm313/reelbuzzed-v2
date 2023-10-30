// Next Modules
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

// Components
import { Flex, Text } from "@chakra-ui/react";
import Layout from "../components/Layout/Layout";
import MovieList from "../components/MovieList/MovieList";
import CollectionList from "../components/Listicles/CollectionList";

import { getMovies, getLists, populateLists } from "../lib/data";

export async function getStaticProps() {
  const movies = getMovies();
  const lists = getLists();
  const listsPopulated = populateLists(lists, movies);

  return {
    props: {
      movies,
      lists: listsPopulated,
    },
  };
}

export default function Home({ movies, lists }) {
  return (
    <Layout>
      <Head>
        <title>ReelBuzzed - Movie Drinking Games</title>
        <meta name='description' content='ReelBuzzed | Movie Drinking Games' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      {lists && <CollectionList collections={lists} />}

      {!movies ? (
        <Flex>
          <Text>Loading Movies...</Text>
        </Flex>
      ) : (
        <MovieList movies={movies} lists={lists} />
      )}
    </Layout>
  );
}
