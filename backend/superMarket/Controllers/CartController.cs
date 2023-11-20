using superMarket.Services;
using Microsoft.AspNetCore.Mvc;
using superMarket.Models;

namespace superMarket.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ICartServices cartService;

        public CartController(ICartServices cartService)
        {
            this.cartService = cartService;
        }
        [HttpGet]
        public ActionResult<List<Cart>> Get()
        {
            var carts = cartService.Get();
            if (carts == null)
            {
                return NotFound();
            }
            return carts;
        }

        [HttpGet("{id}")]
        public ActionResult<Cart> Get(string id)
        {
            var cart = cartService.Get(id);
            if (cart == null)
            {
                return NotFound();
            }
            return cart;
        }

        [HttpPost("{id}")]
        public ActionResult<Cart> Post(string id, [FromBody] Products product)
        {
            var cart = cartService.AddItem(id, product);
            if (cart == null)
            {
                return NotFound();
            }
            return cart;
        }

        /*[HttpPut("{id}")]
        public IActionResult Put(string id, [FromBody] Cart cart)
        {
            if (cart == null)
            {
                return BadRequest();
            }

            var existingCart = cartService.Get(id);
            if (existingCart == null)
            {
                return NotFound();
            }
            cartService.Update(id, cart);
            return NoContent();
        }*/
        [HttpDelete("{id}")]
        public IActionResult Delete(string id, [FromBody] Products product)
        {
            var cart = cartService.Get(id);
            if (cart == null)
            {
                return NotFound();
            }
            cartService.RemoveItem(id, product);
            return NoContent();
        }




    }
}
