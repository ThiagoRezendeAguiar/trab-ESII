import { Center, Flex, Heading, Stack } from "@chakra-ui/react";
import FormControl from "../../components/FormControl";
import { FaEnvelope, FaLock } from "react-icons/fa";
import ConfirmButton from "../../components/ConfirmButton";
import Navbar from "../../components/Navbar";

const Login = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
              id="emailRegister"
              placeholder="E-mail"
              type="email"
              icon={<FaEnvelope size="20px" color="orange" />}
            />

            <FormControl
              id="passwordRegister"
              type="password"
              placeholder="Password"
              icon={<FaLock size="20px" color="orange" />}
            />
            <Flex gap="5" justifyContent="center" mt={20}>
              <ConfirmButton text="Login" redirect="/" type="submit" />
            </Flex>
          </Stack>
        </Center>
      </Stack>
    </Stack>
  );
};

export default Login;
