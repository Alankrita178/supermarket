using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace superMarket.Models
{
    [BsonIgnoreExtraElements]
    public class Cart
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]

        [BsonElement("custid")]
        public string custId { get; set; } = string.Empty;

        [BsonElement("products")]
        public List<Products> Products { get; set; } = new List<Products>();

        [BsonElement("totalamount")]
        public int TotalAmount { get; set; }
    }
}
