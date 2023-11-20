using superMarket.Models;

namespace superMarket.Services
{
    public interface IProductsServices
    {
        List<Products> Get();
        Products Get(string id);
        Products Add (Products product);
        void Edit (string id,Products product);
        void Delete (string id);
        
    }
}
