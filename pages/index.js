// Next Modules
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

// Components
import { Flex, Text } from "@chakra-ui/react";
import Layout from "../components/Layout/Layout";
import MovieList from "../components/MovieList/MovieList";

// Functions
import { fetchMovieList } from "../lib/movies";
import { getListLinks } from "../lib/listicles";
import { updateDatabase } from "../lib/build";

// Static Prop Generation
export async function getStaticProps() {
  await updateDatabase(); // Update Airtable records on build

  const movies = await fetchMovieList();
  const lists = await getListLinks();

  return {
    props: {
      movies,
      lists,
    },
  };
}

export default function Home({ movies, lists }) {
  // console.log(movies[0]);
  return (
    <Layout>
      <Head>
        <title>ReelBuzzed - Movie Drinking Games</title>
        <meta name='description' content='ReelBuzzed | Movie Drinking Games' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

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
