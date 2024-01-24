using MapaCenBackend.DTO;
using MapaCenBackend.Entities;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using Org.BouncyCastle.Ocsp;
using System;
using System.Collections.Generic;
using System.Data;
using System.Numerics;
using System.Text.RegularExpressions;
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
                string forReg = "[A-Za-z]*";
                foreach(char c in product)
                {
                    forReg += c + "[A-Za-z]*";
                }
                Regex reg = new Regex(forReg, RegexOptions.IgnoreCase | RegexOptions.IgnorePatternWhitespace);
                string connstring = "server=localhost;uid=root;pwd=Mapacen123;database=mapa_cen";
                MySqlConnection conn = new MySqlConnection();
                conn.ConnectionString = connstring;
                conn.Open();

                string sql = "select product_id, product_name from products";
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
                                if( reg.IsMatch(prodName) )
                                {
                                    products.Add(new ProductSearch(prodName, prodId));
                                }
                                

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

        [HttpPost("addPrice")]
        public void addPrice([FromBody] AddPriceRequest addPriceRequest)
        {
            try
            {
                DateTime currentDT = DateTime.Now;
                string curretnDateTime = currentDT.ToString("yyyy-MM-dd HH:mm:ss");
                string connstring = "server=localhost;uid=root;pwd=Mapacen123;database=mapa_cen";
                MySqlConnection conn = new MySqlConnection();
                conn.ConnectionString = connstring;
                conn.Open();
                string sql = "insert into prices(product_id, shop_address, date, price_value, region_id) values(@product_id_arg, @address_arg, @datetime_arg, @price_value_arg, @region_id_arg);";
                using (MySqlCommand cmd = new MySqlCommand(sql, conn))
                {
                    cmd.Parameters.AddWithValue("@product_id_arg", addPriceRequest.productId );
                    cmd.Parameters.AddWithValue("@address_arg", addPriceRequest.shopAddress );
                    cmd.Parameters.AddWithValue("@datetime_arg", curretnDateTime );
                    cmd.Parameters.AddWithValue("@price_value_arg", addPriceRequest.priceValue );
                    cmd.Parameters.AddWithValue("@region_id_arg", addPriceRequest.regionId );
                    cmd.ExecuteNonQuery();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Failed to insert to mysql db");
            }
            
        }

        [HttpPost("addComment")]
        public void addComment([FromForm] AddCommentRequest addCommentRequest)
        {


            try
            {
                string path = Path.Combine(@"C:\MyImages", "nowyImage2.jpg");
                using (Stream stream = new FileStream(path, FileMode.Create))
                {
                    addCommentRequest.file.CopyTo(stream);
                }


                DateTime currentDT = DateTime.Now;
                
                string curretnDateTime = currentDT.ToString("yyyy-MM-dd HH:mm:ss");
                string connstring = "server=localhost;uid=root;pwd=Mapacen123;database=mapa_cen";
                MySqlConnection conn = new MySqlConnection();
                conn.ConnectionString = connstring;
                conn.Open();
                string sql = "insert into comments(price_id, user_id, date, content) values(@price_id_arg , @user_id_arg , @datetime_arg, @content_arg);";
                using (MySqlCommand cmd = new MySqlCommand(sql, conn))
                {
                    cmd.Parameters.AddWithValue("@price_id_arg", addCommentRequest.priceId);
                    cmd.Parameters.AddWithValue("@user_id_arg", addCommentRequest.userId);
                    cmd.Parameters.AddWithValue("@datetime_arg", curretnDateTime);
                    cmd.Parameters.AddWithValue("@content_arg", addCommentRequest.content);
                    cmd.ExecuteNonQuery();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Failed to insert to mysql db");
            }

        }

        [HttpPost("updateRating")]
        public bool updateRating([FromBody] UpdateRatingRequest updateRatingRequest)
        {
            try
            {
                string connstring = "server=localhost;uid=root;pwd=Mapacen123;database=mapa_cen";
                MySqlConnection conn = new MySqlConnection();
                conn.ConnectionString = connstring;
                conn.Open();
                string sql = "select * from ratings where user_id = @user_id_arg and price_id = @price_id_arg";
                
                using (MySqlCommand cmd = new MySqlCommand(sql, conn))
                {
                    cmd.Parameters.AddWithValue("@user_id_arg", updateRatingRequest.userId);
                    cmd.Parameters.AddWithValue("@price_id_arg", updateRatingRequest.priceId);
                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            bool isPositiveDB = reader.GetString("is_positive") == "1";
                            string connstring2 = "server=localhost;uid=root;pwd=Mapacen123;database=mapa_cen";
                            MySqlConnection conn2 = new MySqlConnection();
                            conn2.ConnectionString = connstring2;
                            conn2.Open();
                            
                            if ( isPositiveDB != updateRatingRequest.positive )
                            {
                                
                                string sql2 = "update ratings set is_positive = @is_positive_arg where ratings.price_id = @price_id_arg and ratings.user_id=@user_id_arg ;";
                                using (MySqlCommand cmd2 = new MySqlCommand(sql2, conn2))
                                {
                                    cmd2.Parameters.AddWithValue("@price_id_arg", updateRatingRequest.priceId);
                                    cmd2.Parameters.AddWithValue("@user_id_arg", updateRatingRequest.userId);
                                    cmd2.Parameters.AddWithValue("@is_positive_arg", updateRatingRequest.positive);
                                    cmd2.ExecuteNonQuery();
                                }
                                return true;
                            }
                            else
                            {
                                string sql2 = "delete from ratings where ratings.price_id = @price_id_arg and ratings.user_id=@user_id_arg ;";
                                using (MySqlCommand cmd2 = new MySqlCommand(sql2, conn2))
                                {
                                    cmd2.Parameters.AddWithValue("@price_id_arg", updateRatingRequest.priceId);
                                    cmd2.Parameters.AddWithValue("@user_id_arg", updateRatingRequest.userId);
                                    cmd2.ExecuteNonQuery();
                                }
                                return false;
                            }
                        }
                        else
                        {
                            string connstring2 = "server=localhost;uid=root;pwd=Mapacen123;database=mapa_cen";
                            MySqlConnection conn2 = new MySqlConnection();
                            conn2.ConnectionString = connstring2;
                            conn2.Open();
                            string sql2 = "insert into ratings(price_id, user_id, is_positive) values(@price_id_arg, @user_id_arg, @is_positive_arg);";
                            using (MySqlCommand cmd2 = new MySqlCommand(sql2, conn2))
                            {
                                cmd2.Parameters.AddWithValue("@price_id_arg", updateRatingRequest.priceId);
                                cmd2.Parameters.AddWithValue("@user_id_arg", updateRatingRequest.userId);
                                cmd2.Parameters.AddWithValue("@is_positive_arg", updateRatingRequest.positive);
                                cmd2.ExecuteNonQuery();
                            }
                            return true;
                        }
                    }

                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Failed to insert to mysql db");
                return false;
            }

        }

        [HttpGet("showMostPopularProducts")]
        public ProductSearchResponse showMostPopularProducts()
        {
            try
            {
                
                string connstring = "server=localhost;uid=root;pwd=Mapacen123;database=mapa_cen";
                MySqlConnection conn = new MySqlConnection();
                conn.ConnectionString = connstring;
                conn.Open();

                string sql = "select products.product_id, products.product_name from products join prices on products.product_id = prices.product_id group by products.product_id order by count(prices.price_id) limit 10";
                List<ProductSearch> products = new List<ProductSearch>();
                using (MySqlCommand cmd = new MySqlCommand(sql, conn))
                {
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
