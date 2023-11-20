using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace superMarket.Models
{
    [BsonIgnoreExtraElements]
    public class Products
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;

        [BsonElement("name")]
        public string Name { get; set; } = string.Empty;

        [BsonElement("description")]
        public string Description { get; set; }

        [BsonElement("category")]
        public string Category { get; set; }

        [BsonElement("price")]
        public int Price { get; set; }

        [BsonElement("stockqty")]
        public int StockQty { get; set;}

        [BsonElement("quantity")]
        public int Quantity { get; set;}

        [BsonElement("image")]
        public string Image { get; set; }
    }
}
