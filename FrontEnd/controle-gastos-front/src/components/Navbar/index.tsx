import {
  Box,
  HStack,
  VStack,
  Text,
  Icon,
  IconButton,
  Drawer
} from "@chakra-ui/react"

import { Link as RouterLink } from "react-router-dom"

import {
  FiDollarSign,
  FiUsers,
  FiFolder,
  FiUserCheck,
  FiPieChart,
  FiMenu
} from "react-icons/fi"

export default function Navbar() {

  return (

    <Box
      bg="white"
      borderBottom="1px solid #E2E8F0"
      px={{ base: 4, md: 8 }}
      py={4}
      boxShadow="sm"
      position="sticky"
      top="0"
      zIndex="100"
    >

      <HStack justify="space-between">

        {/* LOGO */}

        <RouterLink to="/">
          <HStack
            gap={3}
            cursor="pointer"
            _hover={{ color: "blue.500" }}
          >
            <Icon
              as={FiDollarSign}
              boxSize={7}
              color="blue.500"
            />

            <Text
              fontSize="xl"
              fontWeight="bold"
              color="gray.700"
            >
              Controle Financeiro
            </Text>
          </HStack>
        </RouterLink>


        {/* MENU DESKTOP */}

        <HStack
          gap={6}
          display={{ base: "none", md: "flex" }}
        >

          <RouterLink to="/transacoes">
            <HStack cursor="pointer" _hover={{ color: "blue.500" }}>
              <Icon as={FiDollarSign} />
              <Text>Transações</Text>
            </HStack>
          </RouterLink>

          <RouterLink to="/pessoas">
            <HStack cursor="pointer" _hover={{ color: "blue.500" }}>
              <Icon as={FiUsers} />
              <Text>Pessoas</Text>
            </HStack>
          </RouterLink>

          <RouterLink to="/categorias">
            <HStack cursor="pointer" _hover={{ color: "blue.500" }}>
              <Icon as={FiFolder} />
              <Text>Categorias</Text>
            </HStack>
          </RouterLink>

          <RouterLink to="/totais-por-pessoa">
            <HStack cursor="pointer" _hover={{ color: "blue.500" }}>
              <Icon as={FiUserCheck} />
              <Text>Totais por Pessoa</Text>
            </HStack>
          </RouterLink>

          <RouterLink to="/totais-por-categoria">
            <HStack cursor="pointer" _hover={{ color: "blue.500" }}>
              <Icon as={FiPieChart} />
              <Text>Totais por Categoria</Text>
            </HStack>
          </RouterLink>

        </HStack>


        {/* MENU MOBILE */}

        <Drawer.Root placement="end">

          <Drawer.Trigger asChild>

            <IconButton
              aria-label="Abrir menu"
              display={{ base: "flex", md: "none" }}
              variant="ghost"
            >
              <FiMenu />
            </IconButton>

          </Drawer.Trigger>

          <Drawer.Backdrop />

          <Drawer.Content>

            <Drawer.CloseTrigger />

            <Drawer.Body mt={10}>

              <VStack align="start" gap={6}>

                <RouterLink to="/">
                  <HStack>
                    <Icon as={FiDollarSign} />
                    <Text>Dashboard</Text>
                  </HStack>
                </RouterLink>

                <RouterLink to="/transacoes">
                  <HStack>
                    <Icon as={FiDollarSign} />
                    <Text>Transações</Text>
                  </HStack>
                </RouterLink>

                <RouterLink to="/pessoas">
                  <HStack>
                    <Icon as={FiUsers} />
                    <Text>Pessoas</Text>
                  </HStack>
                </RouterLink>

                <RouterLink to="/categorias">
                  <HStack>
                    <Icon as={FiFolder} />
                    <Text>Categorias</Text>
                  </HStack>
                </RouterLink>

                <RouterLink to="/totais-por-pessoa">
                  <HStack>
                    <Icon as={FiUserCheck} />
                    <Text>Totais por Pessoa</Text>
                  </HStack>
                </RouterLink>

                <RouterLink to="/totais-por-categoria">
                  <HStack>
                    <Icon as={FiPieChart} />
                    <Text>Totais por Categoria</Text>
                  </HStack>
                </RouterLink>

              </VStack>

            </Drawer.Body>

          </Drawer.Content>

        </Drawer.Root>

      </HStack>

    </Box>

  )
}
