import { Link, LinkProps } from "@chakra-ui/react";

type Variant = "filled" | "outlined";

interface ButtonLinkProps extends LinkProps {
  variant: Variant;
}

const components: Record<Variant, (props: LinkProps) => JSX.Element> = {
  filled: (props) => (
    <Link
      {...props}
      bg="green.500"
      _hover={{
        background: "green.700",
      }}
    />
  ),
  outlined: (props) => (
    <Link
      {...props}
      bg="transparent"
      borderWidth="1px"
      borderColor="blue.500"
      color="blue.500"
      transition="background 0.5s"
      _hover={{
        bg: "blue.500",
        color: "black",
      }}
    />
  ),
};

export function ButtonLink({ variant, ...rest }: ButtonLinkProps) {
  const Component = components[variant];

  return (
    <Component
      p={4}
      fontSize="sm"
      display="flex"
      alignItems="center"
      borderRadius="4px"
      fontWeight="bold"
      textTransform="uppercase"
      gap={2}
      justifyContent="center"
      {...rest}
    />
  );
}
