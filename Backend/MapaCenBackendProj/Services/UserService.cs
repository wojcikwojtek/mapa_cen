using MapaCenBackend.Entities;
using MySql.Data.MySqlClient;

namespace MapaCenBackend.Services
{
    public class UserService
    {
        public UserService() { }
        public string selectUsername(int userId)
        {
            string connstring = "server=localhost;uid=root;pwd=Mapacen123;database=mapa_cen";
            MySqlConnection conn = new MySqlConnection();
            conn.ConnectionString = connstring;
            conn.Open();
            string sql = "select username from users where user_id = @userId";
            using (MySqlCommand cmd = new MySqlCommand(sql, conn))
            {
                cmd.Parameters.AddWithValue("@userId", userId);
                using (MySqlDataReader reader = cmd.ExecuteReader())
                {
                    reader.Read();
                    string username = reader.GetString("username");
                    return username;
                }
            }
        }
    }
}
