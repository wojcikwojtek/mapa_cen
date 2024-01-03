namespace MapaCenBackend.DTO
{
    public class AddCommentRequest
    {
        public int priceId { get; set; }
        public string content { get; set; }

        public AddCommentRequest(int priceId, string content)
        {
            this.priceId = priceId;
            this.content = content;
        }

    }
}
