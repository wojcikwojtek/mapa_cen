using MapaCenBackend.Entities;
using MySql.Data.MySqlClient;

namespace MapaCenBackend.Services
{
    public class RatingService
    {
        public RatingService() { }
        public List<Rating> selectRatings(int priceId)
        {
            var ratings = new List<Rating>();
            string connstring = "server=localhost;uid=root;pwd=Mapacen;database=mapa_cen";
            MySqlConnection conn = new MySqlConnection();
            conn.ConnectionString = connstring;
            conn.Open();
            string sql = "select * from ratings where price_id = @priceId";
            using (MySqlCommand cmd = new MySqlCommand(sql, conn))
            {
                cmd.Parameters.AddWithValue("@priceId", priceId);
                using (MySqlDataReader ratingReader = cmd.ExecuteReader())
                {
                    while (ratingReader.Read())
                    {
                        int rating_id = int.Parse(ratingReader.GetString("rating_id"));
                        int price_id = int.Parse(ratingReader.GetString("price_id"));
                        int user_id = int.Parse(ratingReader.GetString("user_id"));
                        bool is_positive = Convert.ToBoolean(int.Parse(ratingReader.GetString("is_positive")));
                        Rating rating = new Rating(rating_id, price_id, user_id, is_positive);
                        ratings.Add(rating);
                    }
                }
            }
            return ratings;
        }
    }
}
