import { Box, Center, Flex, Heading, Stack } from "@chakra-ui/react";
import FormControl from "../../components/FormControl";
import { FaEnvelope, FaLock, FaMap, FaPhoneAlt, FaUser } from "react-icons/fa";
import ConfirmButton from "../../components/ConfirmButton";
import Navbar from "../../components/Navbar";
import { useState } from "react";
import { CreateCustomerInput } from "../../interfaces/Customer";
import api from "../../services/api";
import { CreateAddressInput } from "../../interfaces/Address";

const Register = () => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      isDefault: false,
    } as CreateAddressInput;

    await createAddress(customerId, newAddress);
  };

  const createCustomer = async (customer: CreateCustomerInput) => {
    try {
      const response = await api.post("/customer/register", customer);
      return response.data;
    } catch (error) {
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
                  placeholder="street"
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
