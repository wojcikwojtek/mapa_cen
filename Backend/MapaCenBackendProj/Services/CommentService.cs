using MapaCenBackend.Entities;
using MySql.Data.MySqlClient;
using System.Drawing;

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
                        string image64 = "";
                        string picture_path = commentReader.IsDBNull(commentReader.GetOrdinal("picture"))
                        ? null
                        : commentReader.GetString("picture");
                        byte[] imageBytes = { };
                        //if (picture_path != null && picture_path != "")
                        if (true)
                        {


                            Bitmap image = new Bitmap(@"C:\MyImages\nowyImage2.jpg");

                            // Zamiana obrazu na ciąg Base64
                            image64 = ImageToBase64(image);

                            // Wyświetlenie ciągu Base64
                            Console.WriteLine(image64);




                           // string path = Directory.GetCurrentDirectory() + picture_path;
                            //imageBytes = System.IO.File.ReadAllBytes(path);
                        }
                        Comment comment = new Comment(comment_id, price_id, user_id, date, content,image64);
                        comments.Add(comment);
                    }
                }
            }
            return comments;
        }





        static string ImageToBase64(Bitmap image)
        {
            using (MemoryStream ms = new MemoryStream())
            {
                // Zapisz obraz do strumienia w formacie JPEG (możesz dostosować format)
                image.Save(ms, System.Drawing.Imaging.ImageFormat.Jpeg);

                // Zamień strumień na tablicę bajtów
                byte[] imageBytes = ms.ToArray();

                // Zamień tablicę bajtów na ciąg Base64
                string base64String = Convert.ToBase64String(imageBytes);

                return base64String;
            }
        }
    }

}




