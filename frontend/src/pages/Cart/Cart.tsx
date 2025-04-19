import { Box, Center, Flex, Heading, Stack } from "@chakra-ui/react"
import BackButton from "../../components/BackButton"
import CardCart from "./components/CardCart"

import image from '../../assets/images/margherita.png'

const Cart = () => {
  return (
    <Stack minH="100vh">
      <Flex 
        direction="row" 
        alignItems="center"
        position="relative" 
        width="100%"
        p="30px"
      >
        {/* Botão alinhado à esquerda */}
        <Box position="absolute" left={0}>
          <BackButton url='/' />
        </Box>

        <Heading 
          fontSize="30px" 
          fontWeight="600"
          textAlign="center"
          width="100%"  
        >
          Cart
        </Heading>
      </Flex>
      <Center px={{base: "10px", md: "0"}} >
        <Stack 
          maxW="container.md"
          w="100%"
          justifyContent="center"
          alignItems="center"
          gap={5}
          
        >
          <CardCart 
          id="Margherita" name="Margherita" price={19.99} initAmmount={3}
          size="Medium"
          image={image}
          ></CardCart>

          <CardCart 
          id="Margherita" name="Margherita" price={19.99} initAmmount={1}
          size="Medium"
          image={image}
          >
            
          </CardCart>
        </Stack>
      </Center>
      
    </Stack>
  )
}

export default Cart