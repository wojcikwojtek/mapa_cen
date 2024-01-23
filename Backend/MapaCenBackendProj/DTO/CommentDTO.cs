namespace MapaCenBackend.DTO
{
    public class CommentDTO
    {
        public string username {  get; set; }
        public string date { get; set; }
        public string content { get; set; }
        public byte[] picture { get; set; }

        public CommentDTO(string username, string date, string content, byte[] picture)
        {
            this.username = username;
            this.date = date;
            this.content = content;
            this.picture = picture;
        }
    }
}
