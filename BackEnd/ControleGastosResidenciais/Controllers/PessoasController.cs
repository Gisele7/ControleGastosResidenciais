using ControleGastosResidenciais.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class PessoasController : ControllerBase
{
    private readonly ControleGastosContext _context;

    public PessoasController(ControleGastosContext context)
    {
        _context = context;
    }
    /// <summary>
    /// Retorna a lista de pessoas cadastradas no sistema.
    /// </summary>
    /// <returns></returns>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Pessoa>>> GetPessoas()
    {
        return await _context.Pessoas.ToListAsync();
    }

    /// <summary>
    /// Retorna os detalhes de uma pessoa específica com base no ID fornecido. Se a pessoa não for encontrada, retorna um status de "Not Found".
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>

    [HttpGet("{id}")]
    public async Task<ActionResult<Pessoa>> GetPessoa(int id)
    {
        var pessoa = await _context.Pessoas.FindAsync(id);

        if (pessoa == null)
            return NotFound();

        return pessoa;
    }

    /// <summary>
    /// Cadastra uma nova pessoa no sistema. Recebe os dados da pessoa no corpo da requisição e, se a criação for bem sucedida, retorna um status de "Created" com os detalhes da pessoa criada.
    /// </summary>
    /// <param name="pessoa"></param>
    /// <returns></returns>

    [HttpPost]
    public async Task<ActionResult<Pessoa>> PostPessoa(Pessoa pessoa)
    {
        _context.Pessoas.Add(pessoa);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetPessoa), new { id = pessoa.Peid }, pessoa);
    }

    /// <summary>
    /// Atualiza os detalhes de uma pessoa existente com base no ID fornecido. Recebe os dados atualizados da pessoa no corpo da requisição e, 
    /// se a atualização for bem sucedida, retorna um status de "No Content". Se o ID fornecido não corresponder ao ID da pessoa, retorna um status de "Bad Request". Se a pessoa não for encontrada, retorna um status de "Not Found".
    /// </summary>
    /// <param name="id"></param>
    /// <param name="pessoa"></param>
    /// <returns></returns>

    [HttpPut("{id}")]
    public async Task<IActionResult> PutPessoa(int id, [FromBody] Pessoa pessoa)
    {
        // Busca a pessoa no banco pelo ID da URL
        var pessoaExistente = await _context.Pessoas.FindAsync(id);

        if (pessoaExistente == null)
            return NotFound("Pessoa não encontrada");

        // Atualiza só os campos que podem ser alterados
        pessoaExistente.Penome = pessoa.Penome;
        pessoaExistente.Peidade = pessoa.Peidade;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    /// <summary>
    /// Deleta uma pessoa existente com base no ID fornecido. Se a exclusão for bem sucedida, retorna um status de "No Content". 
    /// Se a pessoa não for encontrada, retorna um status de "Not Found". Ao remover uma pessoa, todas as transações associadas a essa pessoa também serão removidas devido à configuração de relacionamento no banco de dados.
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePessoa(int id)
    {
        var pessoa = await _context.Pessoas.FindAsync(id);

        if (pessoa == null)
            return NotFound();

        _context.Pessoas.Remove(pessoa);
        await _context.SaveChangesAsync();

        return NoContent();
    }



}