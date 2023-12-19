using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using Org.BouncyCastle.Ocsp;
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
                string connstring = "server=localhost;uid=root;pwd=Mapacen;database=mapa_cen";
                MySqlConnection conn = new MySqlConnection();
                conn.ConnectionString = connstring;
                conn.Open();

                /*
                string reg = "[A-Za-z]*";
                foreach(char c in product)
                {
                    reg += c + "[A-Za-z]*";
                }
                */
                //string sql = "select product_id from mapa_cen.products where regexp_like(@productnamearg,"+ reg +")";
                string sql = "select product_id, product_name from products where product_name like @productnamearg";
                List<ProductSearch> products = new List<ProductSearch>();
                using (MySqlCommand cmd = new MySqlCommand(sql, conn))
                {
                    cmd.Parameters.AddWithValue("@productnamearg", product);
                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            string prodName = reader.GetString("product_name");
                            int prodId = int.Parse(reader.GetString("product_id"));
                            if (prodName != null && prodName != "")
                            {

                                products.Add(new ProductSearch(prodName, prodId));

                            }
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
