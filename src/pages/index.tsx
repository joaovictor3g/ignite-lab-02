import { ssrQuery } from "@/lib/ssr-query";
import { ApolloError, gql } from "@apollo/client";
import { ListItem, Text, UnorderedList, VStack } from "@chakra-ui/react";
import type { GetStaticProps, NextPage } from "next";

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

export default function Home({ lessons }: HomeProps) {
  return (
    <VStack h="100vh" justify="center">
      <UnorderedList>
        {lessons?.map((lesson) => (
          <ListItem key={lesson.id} color="white">
            {lesson.title}
          </ListItem>
        ))}
      </UnorderedList>
    </VStack>
  );
}

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
