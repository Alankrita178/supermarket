using MongoDB.Bson;
using MongoDB.Driver;
using superMarket.Models;
using System.Linq;
namespace superMarket.Services
{
    public class UsersServices : IUsersServices
    {
        private readonly IMongoCollection<Users> _users;

        public UsersServices(ISuperMarketDatabaseSettings settings, IMongoClient mongoClient)
        {
            var database = mongoClient.GetDatabase(settings.DatabaseName);
            _users = database.GetCollection<Users>(settings.UsersCollectionName);

        }
        public Users Create(string id, Users users)
        {
            _users.InsertOne(users);
            return users;
        }
        public void Delete(string id)
        {
            _users.DeleteOne(users => users.Id == id);

        }
        public void Update(string id, Users users)
        {
            users.Id = id;
            _users.ReplaceOne(users => users.Id == id, users);
        }
        public List<Users> Get()
        {
            return _users.Find(users => true).ToList(); 
        }

        public Users GetById(string id)
        {
            return _users.Find(users => users.Id == id).FirstOrDefault();
        }
        public async Task<Users> Register(Users users)
        {
            users.Cart.RemoveAt(0);
            users.Password = BCrypt.Net.BCrypt.HashPassword(users.Password);
            await _users.InsertOneAsync(users);
            return users;
        }

        public async Task AddToCart(string userId, Products product)
        {
            var filter = Builders<Users>.Filter.Eq(u => u.Id, userId);
            var update = Builders<Users>.Update.Push(u => u.Cart, product);

            await _users.UpdateOneAsync(filter, update);
        }

        public async Task<List<Products>> GetUserCart(string userId)
        {
            var user = await _users.Find(u => u.Id == userId).FirstOrDefaultAsync();
            return user.Cart;
        }

        public void RemoveProductFromCart(string userId, string productId) 
        {
            var user = _users.AsQueryable()
                .FirstOrDefault(u => u.Id == userId);

            if(user != null)
            {
                var productToRemove = user.Cart.FirstOrDefault(a => a.Id == productId);

                if(productToRemove != null)
                {
                    user.Cart.Remove(productToRemove);
                    _users.ReplaceOne(u => u.Id == userId, user);
                }
            }
        }
        


        public async Task<Users> Login(string email, string password)
        {
            var user = await _users.Find(user => user.Email == email).FirstOrDefaultAsync();
            if(user != null && BCrypt.Net.BCrypt.Verify(password,user.Password))
            {
                return user;
            }
            return null;
        }

    }
}
