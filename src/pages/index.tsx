import { ApolloError } from "@apollo/client";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Input,
  Text,
  useToast,
  UseToastOptions,
} from "@chakra-ui/react";
import Head from "next/head";
import { FormEvent, useState } from "react";
import Router from "next/router";
import { useCreateSubscriberMutation } from "@/graphql/generated";

const DEFAULT_TOAST_OPTIONS: UseToastOptions = {
  title: "Erro ao se inscrever no evento",
  status: "error",
  isClosable: true,
  position: "top-right",
  description: "Erro ao se inscrever, tente novamente!",
};

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const toast = useToast();

  const [createSubscriber, { loading }] = useCreateSubscriberMutation();

  async function handleSubscribe(event: FormEvent) {
    event.preventDefault();

    try {
      await createSubscriber({ variables: { name, email } });

      Router.push("/class");
    } catch (error) {
      if (error instanceof ApolloError) {
        toast({
          ...DEFAULT_TOAST_OPTIONS,
          description: error.message,
        });
      } else {
        toast(DEFAULT_TOAST_OPTIONS);
      }
    }
  }

  return (
    <Box>
      <Head>
        <title>Home</title>
      </Head>

      <Flex
        w="100%"
        minH="100vh"
        bgImg="/assets/background-blur.png"
        bgRepeat="no-repeat"
        bgSize="cover"
        flexDirection="column"
        align="center"
      >
        <Box
          w="100%"
          maxW="1100px"
          display="flex"
          justifyContent="space-between"
          mt="20"
          mx="auto"
          px={4}
        >
          <Box maxW="640px" w="100%">
            <Image src="/logo.svg" alt="Ignite Lab logo" />

            <Heading mt={8} fontSize="2.5rem">
              Construa uma{" "}
              <Text as="strong" color="blue.500">
                aplicação completa
              </Text>
              , do zero, com{" "}
              <Text as="strong" color="blue.500">
                React
              </Text>
            </Heading>

            <Text as="p" mt={4} color="gray.200">
              Em apenas uma semana você vai dominar na prática uma das
              tecnologias mais utilizadas e com alta demanda para acessar as
              melhores oportunidades do mercado.
            </Text>
          </Box>

          <Box
            p={8}
            bg="gray.700"
            borderWidth="1px"
            borderColor="gray.500"
            borderRadius="4px"
          >
            <Text as="strong" fontSize="2xl" mb="6" display="block">
              Inscreva-se gratuitamente
            </Text>

            <Flex
              as="form"
              onSubmit={handleSubscribe}
              flexDirection="column"
              gap={2}
              w="100%"
            >
              <Input
                bg="gray.500"
                borderRadius="4px"
                px="5"
                h={14}
                type="text"
                placeholder="Seu nome completo"
                value={name}
                onChange={({ target }) => setName(target.value)}
              />
              <Input
                bg="gray.500"
                borderRadius="4px"
                px="5"
                h={14}
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={({ target }) => setEmail(target.value)}
              />

              <Button
                type="submit"
                mt="4"
                bg="green.500"
                textTransform="uppercase"
                borderRadius="4px"
                fontWeight="bold"
                fontSize="sm"
                transition="background 0.2s"
                isLoading={loading}
                h={14}
                _hover={{
                  bg: "green.700",
                }}
              >
                Garantir minha vaga
              </Button>
            </Flex>
          </Box>
        </Box>

        <Image src="/assets/code-mockup.png" alt="Vscode" mt="10" />
      </Flex>
    </Box>
  );
}
