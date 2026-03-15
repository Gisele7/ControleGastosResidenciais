import { useEffect, useState } from "react"
import {
  Heading,
  Table,
  Box,
  Badge,
  HStack,
  Text,
  VStack
} from "@chakra-ui/react"
import { FiTag, FiFolder } from "react-icons/fi"
import api from "../../api/api"

interface Props {
  reload: number
}

export default function CategoriaList({ reload }: Props) {

  const [categorias, setCategorias] = useState<any[]>([])

  /* Carrega as categorias do banco de dados */
  async function carregar() {
    const res = await api.get("/categorias")
    setCategorias(res.data)
  }

  useEffect(() => {
    carregar()
  }, [reload])

  /* Retorna o badge de acordo com a finalidade da categoria */
  function getBadge(finalidade: string) {
    if (finalidade === "Receita") {
      return <Badge colorPalette="green">Receita</Badge>
    }

    if (finalidade === "Despesa") {
      return <Badge colorPalette="red">Despesa</Badge>
    }

    return <Badge colorPalette="blue">Ambas</Badge>
  }

  if (categorias.length === 0) {
    return (
      <VStack py={10} gap={3} textAlign="center">

        <Box fontSize={{ base: "30px", md: "40px" }}>
          <FiFolder />
        </Box>

        <Text fontWeight="semibold" fontSize={{ base: "md", md: "lg" }}>
          Nenhuma categoria cadastrada
        </Text>

        <Text color="gray.500" fontSize="sm">
          Cadastre a primeira categoria acima
        </Text>

      </VStack>
    )
  }

  return (

    <>
      <Heading
        size={{ base: "sm", md: "md" }}
        mb={6}
      >
        Categorias Cadastradas
      </Heading>

      <Box
        overflowX="auto"
        borderRadius="md"
      >

        <Table.Root
          variant="outline"
          size={{ base: "sm", md: "md" }}
        >

          <Table.Header>

            <Table.Row>

              <Table.ColumnHeader>
                Categoria
              </Table.ColumnHeader>

              <Table.ColumnHeader>
                Finalidade
              </Table.ColumnHeader>

            </Table.Row>

          </Table.Header>

          <Table.Body>

            {categorias.map(c => (

              <Table.Row key={c.caid}>

                <Table.Cell>

                  <HStack gap={2}>

                    <FiTag />

                    <Text
                      fontSize={{ base: "sm", md: "md" }}
                    >
                      {c.cadescricao}
                    </Text>

                  </HStack>

                </Table.Cell>

                <Table.Cell>
                  {getBadge(c.cafinalidade)}
                </Table.Cell>

              </Table.Row>

            ))}

          </Table.Body>

        </Table.Root>

      </Box>
    </>
  )
}