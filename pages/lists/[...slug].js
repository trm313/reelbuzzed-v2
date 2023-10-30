import Head from "next/head";

import Layout from "../../components/Layout/Layout";
import ListiclePage from "../../components/ListiclePage/ListiclePage";

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
  // const list = getList(params.slug[0].toLowerCase());
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
  // console.log(list);
  return (
    <Layout>
      <Head>
        <title>{`${list.Name} Drinking Games`}</title>
      </Head>
      <ListiclePage list={list} lists={lists} />
    </Layout>
  );
}
