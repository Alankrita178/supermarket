using superMarket.Models;
namespace superMarket.Services
{
    public interface ICartServices
    {
        List<Cart> Get();
        Cart Get(string id); 
        Cart AddItem(string id, Products product); 
        Cart RemoveItem(string id, Products product);
    }
}
