import { Box, Flex, Heading, Text, Link, Avatar, Grid } from "@chakra-ui/react";

import dynamic from "next/dynamic";

import {
  CaretRight,
  DiscordLogo,
  FileArrowDown,
  Lightning,
  ImageSquare,
} from "phosphor-react";
import { ButtonLink } from "../layout/ButtonLink";

import "@vime/core/themes/default.css";
import { useGetLessonQueryBySlugQuery } from "@/graphql/generated";

const Player = dynamic(() => import("../layout/Player"), {
  ssr: false,
});

interface VideoProps {
  lessonSlug: string;
}

interface GetLessonBySlugResponse {
  lesson: {
    title: string;
    videoId: string;
    description: string;

    teacher: {
      avatarURL: string;
      bio: string;
      name: string;
    };
  };
}

export function Video({ lessonSlug }: VideoProps) {
  const { data, loading } = useGetLessonQueryBySlugQuery({
    variables: {
      slug: lessonSlug,
    },
  });

  if (loading) return <Box flex="1">Carregando...</Box>;

  if (!data) return <Box flex="1">Sem dados</Box>;

  if (!data.lesson) return <Box flex="1">Sem aulas</Box>;

  return (
    <Box flex="1">
      <Box bg="black" display="flex" justifyContent="center">
        <Player videoId={data.lesson.videoId} />
      </Box>

      <Box p={8} maxW="1100px" mx="auto" w="100%">
        <Flex align="start" gap={16}>
          <Box flex="1">
            <Heading fontSize="2xl" fontWeight="bold">
              {data.lesson.title}
            </Heading>

            <Text as="p" mt={4} color="gray.200" lineHeight="1.625">
              {data.lesson.description}
            </Text>

            {data.lesson.teacher && (
              <Flex gap={4} mt={4}>
                <Avatar
                  src={data.lesson?.teacher.avatarURL}
                  name={data.lesson.teacher.name}
                  h="64px"
                  w="64px"
                  borderWidth="2px"
                  borderColor="blue.500"
                />

                <Box>
                  <Text
                    as="strong"
                    fontSize="2xl"
                    fontWeight="bold"
                    display="block"
                  >
                    {data.lesson.teacher.name}
                  </Text>
                  <Text
                    as="span"
                    color="gray.200"
                    fontSize="sm"
                    display="block"
                  >
                    {data?.lesson.teacher.bio}
                  </Text>
                </Box>
              </Flex>
            )}
          </Box>

          <Box display="flex" flexDirection="column" gap={4}>
            <ButtonLink variant="filled" isExternal href="#">
              <DiscordLogo size={24} />
              Comunidade do Discord
            </ButtonLink>

            <ButtonLink variant="outlined">
              <Lightning size={24} />
              Acesse o desafio
            </ButtonLink>
          </Box>
        </Flex>

        <Grid gap={8} mt={20} templateColumns="repeat(2, minmax(0, 1fr))">
          <Link
            bg="gray.700"
            borderRadius="4px"
            overflow="hidden"
            display="flex"
            alignItems="stretch"
            gap={6}
            _hover={{
              bg: "gray.600",
            }}
          >
            <Box
              bg="green.700"
              h="100%"
              p={6}
              display="flex"
              alignItems="center"
            >
              <FileArrowDown size={40} />
            </Box>

            <Box py={6}>
              <Text as="strong" fontSize="2xl" fontWeight="bold">
                Material complementar
              </Text>
              <Text fontSize="sm" color="gray.200" mt={2}>
                Acesse o material complementar para acelerar seu desenvolvimento
              </Text>
            </Box>

            <Box h="100%" p={6} display="flex" alignItems="center">
              <CaretRight size={24} />
            </Box>
          </Link>

          <Link
            bg="gray.700"
            borderRadius="4px"
            overflow="hidden"
            display="flex"
            alignItems="stretch"
            gap={6}
            _hover={{
              bg: "gray.600",
            }}
          >
            <Box
              bg="green.700"
              h="100%"
              p={6}
              display="flex"
              alignItems="center"
            >
              <ImageSquare size={40} />
            </Box>

            <Box py={6}>
              <Text as="strong" fontSize="2xl" fontWeight="bold">
                Wallpapers exclusivos{" "}
              </Text>
              <Text fontSize="sm" color="gray.200" mt={2}>
                Baixe wallpapers exclusivos do Ignite Lab e personalize a sua
                máquina
              </Text>
            </Box>

            <Box h="100%" p={6} display="flex" alignItems="center">
              <CaretRight size={24} />
            </Box>
          </Link>
        </Grid>
      </Box>
    </Box>
  );
}
