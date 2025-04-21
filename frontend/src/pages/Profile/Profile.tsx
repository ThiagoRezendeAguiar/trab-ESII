import { Center, Flex, Heading, Stack } from "@chakra-ui/react"
import ConfirmButton from "../../components/ConfirmButton"
import { FaEnvelope, FaMap, FaPhoneAlt, FaUser } from "react-icons/fa"
import FormControl from "../../components/FormControl";


const Profile = () => {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
  };

  return (
    <Stack w="100%" justifyContent="space-between" minH="100vh"  px={{base: '10px', md: 'none'}} py="30px">
      
      <Center flexDir="column" gap={70}>
        <Heading 
          fontSize="30px" 
          fontWeight="700"
          textAlign="center"
          width="100%"  
        >
          Profile
        </Heading>
        <Stack as="form" onSubmit={handleSubmit} maxW="container.md" w="100%" px={{base: '10px', md: 'none'}} gap={5}>
          <FormControl id="fullName" placeholder="Full name" icon={<FaUser size= '20px' color="orange" />} />

          <FormControl id="phone" placeholder="Phone number" type="tel" icon={<FaPhoneAlt size="20px" color="orange" />} />

          <FormControl id="email" placeholder="E-mail" type="email" icon={<FaEnvelope size="20px" color="orange"/>} />

          <FormControl id="address" placeholder="Address" icon={<FaMap size="20px" color="orange"/>} />

          <Flex gap={2} pl="36px">
            <FormControl id="city" placeholder="City" />
            <FormControl id="state" placeholder="State" />
            <FormControl id="zip code" placeholder="ZIP code" />
          </Flex>

          <Flex gap="5" justifyContent="center" mt={20}>
            <ConfirmButton text="Back to cart" redirect='/cart' whiteMode={true} type="button"/>
            <ConfirmButton text="Proceed" redirect='/payment'  type="submit"/>
          </Flex>
        </Stack>
       
      </Center>

     
    </Stack>
  )
}

export default Profile