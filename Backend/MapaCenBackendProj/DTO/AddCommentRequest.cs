namespace MapaCenBackend.DTO
{
    public class AddCommentRequest
    {
        public int priceId { get; set; }

        public int userId { get; set; }
        public string content { get; set; }

        public int regionId { get; set; }
        public IFormFile file { get; set; }

        public AddCommentRequest() { }
        public AddCommentRequest(int priceId, string content, int userId, int regionId, IFormFile file)
        {
            this.priceId = priceId;
            this.content = content;
            this.userId = userId;
            this.regionId = regionId;
            this.file = file;
        }
        

    }
}
