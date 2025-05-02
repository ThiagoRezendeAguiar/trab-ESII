import { Center, Flex, Heading, Stack } from "@chakra-ui/react";
import FormControl from "../../components/FormControl";
import { FaEnvelope, FaLock } from "react-icons/fa";
import ConfirmButton from "../../components/ConfirmButton";
import Navbar from "../../components/Navbar";
import { useState } from "react";
import { LoginCustomerInput } from "../../interfaces/Customer";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const auth = useAuth();

  if (!auth) {
    return <div>Carregando...</div>; 
  }

  const { login } = auth;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const loginData = {
      email,
      password,
    } as LoginCustomerInput;

    const userLogin = await handleLogin(loginData);

    console.log(userLogin);
    if (userLogin) {
      navigate("/");
    }
  };

  const handleLogin = async (loginData: LoginCustomerInput) => {
    try {
      const response = await api.post("/customer/login", loginData);
      login(response.data.token);
      return response.data;
    } catch (error) {
      console.error("Error while creating customer:", error);
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
            Login
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
              id="emailLogin"
              placeholder="E-mail"
              type="email"
              icon={<FaEnvelope size="20px" color="orange" />}
              onChange={(e) => setEmail(e.target.value)}
              value={email || ""}
            />

            <FormControl
              id="passwordLogin"
              type="password"
              placeholder="Password"
              icon={<FaLock size="20px" color="orange" />}
              onChange={(e) => setPassword(e.target.value)}
              value={password || ""}
            />
            <Flex gap="5" justifyContent="center" mt={20}>
              <ConfirmButton text="Login" type="submit" />
            </Flex>
          </Stack>
        </Center>
      </Stack>
    </Stack>
  );
};

export default Login;
