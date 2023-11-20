namespace superMarket.Models
{
    public class SuperMarketDatabaseSettings : ISuperMarketDatabaseSettings
    {
       public string ProductsCollectionName { get; set; } = String.Empty;
       public string CartCollectionName { get; set; } = String.Empty;
        public string UsersCollectionName { get; set; } = String.Empty;
        public string ConnectionString { get; set; } = String.Empty;
       public string DatabaseName { get; set; } = String.Empty;

    }
}
