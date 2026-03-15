import { useState } from "react"
import { Box, Heading, Container, Text, VStack } from "@chakra-ui/react"
import PessoaForm from "../../components/PessoaForm"
import PessoaList from "../../components/PessoaList"

export default function Pessoas() {

  const [pessoaParaEditar, setPessoaParaEditar] = useState<any>(null)
  const [reloadLista, setReloadLista] = useState(0)

  const atualizarLista = () => setReloadLista(prev => prev + 1)

  return (

    <Container maxW="container.md" py={{ base: 6, md: 10 }} px={{ base: 4, md: 6 }}>

      <VStack align="start" mb={8} gap={1}>

        <Heading size={{ base: "md", md: "lg" }}>
          Pessoas
        </Heading>

        <Text color="gray.500" fontSize={{ base: "sm", md: "md" }}> 
          Gerencie as pessoas cadastradas no sistema
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

        <PessoaForm
          pessoaParaEditar={pessoaParaEditar}
          onSalvo={() => {
            setPessoaParaEditar(null)
            atualizarLista()
          }}
          onCancelarEdicao={() => setPessoaParaEditar(null)}
        />

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

        <PessoaList
          reload={reloadLista}
          onEditar={(p: any) => setPessoaParaEditar(p)}
        />

      </Box>

    </Container>

  )
}