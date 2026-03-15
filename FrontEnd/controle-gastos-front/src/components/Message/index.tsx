import { useState, useEffect } from "react"
import { Box, Text, Button, Portal } from "@chakra-ui/react"

interface MensagemProps {
  titulo: string
  tipo?: "sucesso" | "erro" | "info"
  aberto: boolean
  onFechar: () => void
  duracao?: number
}

export default function Mensagem({
  titulo,
  tipo = "info",
  aberto,
  onFechar,
  duracao = 3000
}: MensagemProps) {

  const [visivel, setVisivel] = useState(aberto)

  useEffect(() => {
    setVisivel(aberto)

    if (aberto) {
      const timer = setTimeout(() => {
        setVisivel(false)
        onFechar()
      }, duracao)

      return () => clearTimeout(timer)
    }
  }, [aberto, duracao, onFechar])

  if (!visivel) return null

  let bg = "blue.400"
  if (tipo === "sucesso") bg = "green.400"
  if (tipo === "erro") bg = "red.400"

  return (
    <Portal>
      <Box
        position="fixed"
        top="20px"
        left="50%"
        transform="translateX(-50%)"
        bg={bg}
        color="white"
        px={{ base: 4, md: 6 }}
        py={{ base: 3, md: 4 }}
        borderRadius="md"
        boxShadow="lg"
        zIndex={9999}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap={3}
        w={{ base: "90%", md: "auto" }}
        maxW="500px"
        minW={{ base: "auto", md: "300px" }}
      >

        <Text fontWeight="bold" fontSize={{ base: "sm", md: "md" }}>
          {titulo}
        </Text>

        <Button
          size="sm"
          onClick={() => {
            setVisivel(false)
            onFechar()
          }}
          variant="outline"
          color="white"
          borderColor="white"
          flexShrink={0}
        >
          Fechar
        </Button>

      </Box>
    </Portal>
  )
}