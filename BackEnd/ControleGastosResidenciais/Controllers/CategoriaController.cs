using ControleGastosResidenciais.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class CategoriasController : ControllerBase
{
    private readonly ControleGastosContext _context;

    public CategoriasController(ControleGastosContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Lista todas as categorias cadastradas no sistema. Retorna um status de "OK" com a lista de categorias. Cada categoria inclui informações como descrição e finalidade (despesa, receita ou ambas).
    /// </summary>
    /// <returns></returns>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Categoria>>> GetCategorias()
    {
        var categorias = await _context.Categorias.ToListAsync();
        return Ok(categorias);
    }

    /// <summary>
    /// Cadastra uma nova categoria no sistema. Recebe os dados da categoria no corpo da requisição e, se a criação for bem sucedida, retorna um status de "Created" com os detalhes da categoria criada. 
    /// A finalidade da categoria deve ser "Despesa", "Receita" ou "Ambas". Se a finalidade fornecida for inválida, retorna um status de "Bad Request" com uma mensagem de erro explicando o problema.
    /// </summary>
    /// <param name="categoria"></param>
    /// <returns></returns>
    [HttpPost]
    public async Task<ActionResult<Categoria>> PostCategoria(Categoria categoria)
        {
        // Validação simples da finalidade
        var finalidadesValidas = new[] { "Despesa", "Receita", "Ambas" };

        if (!finalidadesValidas.Contains(categoria.Cafinalidade))
        {
            return BadRequest("Finalidade deve ser: Despesa, Receita ou Ambas.");
        }

        _context.Categorias.Add(categoria);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetCategorias), new { id = categoria.Caid }, categoria);
    }
}