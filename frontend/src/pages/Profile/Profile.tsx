import { Flex, Stack } from "@chakra-ui/react";
import ConfirmButton from "../../components/ConfirmButton";
import { FaEnvelope, FaMap, FaPhoneAlt, FaUser } from "react-icons/fa";
import FormControl from "../../components/FormControl";
import Navbar from "../../components/Navbar";

const Profile = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <Stack
      w="100%"
      minH="100vh"
      px={{ base: "10px", md: "none" }}
      gap={20}
      bg="#F1F1F1"
    >
      <Navbar isAuthenticated={true} />
      <Flex flexDir="column" alignItems="center" gap={10} pt="10px">
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
            icon={<FaUser size="20px" color="orange" />}
          />

          <FormControl
            id="phone"
            placeholder="Phone number"
            type="tel"
            icon={<FaPhoneAlt size="20px" color="orange" />}
          />

          <FormControl
            id="email"
            placeholder="E-mail"
            type="email"
            icon={<FaEnvelope size="20px" color="orange" />}
          />

          <FormControl
            id="address"
            placeholder="Address"
            icon={<FaMap size="20px" color="orange" />}
          />

          <Flex gap={2} pl="36px">
            <FormControl id="city" placeholder="City" />
            <FormControl id="state" placeholder="State" />
            <FormControl id="zip code" placeholder="ZIP code" />
          </Flex>

          <Flex justifyContent="center" mt={5}>
            <ConfirmButton text="Save" type="submit" />
          </Flex>
        </Stack>
      </Flex>
    </Stack>
  );
};

export default Profile;
