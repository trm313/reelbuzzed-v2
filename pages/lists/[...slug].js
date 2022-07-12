import Head from "next/head";
import { Flex, Text } from "@chakra-ui/react";

import { getListPaths, getListRecord, getListLinks } from "../../lib/listicles";

import Layout from "../../components/Layout/Layout";
import ListiclePage from "../../components/ListiclePage/ListiclePage";

export async function getStaticPaths() {
  const paths = await getListPaths();

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const lists = await getListLinks();
  const list = await getListRecord(params.slug[0].toLowerCase());
  return {
    props: {
      list,
      lists,
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
