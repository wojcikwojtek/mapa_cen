using MapaCenBackend.Entities;
using MySql.Data.MySqlClient;
using System.Reflection.PortableExecutable;

namespace MapaCenBackend.Services
{
    public class PriceService
    {
        private CommentService commentService;
        private RatingService ratingService;
        public PriceService(CommentService commentService, RatingService ratingService)
        {
            this.commentService = commentService;
            this.ratingService = ratingService;
        }
        public List<Price> selectPrices(int productId)
        {
            var prices = new List<Price>();
            string connstring = "server=localhost;uid=root;pwd=Mapacen123;database=mapa_cen";
            MySqlConnection conn = new MySqlConnection();
            conn.ConnectionString = connstring;
            conn.Open();
            string sql = "select * from prices where product_id = @productId";
            using (MySqlCommand cmd = new MySqlCommand(sql, conn))
            {
                cmd.Parameters.AddWithValue("@productId", productId);
                using (MySqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        int price_id = int.Parse(reader.GetString("price_id"));
                        int product_id = int.Parse(reader.GetString("product_id"));
                        string shop_address = reader.GetString("shop_address");
                        string price_date = reader.GetString("date");
                        List<Comment> comments = commentService.selectComments(price_id);
                        List<Rating> ratings = ratingService.selectRatings(price_id);
                        Price price = new Price(price_id, product_id, shop_address, price_date, ratings, comments);
                        prices.Add(price);
                    }
                }
            }
            return prices;
        }
    }
}
