namespace MapaCenBackend.DTO
{
    public class UpdateRatingRequest
    {
        public int userId { get; set; }
        public int priceId { get; set; }
        public bool positive { get; set; }

        public UpdateRatingRequest(int userId, int priceId, bool positive)
        {
            this.userId = userId;
            this.priceId = priceId;
            this.positive = positive;
        }
    }
}
