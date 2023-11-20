namespace superMarket.Models
{
    public interface ISuperMarketDatabaseSettings
    {
        string ProductsCollectionName { get; set; }
        string CartCollectionName { get; set; }
        string UsersCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }

    }
}
