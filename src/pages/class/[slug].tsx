import { Header, Lesson, Sidebar, Video } from "@/components/shared";
import { ssrQuery } from "@/lib/ssr-query";
import { ApolloError, gql } from "@apollo/client";
import { Box, Flex } from "@chakra-ui/react";
import type { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";

interface Lesson {
  id: string;
  title: string;
}

interface HomeProps {
  lessons: Lesson[];
  error: ApolloError | null;
}

const GET_LESSONS_QUERY = gql`
  query {
    lessons {
      id
      title

      teacher {
        name
        bio
      }
    }
  }
`;

export default function Class({ lessons }: HomeProps) {
  return (
    <Box display="flex" flexDirection="column" minH="100vh">
      <Head>
        <title>Event</title>
      </Head>
      <Header />
      <Flex as="main" flex="1">
        <Video />
        <Sidebar />
      </Flex>
      {/* <Lesson /> */}
    </Box>
  );
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data, error } = await ssrQuery<{ lessons: Lesson[] }>({
    query: GET_LESSONS_QUERY,
  });

  return {
    props: {
      lessons: data.lessons,
      error,
    },
  };
};
