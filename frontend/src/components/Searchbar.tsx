import { Button, Icon, Input, InputGroup, InputLeftElement } from "@chakra-ui/react"
import { useState } from "react";
import { FiSearch } from "react-icons/fi"


const Searchbar = () => {

    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleSearch = () => {
      console.log('Buscar:', searchTerm); // Lógica de busca aqui
    };

  return (
    <InputGroup maxW="550px">
      <InputLeftElement pointerEvents="none">
        <Icon as={FiSearch} color="gray.400" />
      </InputLeftElement>
      
      <Input
        placeholder="Find you favorite pizza and drink..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        borderRadius="full"
        borderColor="gray.200"
        _focus={{ borderColor: 'orange.400' }}
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
  )
}

export default Searchbar