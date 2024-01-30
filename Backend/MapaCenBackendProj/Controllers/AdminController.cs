using MapaCenBackend.DTO;
using MapaCenBackend.Entities;
using MapaCenBackend.Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using MySql.Data.MySqlClient;
using Org.BouncyCastle.Ocsp;
using System;
using System.Collections.Generic;
using System.Data;
using System.Drawing;
using System.Numerics;
using System.Text.RegularExpressions;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace MapaCenBackend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AdminController
    {
        [HttpPost("addProduct")]
        public void addProduct([FromForm]AddProductRequest addProductRequest)
        {
            try
            {
                string relativePath = addProductRequest.product_name + ".jpg";
                if (addProductRequest.file != null)
                {
                    string path = System.IO.Directory.GetCurrentDirectory() + """\ProductsImages\""" +  relativePath;
                    using (Stream stream = new FileStream(path, FileMode.Create))
                    {
                        addProductRequest.file.CopyTo(stream);
                    }
                }
                
                
                string connstring = "server=localhost;uid=root;pwd=Mapacen123;database=mapa_cen";
                MySqlConnection conn = new MySqlConnection();
                conn.ConnectionString = connstring;
                conn.Open();
                string sql = "insert into products(product_name, category_id, picture) values(@product_name, @category_id, @picture);";
                using (MySqlCommand cmd = new MySqlCommand(sql, conn))
                {
                    cmd.Parameters.AddWithValue("@product_name", addProductRequest.product_name);
                    cmd.Parameters.AddWithValue("@category_id", addProductRequest.category_id);
                    cmd.Parameters.AddWithValue("@picture", addProductRequest.file != null? relativePath:"");
                    cmd.ExecuteNonQuery();
                }
            } catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
        [HttpPost("editProduct")]
        public void editProduct([FromBody] EditProductRequest editProductRequest)
        {
            try
            {
                string connstring = "server=localhost;uid=root;pwd=Mapacen123;database=mapa_cen";
                MySqlConnection conn = new MySqlConnection();
                conn.ConnectionString = connstring;
                conn.Open();
                string sql = "update products set product_name=@product_name, category_id=@category_id, picture=@picture where product_id=@product_id;";
                using (MySqlCommand cmd = new MySqlCommand(sql, conn))
                {
                    cmd.Parameters.AddWithValue("@product_name", editProductRequest.product_name);
                    cmd.Parameters.AddWithValue("@category_id", editProductRequest.category_id);
                    cmd.Parameters.AddWithValue("@picture", editProductRequest.picture);
                    cmd.Parameters.AddWithValue("@product_id", editProductRequest.id);
                    cmd.ExecuteNonQuery();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
        [HttpGet("deleteProduct")]
        public void deleteProduct(int product_id)
        {
            try
            {
                string connstring = "server=localhost;uid=root;pwd=Mapacen123;database=mapa_cen";
                MySqlConnection conn = new MySqlConnection();
                conn.ConnectionString = connstring;
                conn.Open();
                string sql = "delete from products where product_id = @product_id";
                using (MySqlCommand cmd = new MySqlCommand(sql, conn))
                {
                    cmd.Parameters.AddWithValue("@product_id", product_id);
                    cmd.ExecuteNonQuery();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
    }
}
