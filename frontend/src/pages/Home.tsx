import { Button, Flex, Stack, Text } from '@chakra-ui/react'
import Navbar from '../components/Navbar'
import Searchbar from '../components/Searchbar'

const Home = () => {
  return (
    <Stack direction="column"  height="100vh" w="100%" bg="#F1F1F1">
      <Navbar />
      <Stack justifyContent="center" alignItems="center" my={10}>
        <Searchbar />
        <Flex w="100%" maxW="container.md" justifyContent="space-evenly" pt="20px">
          <Button
            bg="none"
            color="secondary"
            fontWeight="600"
            fontSize="20px"
            borderRadius="full"
            _hover={{ opacity: 0.8 }}
            px={{base: "5", sm: "10"}}
            py={4}
            border="2px solid"
          >
            ALL
          </Button>
          <Button
             bg="none"
             color="secondary"
             fontWeight="600"
             fontSize="20px"
             borderRadius="full"
             _hover={{ opacity: 0.8 }}
             px={{base: "5", sm: "10"}}
             py={4}
             border="2px solid"
          >
            POPULAR
          </Button>
          <Button
             bg="none"
             color="secondary"
             fontWeight="600"
             fontSize="20px"
             borderRadius="full"
             _hover={{ opacity: 0.8 }}
             px={{base: "5", sm: "10"}}
             py={4}
             border="2px solid"
          >
            DRINKS
          </Button>
        </Flex>
      </Stack>
      
    </Stack>
  )
}

export default Home