import { useState } from "react"
import {
  Heading,
  Input,
  Button,
  VStack,
  NativeSelect,
  Field,
  Box,
  Text,
  HStack
} from "@chakra-ui/react"

import api from "../../api/api"

interface Props {
  onSalvo: () => void
}

export default function CategoriaForm({ onSalvo }: Props) {

  const [descricao, setDescricao] = useState("")
  const [finalidade, setFinalidade] = useState("Ambas")

  /* Salva a nova categoria */
  async function salvar() {

    if (!descricao) return

    await api.post("/categorias", {
      caDescricao: descricao,
      caFinalidade: finalidade
    })

    setDescricao("")
    setFinalidade("Ambas")

    onSalvo()
  }

  return (

    <Box
      w="100%"
      maxW="500px"
      mx="auto"
      px={{ base: 4, md: 0 }}
    >

      <Heading
        size="md"
        mb={6}
        textAlign={{ base: "center", md: "left" }}
      >
        Nova Categoria
      </Heading>

      <VStack
        align="stretch"
        gap={5}
      >

        {/* DESCRIÇÃO */}

        <Box>

          <Text
            fontSize="sm"
            mb={1}
            fontWeight="medium"
          >
            Descrição
          </Text>

          <Input
            placeholder="Digite a descrição da categoria"
            maxLength={400}
            value={descricao}
            border="1px solid"
            borderColor="gray.300"
            borderRadius="md"
            css={{ "--focus-color": "blue.500" }}
            onChange={(e) => setDescricao(e.target.value)}
          />

        </Box>


        {/* FINALIDADE */}

        <Field.Root>

          <Field.Label>
            Finalidade
          </Field.Label>

          <NativeSelect.Root>

            <NativeSelect.Field
              value={finalidade}
              border="1px solid"
              borderColor="gray.300"
              borderRadius="md"
              onChange={(e) => setFinalidade(e.target.value)}
            >

              <option value="Despesa">
                Despesa
              </option>

              <option value="Receita">
                Receita
              </option>

              <option value="Ambas">
                Ambas
              </option>

            </NativeSelect.Field>

          </NativeSelect.Root>

        </Field.Root>


        {/* BOTÃO */}

        <HStack
          pt={2}
          justify={{ base: "center", md: "flex-start" }}
        >

          <Button
            colorPalette="blue"
            px={8}
            w={{ base: "100%", md: "auto" }}
            onClick={salvar}
          >
            Salvar
          </Button>

        </HStack>

      </VStack>

    </Box>

  )
}
