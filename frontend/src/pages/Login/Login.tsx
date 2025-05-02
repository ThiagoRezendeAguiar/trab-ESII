import { Center, Flex, Heading, Stack, useToast } from "@chakra-ui/react";
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
  const toast = useToast();
  const auth = useAuth();

  if (!auth) {
    return <div>Loading...</div>;
  }

  const { login } = auth;

  const validateForm = () => {
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
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
        description: "Please enter a valid email address.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return false;
    }

    if (!password) {
      toast({
        title: "Password required",
        description: "Please enter your password.",
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
      const loginData = {
        email,
        password,
      } as LoginCustomerInput;

      await handleLogin(loginData);

      toast({
        title: "Login successful!",
        description: "Welcome back! You are now logged in.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });

      navigate("/");
    } catch (error: any) {
      toast({
        title: "Login failed",
        description:
          error.response?.data?.message ||
          "Invalid email or password. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleLogin = async (loginData: LoginCustomerInput) => {
    try {
      const response = await api.post("/customer/login", loginData);
      login(response.data.token);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        toast({
          title: "Authentication failed",
          description:
            "Invalid email or password. Please check your credentials.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      } else if (error.response?.status === 404) {
        toast({
          title: "Account not found",
          description: "No account exists with this email address.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      } else if (!error.response) {
        toast({
          title: "Connection error",
          description:
            "Unable to connect to the server. Please check your internet connection.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
      console.error("Error while logging in:", error);
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
