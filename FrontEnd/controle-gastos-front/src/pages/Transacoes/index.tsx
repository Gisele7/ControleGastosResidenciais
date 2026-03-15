import { useState } from "react"
import { Container, Box, Heading } from "@chakra-ui/react"

import TransacaoForm from "../../components/TransacoesForm"
import TransacaoList from "../../components/TransacoesList"

export default function Transacoes() {

  const [reloadLista, setReloadLista] = useState(0)

  const atualizarLista = () => {
    setReloadLista(prev => prev + 1)
  }

  return (

    <Container
      maxW="900px"
      py={{ base: 6, md: 10 }}
      px={{ base: 4, md: 6 }}
    >

      <Heading
        mb={6}
        textAlign="center"
        color="gray.700"
        size={{ base: "md", md: "lg" }}
      >
        Controle de Gastos Residenciais
      </Heading>

      <Box
        p={{ base: 4, md: 6 }}
        borderRadius="lg"
        boxShadow="md"
        bg="white"
        mb={{ base: 6, md: 8 }}
        w="100%"
      >

        <TransacaoForm
          onSalvo={atualizarLista}
        />

      </Box>

      <Box
        p={{ base: 4, md: 6 }}
        borderRadius="lg"
        boxShadow="md"
        bg="white"
        w="100%"
      >

        <TransacaoList
          reload={reloadLista}
        />

      </Box>

    </Container>

  )
}