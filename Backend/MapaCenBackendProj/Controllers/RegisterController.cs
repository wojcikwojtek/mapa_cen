using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace MapaCenBackend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RegisterController : ControllerBase
    {
        private readonly ILogger<RegisterController> _logger;

        public RegisterController(ILogger<RegisterController> logger)
        {
            _logger = logger;
        }

        [HttpPost(Name = "register")]
        public void register([FromBody]RegisterDto registerDto)
        {
            try
            {
                string connstring = "server=localhost;uid=root;pwd=Mapacen;database=mapa_cen";
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
            }
            catch (Exception ex)
            {
                Console.WriteLine("Failed to insert to mysql db");
            }
        }

       
    }
}