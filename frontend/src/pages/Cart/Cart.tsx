import { Box, Center, Flex, Heading, Stack, Text } from "@chakra-ui/react"
import BackButton from "../../components/BackButton"
import CardCart from "./components/CardCart"

import image from '../../assets/images/margherita.png'
import ConfirmButton from "../../components/ConfirmButton"

const Cart = () => {

  return (
    <Stack minH="100vh" >
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
          fontWeight="700"
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

     <Center p="20px 0 50px 0">
      <Stack maxW="container.md" w={{base: "90%", md: "100%" }} gap={5}>
          <Flex w="100%" justifyContent="space-between">
            <Text fontWeight="700" fontSize='xl'> Total </Text>
            <Text fontWeight="500" fontSize='xl'> $ XXX </Text> { /* Get All Cards e calcula o preço total */ }
          </Flex>

          <Center>
            <ConfirmButton text="Place Order" redirect='/profile' />
          </Center>
        </Stack>
     </Center>
      
    </Stack>
  )
}

export default Cart