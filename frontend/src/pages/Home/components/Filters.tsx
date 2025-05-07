import { Button, Flex } from "@chakra-ui/react";

interface FiltersProps {
activeFilter: string;
setActiveFilter: (filter: string) => void;
}

const Filters: React.FC<FiltersProps> = ({ activeFilter, setActiveFilter }) => {
const filters = ["ALL", "POPULAR"];

return (
  <Flex w="100%" maxW="container.md" justifyContent="space-evenly">
    {filters.map((filter) => (
      <Button
        key={filter}
        bg={activeFilter === filter ? "#FF6B00" : "#fff"}
        color={activeFilter === filter ? "#fff" : "#000"}
        fontWeight="600"
        fontSize="20px"
        borderRadius="full"
        _hover={{ opacity: 0.8 }}
        px={{ base: "5", sm: "10" }}
        py={4}
        border="2px solid"
        borderColor={activeFilter === filter ? "#FF6B00" : "#000"}
        onClick={() => setActiveFilter(filter)}
      >
        {filter}
      </Button>
    ))}
  </Flex>
);
};

export default Filters;