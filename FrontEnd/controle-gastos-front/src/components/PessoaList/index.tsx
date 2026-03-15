import { useEffect, useState } from "react"
import { Heading, Box, Button, VStack, HStack, Text } from "@chakra-ui/react"
import api from "../../api/api"
import ConfirmDialog from "../ConfirmDialog"
import Mensagem from "../Message"

interface PessoaListProps {
  reload?: number
  onEditar?: (pessoa: any) => void
}

export default function PessoaList({ reload, onEditar }: PessoaListProps) {

  const [pessoas, setPessoas] = useState<any[]>([])
  const [mensagem, setMensagem] = useState({ titulo: "", tipo: "sucesso", aberto: false })
  const [confirmExcluir, setConfirmExcluir] = useState({ aberto: false, peid: 0 })

  async function carregar() {

    const response = await api.get("/pessoas")
    setPessoas(response.data)

  }

  useEffect(() => { carregar() }, [reload])

  async function excluir(peid: number) {

    try {

      await api.delete(`/pessoas/${peid}`)

      setMensagem({ titulo: "Pessoa excluída com sucesso", tipo: "sucesso", aberto: true })

      carregar()

    } catch {

      setMensagem({ titulo: "Erro ao excluir pessoa", tipo: "erro", aberto: true })

    }

  }

  return (

    <VStack align="stretch" gap={4} w="100%">

      <Heading size={{ base: "sm", md: "md" }}>
        Pessoas Cadastradas
      </Heading>

      {pessoas.map(p => (

        <Box
          key={p.peid}
          p={{ base: 4, md: 5 }}
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
          _hover={{ bg: "gray.50" }}
        >

          <HStack
            justify="space-between"
            align="start"
            flexDirection={{ base: "column", md: "row" }}
            gap={3}
          >

            <Box>
              <Text fontWeight="semibold" fontSize={{ base: "sm", md: "md" }}>
                {p.penome}
              </Text>

              <Text fontSize="sm" color="gray.500">
                {p.peidade} anos
              </Text>
            </Box>

            <HStack
              flexDirection={{ base: "column", md: "row" }}
              w={{ base: "100%", md: "auto" }}
              gap={2}
            >

              <Button
                size="sm"
                colorPalette="blue"
                variant="outline"
                onClick={() => onEditar?.(p)}
                w={{ base: "100%", md: "auto" }}
              >
                Editar
              </Button>

              <Button
                size="sm"
                colorPalette="red"
                onClick={() => setConfirmExcluir({ aberto: true, peid: p.peid })}
                w={{ base: "100%", md: "auto" }}
              >
                Excluir
              </Button>

            </HStack>

          </HStack>

        </Box>

      ))}

      <Mensagem
        titulo={mensagem.titulo}
        tipo={mensagem.tipo as any}
        aberto={mensagem.aberto}
        onFechar={() => setMensagem({ ...mensagem, aberto: false })}
      />

      <ConfirmDialog
        aberto={confirmExcluir.aberto}
        titulo="Deseja realmente excluir esta pessoa?"
        onConfirm={() => { excluir(confirmExcluir.peid); setConfirmExcluir({ aberto: false, peid: 0 }) }}
        onCancelar={() => setConfirmExcluir({ aberto: false, peid: 0 })}
      />

    </VStack>

  )
}