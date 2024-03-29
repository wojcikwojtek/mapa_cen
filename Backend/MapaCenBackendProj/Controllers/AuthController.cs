﻿using MapaCenBackend.DTO;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;


namespace MapaCenBackend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController
    {
        [HttpPost("login")]
        public AuthResponse login([FromBody] LoginRequest loginRequest)
        {
            try
            {
                
                string connstring = "server=localhost;uid=root;pwd=Mapacen123;database=mapa_cen";
                MySqlConnection conn = new MySqlConnection();
                conn.ConnectionString = connstring;
                conn.Open();
                string sql = "select user_id, username, password, id_regionu, is_admin from users where username = @usernamearg";
                using (MySqlCommand cmd = new MySqlCommand(sql, conn))
                {
                    cmd.Parameters.AddWithValue("@usernamearg", loginRequest.username);
                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        reader.Read();
                        int userId = int.Parse(reader.GetString("user_id"));
                        string usrnm = reader.GetString("username");
                        string paswd = reader.GetString("password");
                        bool isAdmin = bool.Parse(reader.GetString("is_admin"));
                        int idRegionu = reader.GetString("id_regionu") == null ? 0 : int.Parse(reader.GetString("id_regionu"));
                        if (usrnm != null && usrnm != "")
                        {
                            if (loginRequest.password == paswd)
                            {
                                conn.Close();
                                return new AuthResponse(userId,loginRequest.username, true, idRegionu, isAdmin);
                            }
                        }
                        conn.Close();
                        return new AuthResponse(userId, loginRequest.username, false, idRegionu, false);
                    }
                }
            }
            catch (Exception ex)
            {
                return new AuthResponse(-1,loginRequest.username, false, 0, false);
            }
        }

        [HttpPost("register")]
        public void register([FromBody] RegisterDto registerDto)
        {
            try
            {
                string connstring = "server=localhost;uid=root;pwd=Mapacen123;database=mapa_cen";
                MySqlConnection conn = new MySqlConnection();
                conn.ConnectionString = connstring;
                conn.Open();
                string sql = "insert into users(username, email, password, is_admin) values(@usernamearg, @emailarg, @passwordarg, 0)";
                using (MySqlCommand cmd = new MySqlCommand(sql, conn))
                {
                    // Parametry dla zabezpieczenia przed atakami SQL injection
                    cmd.Parameters.AddWithValue("@usernamearg", registerDto.getUsername());
                    cmd.Parameters.AddWithValue("@emailarg", registerDto.getEmail());
                    cmd.Parameters.AddWithValue("@passwordarg", registerDto.getPassword());

                    // Wykonaj zapytanie
                    cmd.ExecuteNonQuery();
                }
                conn.Close();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Failed to insert to mysql db");
            }
        }
    }
}
