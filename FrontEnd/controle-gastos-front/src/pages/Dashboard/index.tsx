import { useEffect, useState } from "react"
import {
  VStack,
  HStack,
  Box,
  Heading,
  Text,
  Container,
  Stack
} from "@chakra-ui/react"

import api from "../../api/api"

/* Função para formatar valores monetários */
function formatMoney(valor: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(valor)
}

/* Função para formatar data da API para padrão brasileiro */
function formatDate(data: string) {
  return new Date(data).toLocaleDateString("pt-BR")
}

export default function Dashboard() {

  const [dados, setDados] = useState<any>({
    saldo: 0,
    totalReceitas: 0,
    totalDespesas: 0,
    ultimasTransacoes: []
  })

  /* Busca os dados do dashboard na API */
  async function carregar() {
    const response = await api.get("/dashboard")
    setDados(response.data)
    console.log('response', response.data)
  }

  /* Executa quando o componente é montado */
  useEffect(() => {
    carregar()
  }, [])

  return (

    <Container maxW="1200px" py={8} px={{ base: 4, md: 6 }}>

      <VStack align="stretch" gap={8}>

        <Heading size="lg">
          Dashboard Financeiro
        </Heading>

        <Stack
          direction={{ base: "column", md: "row" }}
          gap={6}
        >

          <Box
            flex={1}
            p={6}
            borderRadius="xl"
            bg="blue.50"
            border="1px solid #BEE3F8"
            boxShadow="sm"
          >
            <Text fontSize="sm" color="gray.600">
              Saldo Atual
            </Text>

            <Text
              fontSize="2xl"
              fontWeight="bold"
              color={dados.saldo >= 0 ? "green.600" : "red.600"}
            >
              {formatMoney(dados.saldo)}
            </Text>
          </Box>

          <Box
            flex={1}
            p={6}
            borderRadius="xl"
            bg="green.50"
            border="1px solid #C6F6D5"
            boxShadow="sm"
          >
            <Text fontSize="sm" color="gray.600">
              Total Receitas
            </Text>

            <Text
              fontSize="2xl"
              fontWeight="bold"
              color="green.600"
            >
              {formatMoney(dados.totalReceitas)}
            </Text>
          </Box>

          <Box
            flex={1}
            p={6}
            borderRadius="xl"
            bg="red.50"
            border="1px solid #FED7D7"
            boxShadow="sm"
          >
            <Text fontSize="sm" color="gray.600">
              Total Despesas
            </Text>

            <Text
              fontSize="2xl"
              fontWeight="bold"
              color="red.600"
            >
              {formatMoney(dados.totalDespesas)}
            </Text>
          </Box>

        </Stack>

        <Box
          borderRadius="xl"
          border="1px solid #E2E8F0"
          overflow="hidden"
          boxShadow="sm"
        >

          <Box
            display={{ base: "none", md: "block" }}
          >

            <HStack
              bg="gray.100"
              px={5}
              py={3}
              fontWeight="bold"
            >
              <Box flex={3}>Descrição</Box>
              <Box flex={2}>Pessoa</Box>
              <Box flex={2}>Categoria</Box>
              <Box flex={1}>Tipo</Box>
              <Box flex={2}>Data</Box>
              <Box flex={2} textAlign="right">Valor</Box>
            </HStack>

            {dados.ultimasTransacoes.map((t: any, i: number) => (

              <HStack
                key={i}
                px={5}
                py={3}
                borderTop="1px solid #EDF2F7"
                bg={i % 2 === 0 ? "white" : "gray.50"}
              >

                <Box flex={3}>{t.descricao}</Box>

                <Box flex={2}>{t.pessoa}</Box>

                <Box flex={2}>{t.categoria}</Box>

                <Box flex={1}>
                  <Text
                    fontWeight="bold"
                    color={
                      t.tipo === "Receita"
                        ? "green.500"
                        : "red.500"
                    }
                  >
                    {t.tipo}
                  </Text>
                </Box>

                <Box flex={2}>
                  {formatDate(t.data)}
                </Box>

                <Box flex={2} textAlign="right">
                  <Text
                    fontWeight="bold"
                    color={
                      t.tipo === "Receita"
                        ? "green.600"
                        : "red.600"
                    }
                  >
                    {t.tipo === "Receita" ? "+" : "-"}{" "}
                    {formatMoney(t.valor)}
                  </Text>
                </Box>

              </HStack>

            ))}

          </Box>

          <VStack
            display={{ base: "flex", md: "none" }}
            align="stretch"
          >

            {dados.ultimasTransacoes.map((t: any, i: number) => (

              <Box
                key={i}
                p={4}
                borderTop="1px solid #EDF2F7"
              >

                <Text fontWeight="bold">
                  {t.descricao}
                </Text>

                <Text fontSize="sm" color="gray.600">
                  {t.pessoa} • {t.categoria}
                </Text>

                <HStack
                  justify="space-between"
                  mt={2}
                >

                  <Text
                    color={
                      t.tipo === "Receita"
                        ? "green.500"
                        : "red.500"
                    }
                    fontWeight="bold"
                  >
                    {t.tipo}
                  </Text>

                  <Text>
                    {formatDate(t.data)}
                  </Text>

                  <Text
                    fontWeight="bold"
                    color={
                      t.tipo === "Receita"
                        ? "green.600"
                        : "red.600"
                    }
                  >
                    {t.tipo === "Receita" ? "+" : "-"}{" "}
                    {formatMoney(t.valor)}
                  </Text>

                </HStack>

              </Box>

            ))}

          </VStack>

        </Box>

      </VStack>

    </Container>

  )
}
