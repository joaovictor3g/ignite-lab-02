import { useGetLessonsQuery } from "@/graphql/generated";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Lesson } from "./Lesson";

export function Sidebar() {
  const { data } = useGetLessonsQuery();

  return (
    <Box
      as="aside"
      maxW="348px"
      w="100%"
      bg="gray.700"
      p={6}
      borderLeftWidth="1px"
      borderColor="gray.600"
    >
      <Text
        as="span"
        fontWeight="bold"
        fontSize="2xl"
        pb={6}
        mb={6}
        borderBottomWidth="1px"
        borderColor="gray.500"
        display="block"
      >
        Cronograma de aulas
      </Text>

      <Flex flexDirection="column" gap={8}>
        {data?.lessons.map((lesson) => (
          <Lesson
            key={lesson.id}
            title={lesson.title}
            slug={lesson.slug}
            availableAt={new Date(lesson.availableAt)}
            type={lesson.lessonType}
          />
        ))}
      </Flex>
    </Box>
  );
}
