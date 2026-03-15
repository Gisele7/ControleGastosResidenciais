import { useEffect, useState } from "react"
import {
  VStack,
  Box,
  Heading,
  Text,
  HStack
} from "@chakra-ui/react"
import api from "../../api/api"

/*Interface usada para atualizar lista*/
interface TransacaoListProps {
  reload?: number
}

/*Função para formatar dinheiro*/
function formatMoney(valor: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(valor)
}

export default function TransacaoList({ reload }: TransacaoListProps) {
  const [transacoes, setTransacoes] = useState<any[]>([])

  /*Totais financeiros*/
  const [totais, setTotais] = useState({
    receitas: 0,
    despesas: 0,
    saldo: 0
  })

  /*Carrega transações da API*/
  async function carregar() {
    const response = await api.get("/transacoes")
    const lista = response.data
    setTransacoes(lista)

    /*Calcula totais*/
    const receitas = lista
      .filter((t: any) => t.trtipo === "Receita")
      .reduce((acc: any, t: any) => acc + t.trvalor, 0)

    const despesas = lista
      .filter((t: any) => t.trtipo === "Despesa")
      .reduce((acc: any, t: any) => acc + t.trvalor, 0)

    setTotais({
      receitas,
      despesas,
      saldo: receitas - despesas
    })
  }

  /*Função para formatar data*/
  function formatDate(data: string) {
    return new Date(data).toLocaleDateString("pt-BR")
  }

  useEffect(() => {
    carregar()
  }, [reload])

  return (
    <VStack align="stretch" gap={6} w="100%">
      <Heading size={{ base: "sm", md: "md" }}>
        Transações
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
            Receitas
          </Text>

          <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold" color="green.600">
            {formatMoney(totais.receitas)}
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
            Despesas
          </Text>

          <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold" color="red.600">
            {formatMoney(totais.despesas)}
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
            Saldo
          </Text>

          <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold" color="blue.600">
            {formatMoney(totais.saldo)}
          </Text>
        </Box>

      </HStack>

      <Box
        borderRadius="md"
        border="1px solid #E2E8F0"
        overflowX="auto"
      >

        <HStack
          bg="gray.100"
          p={3}
          fontWeight="bold"
          minW="800px"
        >
          <Box flex={3}>Descrição</Box>
          <Box flex={2}>Pessoa</Box>
          <Box flex={2}>Categoria</Box>
          <Box flex={2}>Tipo</Box>
          <Box flex={2}>Data</Box>
          <Box flex={2} textAlign="right">Valor</Box>
        </HStack>

        {transacoes.map(t => (
          <HStack
            key={t.trid}
            p={3}
            borderTop="1px solid #EDF2F7"
            minW="800px"
          >

            <Box flex={3}>
              {t.trdescricao}
            </Box>

            <Box flex={2}>
              {t.trpessoa.penome}
            </Box>

            <Box flex={2}>
              {t.trcategoria.cadescricao}
            </Box>

            <Box flex={2}>
              <Text
                color={
                  t.trtipo === "Receita"
                    ? "green.500"
                    : "red.500"
                }
                fontWeight="bold"
              >
                {t.trtipo}
              </Text>
            </Box>

            <Box flex={2}>
              {formatDate(t.trdata)}
            </Box>

            <Box flex={2} textAlign="right">

              <Text
                fontWeight="bold"
                color={
                  t.trtipo === "Receita"
                    ? "green.600"
                    : "red.600"
                }
              >

                {t.trtipo === "Receita" ? "+" : "-"}{" "}
                {formatMoney(t.trvalor)}

              </Text>
            </Box>
          </HStack>

        ))}
      </Box>
    </VStack>
  )
}