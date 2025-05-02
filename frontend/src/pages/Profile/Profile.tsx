import { Flex, Stack } from "@chakra-ui/react";
import ConfirmButton from "../../components/ConfirmButton";
import { FaEnvelope, FaMap, FaPhoneAlt, FaUser } from "react-icons/fa";
import FormControl from "../../components/FormControl";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import api from "../../services/api";

import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../hooks/useAuth";
import { JwtPayload } from "../../interfaces/JwtPayload";



const Profile = () => {
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [zip, setZip] = useState<string>("");

  const auth = useAuth();
  
    if (!auth) {
      return <div>Carregando...</div>; 
    }
  
    const { logout } = auth;

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
    
    setAddress(firstAddress.street);
    setCity(firstAddress.city);
    setState(firstAddress.state);
    setZip(firstAddress.zipCode);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <Stack w="100%" minH="100vh" gap={20} bg="#F1F1F1">
      <Navbar isAuthenticated={true} />
      <Flex
        flexDir="column"
        alignItems="center"
        gap={10}
        pt="10px"
        px={{ base: "10px", md: "none" }}
      >
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
            id="addressRegister"
            placeholder="Address"
            icon={<FaMap size="20px" color="orange" />}
            onChange={(e) => setAddress(e.target.value)}
            value={address || ""}
          />

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
            <ConfirmButton text="Logout" action={() => logout()} whiteMode={true} type="button"/>
            <ConfirmButton text="Save" type="submit"/>
          </Flex>
        </Stack>
      </Flex>
    </Stack>
  );
};

export default Profile;
