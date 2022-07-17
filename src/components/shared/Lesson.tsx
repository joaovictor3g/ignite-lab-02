import { Box, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { CheckCircle, Lock } from "phosphor-react";
import { isPast, format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { useRouter } from "next/router";

interface LessonProps {
  title: string;
  slug: string;
  availableAt: Date;
  type: "live" | "class";
}

export function Lesson({ title, availableAt, slug, type }: LessonProps) {
  const {
    query: { slug: lessonSlug },
  } = useRouter();

  const lessonActive = lessonSlug?.includes(slug);

  const isLessonAvailable = isPast(availableAt);
  const availableDateFormatted = format(
    availableAt,
    "EEEE' • 'd' de 'MMMM' • 'k'h'mm",
    {
      locale: ptBR,
    }
  );

  return (
    <NextLink href={slug} passHref>
      <Link>
        <Text as="span" color="gray.300">
          {availableDateFormatted}
        </Text>

        <Box
          borderRadius="4px"
          borderWidth="1px"
          borderStyle="solid"
          borderColor="gray.500"
          p={4}
          mt={2}
          bg={lessonActive ? "green.500" : "transparent"}
        >
          <Box
            as="header"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            {isLessonAvailable ? (
              <Text
                as="span"
                fontSize="sm"
                color={lessonActive ? "white" : "blue.500"}
                fontWeight="medium"
                display="flex"
                alignItems="center"
                gap={2}
              >
                <CheckCircle size={20} />
                Conteúdo liberado
              </Text>
            ) : (
              <Text
                as="span"
                fontSize="sm"
                color={lessonActive ? "white" : "orange.500"}
                fontWeight="medium"
                display="flex"
                alignItems="center"
                gap={2}
              >
                <Lock size={20} />
                Em breve
              </Text>
            )}
            <Text
              as="span"
              fontSize="xs"
              borderRadius="4px"
              px={2}
              py="2px"
              color="white"
              borderWidth="1px"
              borderColor="green.300"
            >
              {type === "live" ? "AO VIVO" : "AULA PRÁTICA"}
            </Text>
          </Box>

          <Text as="strong" color="gray.200" mt="5" display="block">
            {title}
          </Text>
        </Box>
      </Link>
    </NextLink>
  );
}
