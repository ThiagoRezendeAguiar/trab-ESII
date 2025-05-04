import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { Box, Spinner, Text, VStack } from '@chakra-ui/react';

// Corrigir o problema dos ícones do Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';

// Definir os ícones padrão do Leaflet
const DefaultIcon = L.icon({
iconUrl: icon,
shadowUrl: iconShadow,
iconSize: [25, 41],
iconAnchor: [12, 41],
popupAnchor: [1, -34],
shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface DeliveryMapProps {
customerAddress: string;
storeAddress: string;
}

// Função para converter endereço em coordenadas usando Nominatim
const geocodeAddress = async (address: string): Promise<[number, number] | null> => {
try {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
  );
  const data = await response.json();
  if (data && data.length > 0) {
    return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
  }
  return null;
} catch (error) {
  console.error('Erro ao geocodificar endereço:', error);
  return null;
}
};

const DeliveryMap: React.FC<DeliveryMapProps> = ({ customerAddress, storeAddress }) => {
const mapRef = useRef<HTMLDivElement>(null);
const leafletMap = useRef<L.Map | null>(null);
const routingControl = useRef<any>(null);
const [isLoading, setIsLoading] = useState<boolean>(true);
const [error, setError] = useState<string | null>(null);
const [routeInfo, setRouteInfo] = useState<{distance: string, duration: string} | null>(null);

useEffect(() => {
  // Função para inicializar o mapa
  const initMap = async () => {
    if (!mapRef.current) return;
    
    try {
      setIsLoading(true);
      setError(null);

      // Geocodificar endereços
      const customerCoords = await geocodeAddress(customerAddress);
      
      // Esperar 1 segundo para respeitar o limite de uso do Nominatim
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const storeCoords = await geocodeAddress(storeAddress);

      if (!customerCoords || !storeCoords) {
        setError('Não foi possível encontrar um ou ambos os endereços');
        setIsLoading(false);
        return;
      }

      // Inicializar o mapa se ainda não foi inicializado
      if (!leafletMap.current) {
        leafletMap.current = L.map(mapRef.current).setView(customerCoords, 13);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(leafletMap.current);
      } else {
        // Se o mapa já existe, apenas atualize a visualização
        leafletMap.current.setView(customerCoords, 13);
      }

      // Remover rota anterior se existir
      if (routingControl.current && leafletMap.current) {
        leafletMap.current.removeControl(routingControl.current);
      }

      // Adicionar marcadores
      const customerMarker = L.marker(customerCoords).addTo(leafletMap.current);
      customerMarker.bindPopup('Seu endereço').openPopup();
      
      const storeMarker = L.marker(storeCoords).addTo(leafletMap.current);
      storeMarker.bindPopup('Nossa pizzaria').openPopup();

      // Adicionar rota
      routingControl.current = L.Routing.control({
        waypoints: [
          L.latLng(customerCoords[0], customerCoords[1]),
          L.latLng(storeCoords[0], storeCoords[1])
        ],
        lineOptions: {
          styles: [{ color: '#FF6B00', weight: 4 }]
        },
        show: false,
        addWaypoints: false,
        routeWhileDragging: false,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        showAlternatives: false,
      }).addTo(leafletMap.current);

      // Capturar informações da rota
      routingControl.current.on('routesfound', function(e: any) {
        const routes = e.routes;
        const summary = routes[0].summary;
        setRouteInfo({
          distance: (summary.totalDistance / 1000).toFixed(1) + ' km',
          duration: Math.round(summary.totalTime / 60) + ' minutos'
        });
      });

      setIsLoading(false);
    } catch (error) {
      console.error('Erro ao inicializar mapa:', error);
      setError('Ocorreu um erro ao carregar o mapa');
      setIsLoading(false);
    }
  };

  initMap();

  // Limpar mapa quando o componente for desmontado
  return () => {
    if (leafletMap.current) {
      leafletMap.current.remove();
      leafletMap.current = null;
    }
  };
}, [customerAddress, storeAddress]);

return (
  <VStack w="100%" spacing={4}>
    <Box 
      ref={mapRef} 
      h="400px" 
      w="100%" 
      borderRadius="md" 
      overflow="hidden"
      position="relative"
      boxShadow="md"
    >
      {isLoading && (
        <Box 
          position="absolute" 
          top="0" 
          left="0" 
          right="0" 
          bottom="0" 
          bg="rgba(255,255,255,0.7)" 
          zIndex="1000"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Spinner size="xl" color="orange.500" />
        </Box>
      )}
      
      {error && (
        <Box 
          position="absolute" 
          top="0" 
          left="0" 
          right="0" 
          bottom="0" 
          bg="rgba(255,255,255,0.9)" 
          zIndex="1000"
          display="flex"
          alignItems="center"
          justifyContent="center"
          p={4}
        >
          <Text color="red.500" fontWeight="bold" textAlign="center">
            {error}
          </Text>
        </Box>
      )}
    </Box>
    
    {routeInfo && (
      <Box 
        w="100%" 
        p={4} 
        bg="white" 
        borderRadius="md" 
        boxShadow="sm"
      >
        <Text fontWeight="bold" mb={2}>Informações da Entrega:</Text>
        <Text>Distância: {routeInfo.distance}</Text>
        <Text>Tempo estimado: {routeInfo.duration}</Text>
      </Box>
    )}
  </VStack>
);
};

export default DeliveryMap;