using ControleGastosResidenciais.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ControleGastosResidenciais.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : Controller
    {

        private readonly ControleGastosContext _context;

        public DashboardController(ControleGastosContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetDashboard()
        {
            var transacoes = await _context.Transacoes
                .Include(t => t.Trpessoa)
                .Include(t => t.Trcategoria)
                .OrderByDescending(t => t.Trdata)
                .ToListAsync();

            var totalReceitas = transacoes
                .Where(t => t.Trtipo == "Receita")
                .Sum(t => t.Trvalor);

            var totalDespesas = transacoes
                .Where(t => t.Trtipo == "Despesa")
                .Sum(t => t.Trvalor);

            var saldo = totalReceitas - totalDespesas;

            var ultimasTransacoes = transacoes
                .Take(5)
                .Select(t => new
                {
                    descricao = t.Trdescricao,
                    pessoa = t.Trpessoa.Penome,
                    categoria = t.Trcategoria.Cadescricao,
                    tipo = t.Trtipo,
                    valor = t.Trvalor,
                    data = t.Trdata
                });

            return Ok(new
            {
                saldo,
                totalReceitas,
                totalDespesas,
                ultimasTransacoes
            });
        }
    }
}
