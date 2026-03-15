import { useState } from "react"
import { Container, Box, Heading, Text, VStack } from "@chakra-ui/react"

import CategoriaForm from "../../components/CategoriaForm"
import CategoriaList from "../../components/CategoriaList"

export default function Categorias() {

  const [reloadLista, setReloadLista] = useState(0)

  const atualizarLista = () => setReloadLista(prev => prev + 1)

  return (

    <Container maxW="container.md" py={{ base: 6, md: 10 }} px={{ base: 4, md: 6 }}>

      <VStack align="start" mb={8} gap={1}>

        <Heading size={{ base: "md", md: "lg" }}>
          Categorias
        </Heading>

        <Text color="gray.500" fontSize={{ base: "sm", md: "md" }}>
          Gerencie as categorias utilizadas nas transações
        </Text>

      </VStack>

      <Box
        bg="white"
        p={{ base: 4, md: 6 }}
        borderRadius="md"
        border="1px solid"
        borderColor="gray.200"
        mb={8}
        w="100%"
      >

        <CategoriaForm onSalvo={atualizarLista} />

      </Box>

      <Box
        h="1px"
        bg="gray.200"
        my={{ base: 6, md: 8 }}
      />

      <Box
        bg="white"
        p={{ base: 4, md: 6 }}
        borderRadius="md"
        border="1px solid"
        borderColor="gray.200"
        w="100%"
      >

        <CategoriaList reload={reloadLista} />

      </Box>

    </Container>
  )
}