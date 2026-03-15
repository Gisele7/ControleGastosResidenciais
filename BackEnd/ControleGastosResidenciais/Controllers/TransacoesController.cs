using ControleGastosResidenciais.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class TransacoesController : ControllerBase
{
    private readonly ControleGastosContext _context;

    public TransacoesController(ControleGastosContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Lista todas as transações cadastradas
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Transacao>>> GetTransacoes()
    {
        var transacoes = await _context.Transacoes
            .Include(t => t.Trpessoa)
            .Include(t => t.Trcategoria)
            .ToListAsync();

        return Ok(transacoes);
    }

    /// <summary>
    /// Cria uma nova transação
    /// </summary>
    [HttpPost]
    public async Task<ActionResult> PostTransacao(Transacao transacao)
    {
        // 1️⃣ Verifica se a pessoa existe
        var pessoa = await _context.Pessoas.FindAsync(transacao.TrpessoaId);

        if (pessoa == null)
            return BadRequest("Pessoa não encontrada.");

        // 2️⃣ Verifica se a categoria existe
        var categoria = await _context.Categorias.FindAsync(transacao.TrcategoriaId);

        if (categoria == null)
            return BadRequest("Categoria não encontrada.");

        // 3️⃣ Regra: menor de idade só pode despesa
        if (pessoa.Peidade < 18 && transacao.Trtipo == "Receita")
        {
            return BadRequest("Menores de idade só podem registrar despesas.");
        }

        // 4️⃣ Regra: categoria precisa permitir o tipo da transação
        if (transacao.Trtipo == "Despesa" && categoria.Cafinalidade == "Receita")
        {
            return BadRequest("Categoria não permite despesa.");
        }

        if (transacao.Trtipo == "Receita" && categoria.Cafinalidade == "Despesa")
        {
            return BadRequest("Categoria não permite receita.");
        }

        // 5️⃣ Valor positivo
        if (transacao.Trvalor <= 0)
        {
            return BadRequest("Valor deve ser maior que zero.");
        }

        _context.Transacoes.Add(transacao);
        await _context.SaveChangesAsync();

        return Created("", transacao);
    }

    [HttpGet("totais-por-pessoa")]
    public async Task<IActionResult> TotaisPorPessoa()
    {
        var transacoes = await _context.Transacoes
            .Include(t => t.Trpessoa)
            .Include(t => t.Trcategoria)
            .ToListAsync();

        var pessoas = await _context.Pessoas.ToListAsync();

        var resultado = pessoas.Select(p =>
        {
            var receitas = transacoes
                .Where(t => t.TrpessoaId == p.Peid && t.Trtipo == "Receita")
                .Sum(t => t.Trvalor);

            var despesas = transacoes
                .Where(t => t.TrpessoaId == p.Peid && t.Trtipo == "Despesa")
                .Sum(t => t.Trvalor);

            return new
            {
                pessoa = p,
                totalReceitas = receitas,
                totalDespesas = despesas,
                saldo = receitas - despesas
            };
        }).ToList();

        var totalGeral = new
        {
            totalReceitas = resultado.Sum(r => r.totalReceitas),
            totalDespesas = resultado.Sum(r => r.totalDespesas),
            saldo = resultado.Sum(r => r.saldo)
        };

        return Ok(new { porPessoa = resultado, totalGeral });
    }

    [HttpGet("totais-por-categoria")]
    public async Task<IActionResult> TotaisPorCategoria()
    {
        var categorias = await _context.Categorias
            .Include(c => c.Transacoes)
            .ToListAsync();

        var porCategoria = categorias
            .Select(c => new
            {
                categoria = new
                {
                    c.Caid,
                    c.Cadescricao
                },

                totalReceitas = c.Transacoes
                    .Where(t => t.Trtipo == "Receita")
                    .Sum(t => (decimal?)t.Trvalor) ?? 0,

                totalDespesas = c.Transacoes
                    .Where(t => t.Trtipo == "Despesa")
                    .Sum(t => (decimal?)t.Trvalor) ?? 0,

                saldo =
                    (c.Transacoes.Where(t => t.Trtipo == "Receita").Sum(t => (decimal?)t.Trvalor) ?? 0)
                  - (c.Transacoes.Where(t => t.Trtipo == "Despesa").Sum(t => (decimal?)t.Trvalor) ?? 0)
            })
            .ToList();

        var totalGeral = new
        {
            totalReceitas = porCategoria.Sum(x => x.totalReceitas),
            totalDespesas = porCategoria.Sum(x => x.totalDespesas),
            saldo = porCategoria.Sum(x => x.saldo)
        };

        return Ok(new { porCategoria, totalGeral });
    }

}