namespace MapaCenBackend.DTO
{
    public class AddCommentRequest
    {
        public int priceId { get; set; }

        public int userId { get; set; }
        public string content { get; set; }

        public int regionId { get; set; }
        public string picture { get; set; }
        public AddCommentRequest(int priceId, string content, int userId, int regionId, string picture)
        {
            this.priceId = priceId;
            this.content = content;
            this.userId = userId;
            this.regionId = regionId;
            this.picture = picture;
        }

    }

    public class FileModel
    {
        public string FileName { get; set; }
        public IFormFile FormFile { get; set; }
    }
}
