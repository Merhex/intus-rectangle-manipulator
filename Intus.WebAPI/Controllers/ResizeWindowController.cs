using Intus.WebAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Text;
using System.Text.Json;

namespace Intus.WebAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class ResizeWindowController : ControllerBase
{
    public ResizeWindowController() { }

    [HttpPost("dimensions/save")]
    public async Task<IActionResult> SaveWindowDimensions([FromBody] Rectangle rectangle) 
    {
        if (rectangle is null)
            return BadRequest("The given json file is not a rectangle.");

        var serializedJson = JsonConvert.SerializeObject(rectangle, Formatting.Indented);

        await System.IO.File.WriteAllTextAsync(@$"{AppContext.BaseDirectory}/rectangle.json", serializedJson);
        
        return Ok(serializedJson);
    }

    [HttpGet("dimensions")]
    public async Task<IActionResult> GetWindowDimension() 
    {
        using var streamReader = new StreamReader(@$"{AppContext.BaseDirectory}/rectangle.json");
        var json = await streamReader.ReadToEndAsync();

        var rectangle = JsonConvert.DeserializeObject<Rectangle>(json);
        if (rectangle is null)
            return BadRequest("The given json file is not a rectangle.");

        return Ok(rectangle);
    }
}
