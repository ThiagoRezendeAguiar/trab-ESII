import { Button, Flex } from '@chakra-ui/react'

const Filters = () => {
  return (
    <Flex w="100%" maxW="container.md" justifyContent="space-evenly" >
    <Button
      bg="none"
      color="#000"
      fontWeight="600"
      fontSize="20px"
      borderRadius="full"
      _hover={{ opacity: 0.8 }}
      px={{base: "5", sm: "10"}}
      py={4}
      border="2px solid #000"
    >
      ALL
    </Button>
    <Button
      bg="none"
      color="#000"
      fontWeight="600"
      fontSize="20px"
      borderRadius="full"
      _hover={{ opacity: 0.8 }}
      px={{base: "5", sm: "10"}}
      py={4}
      border="2px solid #000"
    >
      POPULAR
    </Button>
    <Button
      bg="none"
      color="#000"
      fontWeight="600"
      fontSize="20px"
      borderRadius="full"
      _hover={{ opacity: 0.8 }}
      px={{base: "5", sm: "10"}}
      py={4}
      border="2px solid #000"
    >
      DRINKS
    </Button>
  </Flex>
  )
}

export default Filters