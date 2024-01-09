using MapaCenBackend.DTO;
using MapaCenBackend.Entities;
using MapaCenBackend.Services;
using Microsoft.AspNetCore.Mvc;
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
    public class RegionController
    {
        [HttpGet("region")]
        public List<VoivodeshipDTO> GetVoivodeships()
        {
            string connstring = "server=localhost;uid=root;pwd=Mapacen123;database=mapa_cen";
            MySqlConnection conn = new MySqlConnection();
            conn.ConnectionString = connstring;
            conn.Open();
            string sql = "select * from województwa";
            List<VoivodeshipDTO> voivodeships = new List<VoivodeshipDTO>();
            using (MySqlCommand cmd = new MySqlCommand(sql, conn))
            {
                using (MySqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        int id = int.Parse(reader.GetString("id_województwa"));
                        string name = reader.GetString("nazwa");
                        if (name != null && name != "")
                        {
                            voivodeships.Add(new VoivodeshipDTO(id, name));
                        }
                    }
                }

            }
            return voivodeships;
        }

        [HttpGet("region/{voivodeshipId}")]
        public List<RegionDTO> GetRegions(int voivodeshipId)
        {
            string connstring = "server=localhost;uid=root;pwd=Mapacen123;database=mapa_cen";
            MySqlConnection conn = new MySqlConnection();
            conn.ConnectionString = connstring;
            conn.Open();
            string sql = "select id_regionu, nazwa_regionu from region where id_województwa = @voivodeshipId";
            List<RegionDTO> regions = new List<RegionDTO>();
            using (MySqlCommand cmd = new MySqlCommand(sql, conn))
            {
                cmd.Parameters.AddWithValue("@voivodeshipId", voivodeshipId);
                using (MySqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        int id = int.Parse(reader.GetString("id_regionu"));
                        string name = reader.GetString("nazwa_regionu");
                        if (name != null && name != "")
                        {
                            regions.Add(new RegionDTO(id, name));
                        }
                    }
                }

            }
            return regions;
        }

        [HttpPut("region/{regionId}/user/{userId}")]
        public void changeUserRegion(int regionId, int userId)
        {
            try
            {
                string connstring = "server=localhost;uid=root;pwd=Mapacen123;database=mapa_cen";
                MySqlConnection conn = new MySqlConnection();
                conn.ConnectionString = connstring;
                conn.Open();
                string sql = "update users set id_regionu = @regionId where user_id = @userId";
                using (MySqlCommand cmd = new MySqlCommand(sql, conn))
                {
                    cmd.Parameters.AddWithValue("@regionId", regionId);
                    cmd.Parameters.AddWithValue("@userId", userId);
                    cmd.ExecuteNonQuery();
                }
            } catch(Exception ex) 
            {
                System.Console.WriteLine(ex.Message);
            }
        }
    }
}
