using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using superMarket.Models;
using superMarket.Services;

namespace superMarket.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductsServices superMarketService;

        public ProductsController(IProductsServices superMarketService) {
            this.superMarketService = superMarketService;
        }
        // GET: api/<SuperMarketController>
        [HttpGet]
        public ActionResult<List<Products>> Get()
        {
            return superMarketService.Get();
        }

        // GET api/<SuperMarketController>/5
        [HttpGet("{id}")]
        public ActionResult<Products> Get(string id)
        {
            var product = superMarketService.Get(id);
            if(product == null)
            {
                return NotFound($"Product with Id = {id} not found");
            }
            return product;
        }

        // POST api/<SuperMarketController>
        [HttpPost]
        public ActionResult<Products> Post([FromBody] Products product)
        { 
            product.Id = ObjectId.GenerateNewId().ToString();
            superMarketService.Add(product);
            return CreatedAtAction(nameof(Get), new {id = product.Id},product);
        }

        // PUT api/<SuperMarketController>/5
        [HttpPut("{id}")]
        public ActionResult Put(string id, [FromBody] Products product)
        {
            var existingProduct = superMarketService.Get(id);
            if(existingProduct == null)
            {
                return NotFound($"Product with Id = {id} not found");
            }

            superMarketService.Edit(id, product);
            return NoContent();
        }

        // DELETE api/<SuperMarketController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            var product = superMarketService.Get(id);
            if (product == null)
            {
                return NotFound($"Product with Id = {id} not found");
            }
            superMarketService.Delete(product.Id);
            return Ok($"Product with Id = {id} deleted");        
            }
    }
}
