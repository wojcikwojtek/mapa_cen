namespace MapaCenBackend.DTO
{
    public class CommentDTO
    {
        public int username {  get; set; }
        public string date { get; set; }
        public string content { get; set; }
        public string picture { get; set; }

        public CommentDTO(int username, string date, string content, string picture)
        {
            this.username = username;
            this.date = date;
            this.content = content;
            this.picture = picture;
        }
    }
}
