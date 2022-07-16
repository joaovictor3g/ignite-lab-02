import { Flex, Image } from "@chakra-ui/react";

export function Header() {
  return (
    <Flex
      as="header"
      w="100%"
      py={5}
      align="center"
      justify="center"
      bg="gray.700"
      borderBottomWidth="1px"
      borderColor="gray.600"
    >
      <Image src="/logo.svg" alt="Ignite Lab logo" />
    </Flex>
  );
}
