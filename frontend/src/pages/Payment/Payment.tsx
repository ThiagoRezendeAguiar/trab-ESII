import { Center, Flex, Heading, Stack, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import FormControl from "../../components/FormControl";
import { FaCreditCard } from "react-icons/fa";
import ConfirmButton from "../../components/ConfirmButton";
import { useNavigate } from "react-router-dom";

const Payment = () => {
const toast = useToast();
const navigate = useNavigate();

const [fullName, setFullName] = useState("");
const [expirationDate, setExpirationDate] = useState("");
const [cvCode, setCvCode] = useState("");
const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // Validação básica
  if (!fullName || !expirationDate || !cvCode) {
    toast({
      title: "Missing information",
      description: "Please fill all payment fields",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
    return;
  }
  
  setIsSubmitting(true);
  
  // Simulando processamento de pagamento
  try {
    // Aqui você poderia integrar com um gateway de pagamento real
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Payment successful!",
      description: "Your order has been confirmed",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    
    // Redirecionar para página de rastreamento ou confirmação
    navigate('/delivery-tracking');
    
  } catch (error) {
    toast({
      title: "Payment failed",
      description: "Please try again or use a different payment method",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  } finally {
    setIsSubmitting(false);
  }
};

return (
  <Stack
    w="100%"
    justifyContent="space-between"
    minH="100vh"
    px={{ base: "10px", md: "none" }}
    py="30px"
  >
    <Center flexDir="column" gap={70}>
      <Heading
        fontSize="30px"
        fontWeight="700"
        textAlign="center"
        width="100%"
      >
        Payment
      </Heading>
      <Stack
        as="form"
        onSubmit={handleSubmit}
        maxW="container.md"
        w="100%"
        px={{ base: "10px", md: "none" }}
        gap={5}
      >
        <FormControl
          id="fullName"
          placeholder="Full name"
          icon={<FaCreditCard size="20px" color="orange" />}
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <Flex gap={2} pl="36px">
          <FormControl 
            id="expiration_date" 
            placeholder="Expiration date (MM/YY)"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
          />
          <FormControl 
            id="cv_code" 
            placeholder="CV code"
            value={cvCode}
            onChange={(e) => setCvCode(e.target.value)}
          />
        </Flex>

        <Flex gap="5" justifyContent="center" mt={20}>
          <ConfirmButton
            text="Back to profile info"
            redirect="/profile/confirmation"
            whiteMode={true}
            type="button"
          />
          <ConfirmButton 
            text="Finish" 
            type="submit" 
          />
        </Flex>
      </Stack>
    </Center>
  </Stack>
);
};

export default Payment;