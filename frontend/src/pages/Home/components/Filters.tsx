import { Button, Flex } from "@chakra-ui/react";

const Filters = () => {
  const text = ["ALL", "POPULAR", "DRINKS"];

  return (
    <Flex w="100%" maxW="container.md" justifyContent="space-evenly">
      {text.map((item) => (
        <Button
          key={item} // Important: Add a unique key for each item
          bg="#fff"
          color="#000"
          fontWeight="600"
          fontSize="20px"
          borderRadius="full"
          _hover={{ opacity: 0.8 }}
          px={{ base: "5", sm: "10" }}
          py={4}
          border="2px solid #000"
        >
          {item}
        </Button>
      ))}
    </Flex>
  );
};

export default Filters;
