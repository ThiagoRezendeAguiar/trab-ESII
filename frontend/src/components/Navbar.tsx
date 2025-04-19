import { Button, Flex, Image, Stack, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import logo from '../assets/images/pizza-logo.png';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav>
      <Stack bg="#FFFFFF" boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)" px={{base: "auto", sm: "50px" }}  justifyContent="center" alignItems="center">
        <Flex justifyContent="space-between" maxW="container.xl" alignContent={"center"} w="100%" >
          <Flex alignItems="center" justifyContent="space-evenly" >
            <Image src={logo} maxW="100"/>
            <Text
              fontSize="36px"
              fontWeight="700"
              color="secondary"
              
            >
              PizzaApp
            </Text>
          </Flex>
          
          <Flex alignItems="center">
            
            <Button 
              onClick={() => navigate('/cart')}
                bg="none"
                _hover={{opacity: 0.8}}
            >
              <FaShoppingCart size="27" color="orange"/>
            </Button>
          </Flex>
        </Flex>
      </Stack>  
    </nav>
  );
};

export default Navbar;