import {
  Button,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  } from "@chakra-ui/react";
  import { FiSearch } from "react-icons/fi";
  
  interface SearchbarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleSearch: () => void;
  }
  
  const Searchbar: React.FC<SearchbarProps> = ({ searchTerm, setSearchTerm, handleSearch }) => {
  return (
    <InputGroup maxW="550px">
      <InputLeftElement pointerEvents="none">
        <Icon as={FiSearch} color="gray.400" />
      </InputLeftElement>
  
      <Input
        placeholder="Find your favorite pizza and drink..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        borderRadius="full"
        borderColor="gray.200"
        _focus={{ borderColor: "orange.400" }}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
      />
  
      <Button
        ml={2}
        colorScheme="orange"
        borderRadius="full"
        onClick={handleSearch}
      >
        Buscar
      </Button>
    </InputGroup>
  );
  };
  
  export default Searchbar;