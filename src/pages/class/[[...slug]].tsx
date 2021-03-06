import { Header, Sidebar, Video } from "@/components/shared";
import { Box, Flex } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Class() {
  const {
    query: { slug },
  } = useRouter();

  const lessonSlug = slug?.[0];

  return (
    <Box display="flex" flexDirection="column" minH="100vh">
      <Head>
        <title>Event</title>
      </Head>
      <Header />
      <Flex as="main" flex="1">
        {!!lessonSlug ? <Video lessonSlug={lessonSlug} /> : <Box flex="1" />}
        <Sidebar />
      </Flex>
    </Box>
  );
}
