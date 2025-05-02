import { Box, Center, Flex, Heading, Stack, useToast } from "@chakra-ui/react";
import FormControl from "../../components/FormControl";
import { FaEnvelope, FaLock, FaMap, FaPhoneAlt, FaUser } from "react-icons/fa";
import ConfirmButton from "../../components/ConfirmButton";
import Navbar from "../../components/Navbar";
import { useState } from "react";
import { CreateCustomerInput } from "../../interfaces/Customer";
import api from "../../services/api";
import { CreateAddressInput } from "../../interfaces/Address";

const Register = () => {
  const toast = useToast();

  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [street, setStreet] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [zip, setZip] = useState<string>("");

  const validateForm = () => {
    if (!name || !phone || !email || !password) {
      toast({
        title: "Incomplete fields",
        description: "Please, complete all personal fields.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please, enter a valid email address.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return false;
    }

    if (password.length < 5) {
      toast({
        title: "Password too short",
        description: "Your password must have at least 5 characters.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return false;
    }

    if (!street || !number || !district || !city || !state || !zip) {
      toast({
        title: "Incomplete address",
        description: "Please, complete all address fields.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const customer = {
        name,
        phone,
        email,
        password,
      } as CreateCustomerInput;

      const newCustomer = await createCustomer(customer);
      const customerId = newCustomer.id;

      const newAddress = {
        street,
        city,
        state,
        zipCode: zip,
        number: number,
        district: district,
        complement: "",
        isDefault: true,
      } as CreateAddressInput;

      await createAddress(customerId, newAddress);

      toast({
        title: "Your account was created!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao criar conta",
        description:
          error.response?.data?.message ||
          "Ocorreu um erro ao processar seu cadastro.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const createCustomer = async (customer: CreateCustomerInput) => {
    try {
      const response = await api.post("/customer/register", customer);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 409) {
        toast({
          title: "Email já cadastrado",
          description: "Este email já está sendo utilizado por outra conta.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
      console.error("Error while creating customer:", error);
      throw error;
    }
  };

  const createAddress = async (
    customerId: string,
    address: CreateAddressInput
  ) => {
    try {
      const response = await api.post(
        `/customer/${customerId}/addresses`,
        address
      );
      return response.data;
    } catch (error) {
      console.error("Error while creating address:", error);
      throw error;
    }
  };

  return (
    <Stack direction="column" minH="100vh" w="100%" bg="#F1F1F1">
      <Navbar isAuthenticated={false} />
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
            Register
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
              id="nameRegister"
              placeholder="Full name"
              onChange={(e) => setName(e.target.value)}
              value={name || ""}
              icon={<FaUser size="20px" color="orange" />}
            />

            <FormControl
              id="phoneRegister"
              placeholder="Phone number"
              type="tel"
              onChange={(e) => setPhone(e.target.value)}
              value={phone || ""}
              icon={<FaPhoneAlt size="20px" color="orange" />}
            />

            <FormControl
              id="emailRegister"
              placeholder="E-mail"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email || ""}
              icon={<FaEnvelope size="20px" color="orange" />}
            />

            <FormControl
              id="passwordRegister"
              placeholder="Create password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password || ""}
              icon={<FaLock size="20px" color="orange" />}
            />

            <Flex
              width="100%"
              flexDir={{ base: "column", md: "row" }}
              gap={{ base: 5, md: 2 }}
            >
              <Box flex="2">
                <FormControl
                  id="streetRegister"
                  placeholder="Street"
                  icon={<FaMap size="20px" color="orange" />}
                  onChange={(e) => setStreet(e.target.value)}
                  value={street || ""}
                />
              </Box>

              <Flex flex="2" gap={2} pl={{ base: "36px", md: 0 }}>
                <FormControl
                  id="districtRegister"
                  placeholder="District"
                  onChange={(e) => setDistrict(e.target.value)}
                  value={district || ""}
                />

                <FormControl
                  id="numberRegister"
                  placeholder="Number"
                  onChange={(e) => setNumber(e.target.value)}
                  value={number || ""}
                />
              </Flex>
            </Flex>

            <Flex gap={2} pl="36px">
              <FormControl
                id="city"
                placeholder="City"
                onChange={(e) => setCity(e.target.value)}
                value={city || ""}
              />
              <FormControl
                id="state"
                placeholder="State"
                onChange={(e) => setState(e.target.value)}
                value={state || ""}
              />
              <FormControl
                id="zip code"
                placeholder="ZIP code"
                onChange={(e) => setZip(e.target.value)}
                value={zip || ""}
              />
            </Flex>

            <Flex gap="5" justifyContent="center" mt={20}>
              <ConfirmButton text="Create Account" type="submit" />
            </Flex>
          </Stack>
        </Center>
      </Stack>
    </Stack>
  );
};

export default Register;
