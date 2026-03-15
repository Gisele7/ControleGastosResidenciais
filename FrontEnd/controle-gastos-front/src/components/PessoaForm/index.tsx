import { useState, useEffect } from "react"
import { Box, Heading, Input, Button, VStack, HStack, Text } from "@chakra-ui/react"
import api from "../../api/api"
import Mensagem from "../Message"

interface PessoaFormProps {
  pessoaParaEditar?: any
  onSalvo: () => void
  onCancelarEdicao?: () => void
}

export default function PessoaForm({ pessoaParaEditar, onSalvo, onCancelarEdicao }: PessoaFormProps) {

  const [nome, setNome] = useState("")
  const [idade, setIdade] = useState<number | "">("")
  const [mensagem, setMensagem] = useState({ titulo: "", tipo: "sucesso", aberto: false })

  useEffect(() => {

    if (pessoaParaEditar) {
      setNome(pessoaParaEditar.penome)
      setIdade(pessoaParaEditar.peidade)
    } else {
      setNome("")
      setIdade("")
    }

  }, [pessoaParaEditar])

  async function salvar() {

    if (!nome || !idade || idade <= 0) {
      setMensagem({ titulo: "Preencha todos os campos corretamente", tipo: "erro", aberto: true })
      return
    }

    try {

      if (pessoaParaEditar) {

        await api.put(`/pessoas/${pessoaParaEditar.peid}`, {
          peNome: nome,
          peIdade: idade
        })

        setMensagem({ titulo: "Pessoa atualizada com sucesso", tipo: "sucesso", aberto: true })

      } else {

        await api.post("/pessoas", {
          peNome: nome,
          peIdade: idade
        })

        setMensagem({ titulo: "Pessoa cadastrada com sucesso", tipo: "sucesso", aberto: true })

      }

      setNome("")
      setIdade("")
      onSalvo()
      onCancelarEdicao?.()

    } catch {

      setMensagem({ titulo: "Erro ao salvar pessoa", tipo: "erro", aberto: true })

    }

  }

  return (

    <Box w="100%">

      <Heading size={{ base: "sm", md: "md" }} mb={6}>
        {pessoaParaEditar ? "Editar Pessoa" : "Cadastrar Pessoa"}
      </Heading>

      <VStack align="stretch" gap={5} w="100%">

        <Box>
          <Text fontSize="sm" mb={1} fontWeight="medium">
            Nome
          </Text>

          <Input
            placeholder="Digite o nome da pessoa"
            value={nome}
            border="1px solid"
            borderColor="gray.300"
            borderRadius="md"
            css={{ "--focus-color": "blue.500" }}
            onChange={(e) => setNome(e.target.value)}
            fontSize={{ base: "sm", md: "md" }}
          />
        </Box>

        <Box>
          <Text fontSize="sm" mb={1} fontWeight="medium">
            Idade
          </Text>

          <Input
            placeholder="Digite a idade"
            type="number"
            value={idade}
            border="1px solid"
            borderColor="gray.300"
            borderRadius="md"
            css={{ "--focus-color": "blue.500" }}
            onChange={(e) => setIdade(Number(e.target.value))}
            fontSize={{ base: "sm", md: "md" }}
          />
        </Box>

        <HStack
          pt={2}
          flexDirection={{ base: "column", md: "row" }}
          w="100%"
          gap={3}
        >

          <Button
            colorPalette="blue"
            px={8}
            onClick={salvar}
            w={{ base: "100%", md: "auto" }}
          >
            {pessoaParaEditar ? "Atualizar" : "Salvar"}
          </Button>

          {pessoaParaEditar && onCancelarEdicao && (

            <Button
              variant="outline"
              onClick={onCancelarEdicao}
              colorPalette="gray"
              w={{ base: "100%", md: "auto" }}
            >
              Cancelar
            </Button>

          )}

        </HStack>

      </VStack>

      <Mensagem
        titulo={mensagem.titulo}
        tipo={mensagem.tipo as any}
        aberto={mensagem.aberto}
        onFechar={() => setMensagem({ ...mensagem, aberto: false })}
      />

    </Box>
  )
}