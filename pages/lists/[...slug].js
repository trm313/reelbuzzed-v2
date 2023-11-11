import Head from "next/head";
import { Flex, Text } from "@chakra-ui/react";

import Layout from "../../components/Layout/Layout";
import ListiclePage from "../../components/ListiclePage/ListiclePage";
import CollectionList from "../../components/Listicles/CollectionList";
import ShareBtns from "../../components/ShareBtns";

import {
  getLists,
  getList,
  populateLists,
  getListPaths,
  getMovies,
} from "../../lib/data";

export async function getStaticPaths() {
  const paths = getListPaths();

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const lists = getLists();
  const movies = getMovies();
  const listsPopulated = populateLists(lists, movies);
  const list = listsPopulated.find(
    (list) => list.Slug.toLowerCase() === params.slug[0].toLowerCase()
  );
  return {
    props: {
      list,
      lists: listsPopulated,
    },
  };
}

export default function List({ list, lists }) {
  return (
    <Layout>
      <Head>
        <title>{`${list.Name} Drinking Games`}</title>
      </Head>
      <ListiclePage list={list} lists={lists} />
      <Flex my={16} justifyContent='center'>
        <ShareBtns
          shareText={`${list.Name} Drinking Games`}
          shareUrl={`https://reelbuzzed.com/lists/${list.Slug}`}
        />
      </Flex>
      <CollectionList collections={lists} />
    </Layout>
  );
}
