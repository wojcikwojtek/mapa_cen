namespace MapaCenBackend.DTO
{
    public class AddCommentRequest
    {
        public int priceId { get; set; }

        public int userId { get; set; }
        public string content { get; set; }

        public int regionId { get; set; }
<<<<<<< HEAD
        public IFormFile picture { get; set; }
        public AddCommentRequest(int priceId, string content, int userId, int regionId, IFormFile picture)
=======
        public IFormFile file { get; set; }

        public AddCommentRequest() { }
        public AddCommentRequest(int priceId, string content, int userId, int regionId, IFormFile file)
>>>>>>> 5ee9c1a18702475d86a089b6613594adcf0f4d30
        {
            this.priceId = priceId;
            this.content = content;
            this.userId = userId;
            this.regionId = regionId;
            this.file = file;
        }
        

    }

    public class FileModel
    {
        public string FileName { get; set; }
        public IFormFile FormFile { get; set; }
    }
}
