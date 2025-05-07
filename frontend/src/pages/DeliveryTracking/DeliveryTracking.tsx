import React, { useEffect, useState } from 'react';
import { Box, Center, Flex, Heading, Stack, Text, useToast } from '@chakra-ui/react';
import Navbar from '../../components/Navbar';
import DeliveryMap from '../../components/DeliveryMap';
import { useAuth } from '../../hooks/useAuth';
import api from '../../services/api';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../../interfaces/JwtPayload';

const DeliveryTracking: React.FC = () => {
const [customerAddress, setCustomerAddress] = useState<string>('');
const [storeAddress] = useState<string>('Rua Cláudio Manoel, 1124, Belo Horizonte, Minas Gerais'); 
const [isLoading, setIsLoading] = useState<boolean>(true);
const [userId, setUserId] = useState<string>('');

const toast = useToast();
const auth = useAuth();

useEffect(() => {
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        throw new Error('Token não encontrado');
      }
      
      const decoded = jwtDecode<JwtPayload>(token);
      const userId = decoded.sub;
      setUserId(userId);
      
      await fetchAddress(userId);
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar seus dados',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  fetchUserData();
}, [toast]);

const fetchAddress = async (userId: string) => {
  try {
    const response = await api.get(`/customer/${userId}/addresses`);
    const firstAddress = response.data[0] || {};
    
    if (firstAddress) {
      const formattedAddress = `${firstAddress.street}, ${firstAddress.number}, ${firstAddress.city}, ${firstAddress.state}`;
      setCustomerAddress(formattedAddress);
    }
  } catch (error) {
    console.error('Erro ao buscar endereço:', error);
    throw error;
  }
};

return (
  <Stack minH="100vh" bg="#F1F1F1">
    <Navbar isAuthenticated={true} />
    
    <Center px={{ base: "10px", md: "0" }} py={8}>
      <Stack
        maxW="container.md"
        w="100%"
        spacing={8}
      >
        <Heading size="lg" textAlign="center">Acompanhe sua Entrega</Heading>
        
        <Box bg="white" p={6} borderRadius="md" boxShadow="sm">
          <Text fontWeight="bold" mb={2}>Endereços:</Text>
          <Text mb={1}><strong>Seu endereço:</strong> {customerAddress || 'Carregando...'}</Text>
          <Text><strong>Nossa pizzaria:</strong> {storeAddress}</Text>
        </Box>
        
        {customerAddress && (
          <DeliveryMap 
            customerAddress={customerAddress} 
            storeAddress={storeAddress} 
          />
        )}
        
        <Box bg="orange.50" p={6} borderRadius="md" borderLeft="4px solid" borderLeftColor="orange.500">
          <Heading size="md" mb={4}>Status da Entrega</Heading>
          <Flex justify="space-between" mb={2}>
            <Text>Status:</Text>
            <Text fontWeight="bold">Em preparação</Text>
          </Flex>
          <Flex justify="space-between">
            <Text>Previsão de entrega:</Text>
            <Text fontWeight="bold">30-45 minutos</Text>
          </Flex>
        </Box>
      </Stack>
    </Center>
  </Stack>
);
};

export default DeliveryTracking;