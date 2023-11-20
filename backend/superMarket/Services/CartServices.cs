using superMarket.Models;
using MongoDB.Driver;
using System.Linq;

namespace superMarket.Services
{
    public class CartServices : ICartServices
    {
        private readonly IMongoCollection<Cart> _cart;

        public CartServices(ISuperMarketDatabaseSettings settings, IMongoClient mongoClient)
        {
            var database = mongoClient.GetDatabase(settings.DatabaseName);
            _cart = database.GetCollection<Cart>(settings.CartCollectionName);
        }

        public Cart AddItem(string id, Products product)
        {
            var cart = _cart.Find(c => c.custId == id).FirstOrDefault();

            if (cart == null)
            {
                cart = new Cart { custId = id };
            }

            var existingItem = cart.Products.FirstOrDefault(p => p.Id == product.Id);

            if (existingItem != null)
            {
                existingItem.Quantity += product.Quantity;
            }
            else
            {
                cart.Products.Add(product);
            }

            cart.TotalAmount += product.Price * product.Quantity;

            _cart.ReplaceOne(c => c.custId == id, cart, new ReplaceOptions { IsUpsert = true });

            return cart;
        }

        public Cart Get(string id)
        {
            return _cart.Find(c => c.custId == id).FirstOrDefault();
        }



        public Cart RemoveItem(string id, Products product)
        {
            var cart = _cart.Find(c => c.custId == id).FirstOrDefault();

            if (cart != null)
            {
                var existingItem = cart.Products.FirstOrDefault(p => p.Id == product.Id);

                if (existingItem != null)
                {
                    if (existingItem.Quantity > product.Quantity)
                    {
                        existingItem.Quantity -= product.Quantity;
                        cart.TotalAmount -= product.Price * product.Quantity;
                    }
                    else
                    {
                        cart.Products.Remove(existingItem);
                        cart.TotalAmount -= product.Price * existingItem.Quantity;
                    }

                    // update the cart in the database
                    _cart.ReplaceOne(c => c.custId == id, cart, new ReplaceOptions { IsUpsert = true });

                    return cart;
                }
                else
                {
                    // item not found in cart
                    return null;
                }
            }
            else
            {
                // cart not found for customer
                return null;
            }
        }



        public List<Cart> Get()
        {
            return _cart.Find(product => true).ToList();
        }
    }
}
