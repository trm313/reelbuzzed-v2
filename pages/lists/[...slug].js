import Head from "next/head";
import { Flex, Text } from "@chakra-ui/react";

// import { getMoviePaths, getMovieRecord } from "../../lib/movies";
import { getListPaths, getListRecord } from "../../lib/listicles";

import Layout from "../../components/Layout/Layout";
// import MoviePage from "../../components/MoviePage/MoviePage";

export async function getStaticPaths() {
  const paths = await getListPaths();

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // const movie = await getMovieRecord(params.slug[2]);
  const list = await getListRecord(params.slug[0].toLowerCase());
  return {
    props: {
      list,
    },
  };
}

export default function Movie({ list }) {
  console.log(list);
  return (
    <Layout>
      <Head>
        <title>{`Top _#_ _NAME_ Drinking Games`}</title>
      </Head>
      {/* <MoviePage movie={movie} /> */}
      <Flex direction='column'>
        <Text>Listicle Page</Text>
      </Flex>
    </Layout>
  );
}
