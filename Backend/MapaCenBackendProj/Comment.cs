namespace MapaCenBackend
{
    public class Comment
    {
        private int comment_id;

        private int price_id;

        private int user_id;

        private string date;

        private string content;

        private string picture;

        public Comment(int comment_id, int price_id, int user_id, string date, string content, string picture)
        {
            this.comment_id = comment_id;
            this.price_id = price_id;
            this.user_id = user_id;
            this.date = date;
            this.content = content;
            this.picture = picture;
        }
    }
}
