import { Center, Flex, Heading, Stack } from '@chakra-ui/react'
import React from 'react'
import FormControl from '../../components/FormControl'
import { FaCreditCard } from 'react-icons/fa'
import ConfirmButton from '../../components/ConfirmButton'

const Payment = () => {

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
          Payment
        </Heading>
        <Stack as="form" onSubmit={handleSubmit} maxW="container.md" w="100%" px={{base: '10px', md: 'none'}} gap={5}>

          <FormControl id="fullName" placeholder="Full name" icon={<FaCreditCard size= '20px' color="orange" />} />

          <Flex gap={2} pl="36px">
            <FormControl id="expiration date" placeholder="Expiration date" />
            <FormControl id="cv code" placeholder="CV code" />
          </Flex>

          <Flex gap="5" justifyContent="center" mt={20}>
            <ConfirmButton text="Back to profile info" redirect='/profile' whiteMode={true} type="button"/>
            <ConfirmButton text="Finish" redirect='/'  type="submit"/>
          </Flex>
        </Stack>
        
      </Center>

      
    </Stack>
  )
}

export default Payment