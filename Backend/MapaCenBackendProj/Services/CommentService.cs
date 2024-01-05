using MapaCenBackend.Entities;
using MySql.Data.MySqlClient;

namespace MapaCenBackend.Services
{
    public class CommentService
    {
        public CommentService() { }
        public List<Comment> selectComments(int priceId)
        {
            var comments = new List<Comment>();
            string connstring = "server=localhost;uid=root;pwd=Mapacen123;database=mapa_cen";
            MySqlConnection conn = new MySqlConnection();
            conn.ConnectionString = connstring;
            conn.Open();
            string sql = "select * from comments where price_id = @priceId";
            using (MySqlCommand cmd = new MySqlCommand(sql, conn))
            {
                cmd.Parameters.AddWithValue("@priceId", priceId);
                using (MySqlDataReader commentReader = cmd.ExecuteReader())
                {
                    while (commentReader.Read())
                    {
                        int comment_id = int.Parse(commentReader.GetString("comment_id"));
                        int price_id = int.Parse(commentReader.GetString("price_id"));
                        int user_id = int.Parse(commentReader.GetString("user_id"));
                        string date = commentReader.GetString("date");
                        string content = commentReader.GetString("content");
                        string picture = commentReader.IsDBNull(commentReader.GetOrdinal("picture"))
                        ? null
                        : commentReader.GetString("picture");
                        Comment comment = new Comment(comment_id, price_id, user_id, date, content, picture);
                        comments.Add(comment);
                    }
                }
            }
            return comments;
        }
    }
}
