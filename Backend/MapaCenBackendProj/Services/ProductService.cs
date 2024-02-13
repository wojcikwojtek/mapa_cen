using MapaCenBackend.Entities;
using MySql.Data.MySqlClient;

namespace MapaCenBackend.Services
{
    public class ProductService
    {
        private PriceService priceService;
        public ProductService(PriceService priceService) 
        {
            this.priceService = priceService;
        }
        public Product selectProduct(int productId)
        {
            string connstring = "server=localhost;uid=root;pwd=Mapacen123;database=mapa_cen";
            MySqlConnection conn = new MySqlConnection();
            conn.ConnectionString = connstring;
            conn.Open();
            string sql = "select * from products where product_id = @productarg";
            using (MySqlCommand cmd = new MySqlCommand(sql, conn))
            {
                cmd.Parameters.AddWithValue("@productarg", productId);
                using (MySqlDataReader reader = cmd.ExecuteReader())
                {
                    reader.Read();
                    int product_id = int.Parse(reader.GetString("product_id"));
                    string product_name = reader.GetString("product_name");
                    int category_id = int.Parse(reader.GetString("category_id"));
                    string picture = reader.GetString("picture");
                    List<Price> prices = priceService.selectPrices(productId);
                    Product product = new Product(product_id, product_name, category_id, picture, prices);
                    conn.Close();
                    return product;
                }
            }
        }
    }
}
