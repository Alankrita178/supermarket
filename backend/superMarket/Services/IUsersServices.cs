using MongoDB.Driver;
using superMarket.Models;
namespace superMarket.Services
{
    public interface IUsersServices
    {
        List<Users> Get();
        Users GetById(string id);
        Users Create(string id,Users users);

        void Update(string userId,Users users);
        void Delete(string id);
        Task<Users> Register(Users users);
        Task<Users> Login(string email, string password);
        public Task AddToCart(string userId, Products product);
        Task<List<Products>> GetUserCart(string userId);

        void RemoveProductFromCart(string userId, string  productId);
       

        //Task UpdateQuantity(string userId, string productId);
    }
}
