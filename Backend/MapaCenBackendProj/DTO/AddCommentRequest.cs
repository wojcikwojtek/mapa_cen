namespace MapaCenBackend.DTO
{
    public class AddCommentRequest
    {
        public int priceId { get; set; }

        public int userId { get; set; }
        public string content { get; set; }

        public AddCommentRequest(int priceId, string content, int userId)
        {
            this.priceId = priceId;
            this.content = content;
            this.userId = userId;
        }

    }
}
