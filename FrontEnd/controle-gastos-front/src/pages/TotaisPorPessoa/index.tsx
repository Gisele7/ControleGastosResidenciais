import { useEffect, useState } from "react"
import { VStack, Box, Heading, HStack, Text } from "@chakra-ui/react"
import api from "../../api/api"

/*Função para formatar valores em moeda brasileira*/
function formatMoney(valor: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(valor)
}

export default function TotaisPorPessoa() {
  /*Estado que recebe os dados da API*/
  const [dados, setDados] = useState<any>({
    porPessoa: [],
    totalGeral: {}
  })

  /*Função que busca dados da API*/
  async function carregar() {
    const response = await api.get("/transacoes/totais-por-pessoa")
    setDados(response.data)
  }

  useEffect(() => {
    carregar()
  }, [])

  /*Estilo reutilizado no cabeçalho*/
  const headerStyle = {
    fontWeight: "bold",
    p: 3,
    borderBottom: "2px solid #CBD5E0"
  }

  /*Estilo reutilizado nas células*/
  const cellStyle = {
    p: 3,
    borderBottom: "1px solid #E2E8F0"
  }

  return (
    <VStack
      align="stretch"
      gap={6}
      py={{ base: 4, md: 6 }}
      bg="white"
      p={{ base: 4, md: 6 }}
      borderRadius="md"
      boxShadow="md"
      w="100%"
    >
      <Heading size={{ base: "md", md: "lg" }} textAlign="center">
        Totais por Pessoa
      </Heading>

      <HStack
        gap={4}
        flexDirection={{ base: "column", md: "row" }}
        align="stretch"
      >
        <Box
          flex={1}
          p={{ base: 3, md: 4 }}
          borderRadius="md"
          bg="green.50"
          border="1px solid #C6F6D5"
        >
          <Text fontSize="sm" color="gray.600">
            Total de Receitas
          </Text>

          <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold" color="green.600">
            {formatMoney(dados.totalGeral.totalReceitas || 0)}
          </Text>
        </Box>

        <Box
          flex={1}
          p={{ base: 3, md: 4 }}
          borderRadius="md"
          bg="red.50"
          border="1px solid #FED7D7"
        >
          <Text fontSize="sm" color="gray.600">
            Total de Despesas
          </Text>

          <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold" color="red.600">
            {formatMoney(dados.totalGeral.totalDespesas || 0)}
          </Text>
        </Box>

        <Box
          flex={1}
          p={{ base: 3, md: 4 }}
          borderRadius="md"
          bg="blue.50"
          border="1px solid #BEE3F8"
        >
          <Text fontSize="sm" color="gray.600">
            Saldo Total
          </Text>

          <Text
            fontSize={{ base: "lg", md: "xl" }}
            fontWeight="bold"
            color={
              (dados.totalGeral.saldo || 0) >= 0
                ? "blue.600"
                : "red.600"
            }
          >
            {formatMoney(dados.totalGeral.saldo || 0)}
          </Text>
        </Box>
      </HStack>

      <Box
        border="1px solid #CBD5E0"
        borderRadius="md"
        overflowX="auto"
      >

        <HStack
          bg="gray.100"
          borderBottom="2px solid #CBD5E0"
          minW="700px"
        >

          <Box flex={3} {...headerStyle}>
            Pessoa
          </Box>

          <Box flex={2} textAlign="right" {...headerStyle}>
            Receitas
          </Box>

          <Box flex={2} textAlign="right" {...headerStyle}>
            Despesas
          </Box>

          <Box flex={2} textAlign="right" {...headerStyle}>
            Saldo
          </Box>
        </HStack>

        <Box maxH="400px" overflowY="auto">
          {dados.porPessoa.map((p: any, i: number) => (
            <HStack
              key={p.pessoa.peid}

              bg={i % 2 === 0 ? "gray.50" : "white"}
              _hover={{ bg: "gray.100" }}
              minW="700px"
            >

              <Box flex={3} {...cellStyle}>
                {p.pessoa.penome}
              </Box>

              <Box
                flex={2}
                textAlign="right"
                color="green.600"
                {...cellStyle}
              >
                {formatMoney(p.totalReceitas)}
              </Box>

              <Box
                flex={2}
                textAlign="right"
                color="red.600"
                {...cellStyle}
              >
                {formatMoney(p.totalDespesas)}
              </Box>

              <Box
                flex={2}
                textAlign="right"
                fontWeight="bold"
                color={
                  p.saldo >= 0
                    ? "blue.600"
                    : "red.600"
                }
                {...cellStyle}
              >
                {formatMoney(p.saldo)}
              </Box>
            </HStack>

          ))}

          <HStack
            bg="gray.200"
            fontWeight="bold"
            minW="700px"
          >
            <Box flex={3} {...cellStyle}>
              Total Geral
            </Box>

            <Box
              flex={2}
              textAlign="right"
              color="green.700"
              {...cellStyle}
            >
              {formatMoney(dados.totalGeral.totalReceitas || 0)}
            </Box>

            <Box
              flex={2}
              textAlign="right"
              color="red.700"
              {...cellStyle}
            >
              {formatMoney(dados.totalGeral.totalDespesas || 0)}
            </Box>

            <Box
              flex={2}
              textAlign="right"
              {...cellStyle}
            >
              {formatMoney(dados.totalGeral.saldo || 0)}
            </Box>
          </HStack>
        </Box>
      </Box>
    </VStack>

  )
}