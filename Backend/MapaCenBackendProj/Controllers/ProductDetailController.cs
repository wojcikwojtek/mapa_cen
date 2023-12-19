using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using Org.BouncyCastle.Utilities;
using System.Diagnostics;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;


namespace MapaCenBackend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductDetailController
    {
        [HttpGet("products/{productId}")]
        public AuthResponse productDetails([FromRoute] int productId)
        {
            try
            {
                string connstring = "server=localhost;uid=root;pwd=Mapacen;database=mapa_cen";
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
                        List<Price> prices = new List<Price>();
                        sql = "select * from prices where product_id = @product_id";
                        reader.Close();
                        using(MySqlCommand cmd1 = new MySqlCommand(sql, conn))
                        {
                            cmd1.Parameters.AddWithValue("@product_id", product_id);
                            using (MySqlDataReader reader1 = cmd1.ExecuteReader())
                            {
                                while (reader1.Read())
                                {
                                    int price_id = int.Parse(reader1.GetString("price_id"));
                                    int product_id_fk = int.Parse(reader1.GetString("product_id"));
                                    string shop_address = reader1.GetString("shop_address");
                                    string price_date = reader1.GetString("date");
                                    sql = "select * from comments where price_id = @price_id";
                                    List<Comment> comments = new List<Comment>();
                                    MySqlConnection conn1 = new MySqlConnection();
                                    conn1.ConnectionString = connstring;
                                    conn1.Open();
                                    using (MySqlCommand cmd2 = new MySqlCommand(sql, conn1))
                                    {
                                        cmd2.Parameters.AddWithValue("@price_id", price_id);
                                        using(MySqlDataReader commentReader = cmd2.ExecuteReader())
                                        {
                                            while(commentReader.Read())
                                            {
                                                int comment_id = int.Parse(commentReader.GetString("comment_id"));
                                                int c_price_id = int.Parse(commentReader.GetString("price_id"));
                                                int c_user_id = int.Parse(commentReader.GetString("user_id"));
                                                string c_date = commentReader.GetString("date");
                                                string content = commentReader.GetString("content");
                                                string c_picture = commentReader.GetString("picture");
                                                Comment comment = new Comment(comment_id, c_price_id, c_user_id, c_date, content, c_picture);
                                                comments.Add(comment);
                                            }
                                        }
                                    }
                                    sql = "select * from ratings where price_id = @price_id";
                                    List<Rating> ratings = new List<Rating>();
                                    using(MySqlCommand cmd2 = new MySqlCommand(sql, conn1))
                                    {
                                        cmd2.Parameters.AddWithValue("@price_id", price_id);
                                        using(MySqlDataReader ratingReader = cmd2.ExecuteReader())
                                        {
                                            while(ratingReader.Read())
                                            {
                                                int rating_id = int.Parse(ratingReader.GetString("rating_id"));
                                                int r_price_id = int.Parse(ratingReader.GetString("price_id"));
                                                int r_user_id = int.Parse (ratingReader.GetString("user_id"));
                                                bool is_positive = Convert.ToBoolean(int.Parse(ratingReader.GetString("is_positive")));
                                                Rating rating = new Rating(rating_id, r_price_id, r_user_id, is_positive);
                                                ratings.Add(rating);
                                            }
                                        }
                                    }
                                    Price price = new Price(price_id, product_id_fk, shop_address, price_date, ratings, comments);
                                    prices.Add(price);
                                }
                            }
                        }
                        return new AuthResponse(product_name, true);
                    }
                }
            }
            catch (Exception ex)
            {
                return new AuthResponse("dupa", false);
            }
        }
    }
}
