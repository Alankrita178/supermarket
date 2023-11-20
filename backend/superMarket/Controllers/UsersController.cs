using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using superMarket.Models;
using superMarket.Services;
using MongoDB.Driver.Linq;
using System.Security.Claims;

namespace superMarket.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUsersServices UsersService;

        public UsersController(IUsersServices UsersService)
        {
            this.UsersService = UsersService;
        }

        /*[HttpGet]
        public ActionResult<List<Users>> Get()
        {
            return UsersService.Get();
        } */

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register(Users users)
        {
            users.Id = ObjectId.GenerateNewId().ToString();
            var registeredUser = await UsersService.Register(users);
            return Ok(registeredUser);
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(Users users)
        {
            var loginUser = await UsersService.Login(users.Email, users.Password);
            if (loginUser == null)
            {
                return Unauthorized();
            }
            else
            {
                return Ok(loginUser);
            }
        }

        [HttpPost("{userId}/cart")]
        public async Task<IActionResult> AddToCart(string userId, [FromBody] Products product)
        {
            await UsersService.AddToCart(userId, product);

            return Ok();
        }

        //[HttpGet]
        //public ActionResult<List<Users>> Get()
        //{
            //return UsersService.Get();
        //}

        // GET api/<SuperMarketController>/5
        [HttpGet("{id}/cart")]
        public async Task<IActionResult> GetUserCart(string id)
        {
            var cart = await UsersService.GetUserCart(id);
            return Ok(cart);
        }

        [HttpPut("{id}")]
        public ActionResult Put(string id, [FromBody] Users users) 
        {
            var existingCustomer = UsersService.GetById(id);
            if(existingCustomer == null)
            {
                return NotFound($"User id:{id} not found");
            }
            UsersService.Update(id, users);
            return NoContent();
        }


        [HttpDelete("{userId}/cart/{productId}")]
        public IActionResult RemoveProductFromCart(string userId,string productId)
        {
            try
            {
                UsersService.RemoveProductFromCart(userId, productId);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error removing product from cart : {ex.Message}");
            }
        }

       

    }
}
