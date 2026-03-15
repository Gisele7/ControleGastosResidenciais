import { useState, useEffect } from "react"
import { VStack, HStack, Input, Button, Heading, Box, Text } from "@chakra-ui/react"
import { NumericFormat } from "react-number-format"
import api from "../../api/api"
import Mensagem from "../Message"

/*Interface usada para avisar a página que a lista precisa recarregar*/
interface TransacaoFormProps {
  onSalvo: () => void
}

export default function TransacaoForm({ onSalvo }: TransacaoFormProps) {

  /*Estados do formulário*/
  const [descricao, setDescricao] = useState("")
  const [valor, setValor] = useState(0)
  const [tipo, setTipo] = useState("Despesa")
  const [categoria, setCategoria] = useState("")
  const [pessoa, setPessoa] = useState("")
  const [data, setData] = useState(new Date().toISOString().split("T")[0])

  /*Estados que armazenam dados vindos da API*/
  const [categorias, setCategorias] = useState<any[]>([])
  const [pessoas, setPessoas] = useState<any[]>([])

  /*Estado da mensagem de feedback*/
  const [mensagem, setMensagem] = useState({
    titulo: "",
    tipo: "sucesso",
    aberto: false
  })

  useEffect(() => {
    carregarDados()
  }, [])

  /*Busca categorias e pessoas na API*/
  async function carregarDados() {
    try {
      const [catRes, pesRes] = await Promise.all([
        api.get("/categorias"),
        api.get("/pessoas")
      ])

      setCategorias(catRes.data)
      setPessoas(pesRes.data)
    } catch {
      setMensagem({
        titulo: "Erro ao carregar dados",
        tipo: "erro",
        aberto: true
      })
    }

  }

  /*Limpa os campos do formulário*/
  function resetForm() {
    setDescricao("")
    setValor(0)
    setTipo("Despesa")
    setCategoria("")
    setPessoa("")

  }

  /*Filtra categorias conforme o tipo de transação*/
  const categoriasFiltradas = categorias.filter(c => {
    if (tipo === "Despesa")
      return c.cafinalidade === "Despesa" || c.cafinalidade === "Ambas"
    if (tipo === "Receita")
      return c.cafinalidade === "Receita" || c.cafinalidade === "Ambas"
    return true
  })

  /*Envia transação para API*/
  async function salvar() {
    if (!descricao || valor <= 0 || !categoria || !pessoa) {
      setMensagem({
        titulo: "Preencha todos os campos",
        tipo: "erro",
        aberto: true
      })
      return
    }
    try {
      await api.post("/transacoes", {
        trdescricao: descricao,
        trvalor: valor,
        trtipo: tipo,
        trcategoriaId: Number(categoria),
        trpessoaId: Number(pessoa),
        trdata: data
      })
      setMensagem({
        titulo: "Transação cadastrada com sucesso",
        tipo: "sucesso",
        aberto: true
      })
      resetForm()
      onSalvo()
    }catch (error: any) {
      const msg = 
        error.response?.data?.message ||
        error?.response?.data ||
        "Erro ao salvar transação"
      setMensagem({
        titulo: msg,
        tipo: "erro",
        aberto: true
      })
    }

  }

  /*Estilo usado nos selects*/
  const estiloSelect: React.CSSProperties = {
    width: "100%",
    padding: "8px",
    borderRadius: "8px",
    border: "1px solid #CBD5E0"
  }

  return (
    <VStack align="stretch" gap={5} w="100%">
      <Heading size={{ base: "sm", md: "md" }}>
        Nova Transação
      </Heading>

      <Box>
        <Text mb={1}>Pessoa</Text>
        <select
          style={estiloSelect}
          value={pessoa}
          onChange={e => setPessoa(e.target.value)}
        >
          <option value="">Selecione</option>
          {pessoas.map(p => (
            <option key={p.peid} value={p.peid}>
              {p.penome} ({p.peidade} anos)
            </option>
          ))}
        </select>
      </Box>

      <HStack
        gap={4}
        flexDirection={{ base: "column", md: "row" }}
        align="stretch"
      >
        <Box flex={1} w="100%">
          <Text mb={1}>Tipo</Text>
          <select
            style={estiloSelect}
            value={tipo}
            onChange={e => {
              setTipo(e.target.value)
              setCategoria("")
            }}
          >
            <option value="Despesa">Despesa</option>
            <option value="Receita">Receita</option>
          </select>
        </Box>

        <Box flex={2} w="100%">
          <Text mb={1}>Categoria</Text>
          <select
            style={estiloSelect}
            value={categoria}
            onChange={e => setCategoria(e.target.value)}
          >
            <option value="">Selecione</option>
            {categoriasFiltradas.map(c => (
              <option key={c.caid} value={c.caid}>
                {c.cadescricao}
              </option>
            ))}
          </select>
        </Box>
      </HStack>

      <Box>
        <Text mb={1}>Data</Text>

        <Input
          type="date"
          value={data}
          onChange={e => setData(e.target.value)}
        />

      </Box>

      <Box>
        <Text mb={1}>Descrição</Text>
        <Input
          placeholder="Descrição da transação"
          maxLength={400}
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
        />
      </Box>

      <Box>
        <Text mb={1}>Valor</Text>
        <NumericFormat
          customInput={Input}
          thousandSeparator="."
          decimalSeparator=","
          prefix="R$ "
          decimalScale={2}
          fixedDecimalScale
          allowNegative={false}
          value={valor}
          onValueChange={(values) =>
            setValor(values.floatValue || 0)
          }
        />
      </Box>

      <Button
        colorPalette="blue"
        onClick={salvar}
        w={{ base: "100%", md: "auto" }}
      >
        Salvar Transação
      </Button>

      <Mensagem
        titulo={mensagem.titulo}
        tipo={mensagem.tipo as any}
        aberto={mensagem.aberto}
        onFechar={() =>
          setMensagem({ ...mensagem, aberto: false })
        }
      />
    </VStack>

  )
}