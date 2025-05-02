import { Box, Center, Flex, Heading, Stack } from "@chakra-ui/react";
import ConfirmButton from "../../components/ConfirmButton";
import { FaEnvelope, FaMap, FaPhoneAlt, FaUser } from "react-icons/fa";
import FormControl from "../../components/FormControl";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "../../interfaces/JwtPayload";

const ProfileConfirmation = () => {
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [street, setStreet] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [zip, setZip] = useState<string>("");


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          throw new Error("Token não encontrado");
        }

        const decoded = jwtDecode<JwtPayload>(token);
        const userId = decoded.sub;

        handleGetUser(userId);
        handleGetAddress(userId);
      } catch (error) {
        console.error("Erro ao buscar pizzas:", error);
      }
    };

    fetchUser();
  }, []);

  const handleGetUser = async (userId: string) => {
    const response = await api.get(`/customer/${userId}`);

    setName(response.data.name);
    setPhone(response.data.phone);
    setEmail(response.data.email);
  };

  const handleGetAddress = async (userId: string) => {
    const response = await api.get(`/customer/${userId}/addresses`);

    const firstAddress = response.data[0] || {};

    setStreet(firstAddress.street);
    setDistrict(firstAddress.district);
    setNumber(firstAddress.number);
    setCity(firstAddress.city);
    setState(firstAddress.state);
    setZip(firstAddress.zipCode);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
         Info
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
            <ConfirmButton
              text="Back to cart"
              redirect="/cart"
              whiteMode={true}
              type="button"
            />
            <ConfirmButton text="Proceed" redirect="/payment" type="submit" />
          </Flex>
        </Stack>
      </Center>
    </Stack>
  );
};

export default ProfileConfirmation;
