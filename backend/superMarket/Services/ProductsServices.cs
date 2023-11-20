using superMarket.Models;
using MongoDB.Driver;

namespace superMarket.Services
{
    public class ProductsServices : IProductsServices
    {
        private readonly IMongoCollection<Products> _products;

        public ProductsServices(ISuperMarketDatabaseSettings settings, IMongoClient mongoClient) {
         var database = mongoClient.GetDatabase(settings.DatabaseName);
         _products = database.GetCollection<Products>(settings.ProductsCollectionName);

        }
        public Products Add(Products product)
        {
            _products.InsertOne(product);
            return product;
        }

        public void Delete(string id)
        {
            _products.DeleteOne(product => product.Id == id);

        }

        public void Edit(string id, Products product)
        {
            _products.ReplaceOne(product => product.Id == id, product);
        }

        public List<Products> Get()
        {
            return _products.Find(product => true).ToList();
        }

        public Products Get(string id)
        {
            return _products.Find(product => product.Id == id).FirstOrDefault();
        }

 
    }
}
