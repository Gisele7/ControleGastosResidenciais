import { Box, Button, Text, Portal, VStack } from "@chakra-ui/react"

interface ConfirmDialogProps {
  aberto: boolean
  titulo: string
  onConfirm: () => void
  onCancelar: () => void
}

export default function ConfirmDialog({
  aberto,
  titulo,
  onConfirm,
  onCancelar
}: ConfirmDialogProps) {

  if (!aberto) return null

  return (

    <Portal>

      <Box
        position="fixed"
        top="0"
        left="0"
        w="100vw"
        h="100vh"
        bg="rgba(0,0,0,0.4)"
        display="flex"
        alignItems="center"
        justifyContent="center"
        zIndex={9999}
        px={4}
      >

        <Box
          bg="white"
          p={{ base: 5, md: 6 }}
          borderRadius="md"
          w="100%"
          maxW="380px"
          textAlign="center"
          boxShadow="lg"
        >

          <Text
            fontWeight="bold"
            mb={4}
            fontSize={{ base: "md", md: "lg" }}
          >
            {titulo}
          </Text>

          <VStack gap={3}>

            <Button
              colorPalette="red"
              onClick={onConfirm}
              w="full"
            >
              Sim
            </Button>

            <Button
              variant="outline"
              onClick={onCancelar}
              w="full"
            >
              Cancelar
            </Button>

          </VStack>

        </Box>

      </Box>

    </Portal>

  )
}