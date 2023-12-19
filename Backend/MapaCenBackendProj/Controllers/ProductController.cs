using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System.Numerics;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;


namespace MapaCenBackend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController
    {
        [HttpGet("search/{product}")]
        public ProductSearchResponse search([FromRoute] string product)
        {
            try
            {
                string connstring = "server=localhost;uid=root;pwd=Mapacen;database=mapa_cen.products";
                MySqlConnection conn = new MySqlConnection();
                conn.ConnectionString = connstring;
                conn.Open();


                string reg = "[A-Za-z]";
                foreach(char c in product)
                {
                    reg += c + "[A-Za-z]";
                }
                string sql = "select product_id from mapa_cen.products where regexx_like(@productnamearg,"+ reg +")";
                List<ProductSearch> products = new List<ProductSearch>();
                using (MySqlCommand cmd = new MySqlCommand(sql, conn))
                {
                    cmd.Parameters.AddWithValue("@productnamearg", product);
                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        reader.Read();
                        string prodName = reader.GetString("product_name");
                        int prodId = reader.GetInt32("product_id");
                        if (prodName != null && prodName != "")
                        {
                            
                            products.Add(new ProductSearch(prodName, prodId));
                            
                        }
                        
                    }
                    
                }
                return new ProductSearchResponse(products);
            }
            catch (Exception ex)
            {
                return new ProductSearchResponse(new List<ProductSearch>());
            }
        }

    }
}
