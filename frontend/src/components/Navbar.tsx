import {
  Button,
  Flex,
  Image,
  Stack,
  Text,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  IconButton,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaShoppingCart, FaUser, FaBars } from "react-icons/fa";
import logo from "/pizza-logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <nav>
      <Stack
        bg="#FFFFFF"
        boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
        px={{ base: "auto", sm: "50px" }}
        justifyContent="center"
        alignItems="center"
      >
        <Flex
          justifyContent="space-between"
          maxW="container.xl"
          alignContent="center"
          w="100%"
        >
          <Flex alignItems="center" justifyContent="center">
            <Image src={logo} maxW="100" />
            <Text fontSize="36px" fontWeight="700" color="secondary">
              PizzaApp
            </Text>
          </Flex>

          {/* Exibe os botões normalmente em telas maiores (md+) */}
          {!isMobile ? (
            <Flex alignItems="center">
              <Button
                onClick={() => navigate("/")}
                bg="none"
                _hover={{ opacity: 0.8 }}
              >
                <FaHome size="28" color="orange" />
              </Button>
              <Button
                onClick={() => navigate("/cart")}
                bg="none"
                _hover={{ opacity: 0.8 }}
              >
                <FaShoppingCart size="27" color="orange" />
              </Button>
              <Button
                onClick={() => navigate("/profile")}
                bg="none"
                _hover={{ opacity: 0.8 }}
              >
                <FaUser size="22" color="orange" />
              </Button>
            </Flex>
          ) : (
            // Exibe um ícone de menu (hamburguer) em telas menores
            <Flex alignItems="center" mr="20px">
              <IconButton
                aria-label="Abrir menu"
                icon={<FaBars size="24" color="orange" />}
                onClick={onOpen}
                bg="none"
              />
            </Flex>
          )}
        </Flex>
      </Stack>

      {/* Drawer para dispositivos móveis */}
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody bg="#FFFFFF" pt={8}>
            <Stack spacing={4} align="center">
              <Button
                w="100%"
                justifyContent="flex-start"
                leftIcon={<FaHome size="20" />}
                onClick={() => {
                  navigate("/");
                  onClose();
                }}
                bg="none"
              >
                Início
              </Button>
              <Button
                w="100%"
                justifyContent="flex-start"
                leftIcon={<FaShoppingCart size="20" />}
                onClick={() => {
                  navigate("/cart");
                  onClose();
                }}
                bg="none"
              >
                Carrinho
              </Button>
              <Button
                w="100%"
                justifyContent="flex-start"
                leftIcon={<FaUser size="18" />}
                onClick={() => {
                  navigate("/profile");
                  onClose();
                }}
                bg="none"
              >
                Perfil
              </Button>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </nav>
  );
};

export default Navbar;
