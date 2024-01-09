namespace MapaCenBackend.DTO
{
    public class PriceDTO
    {
        public int priceId {  get; set; }
        public string shopAddress { get; set; }
        public string date {  get; set; }
        public double priceValue { get; set; }
        public int upvotes { get; set; }
        public int downvotes { get; set; }
        public List<RatingDTO> ratings { get; set; }
        public List<CommentDTO> comments { get; set; }

        public PriceDTO(int priceId,string shopAddress, string date, double priceValue, List<RatingDTO> ratings, List<CommentDTO> comments)
        {
            this.priceId = priceId;
            this.shopAddress = shopAddress;
            this.date = date;
            this.priceValue = priceValue;
            this.ratings = ratings;
            this.comments = comments;
            this.upvotes = 0;
            foreach(RatingDTO rating in ratings)
            {
                if(rating.isPositive == true)
                {
                    this.upvotes++;
                }
            }
            this.downvotes = ratings.Count - this.upvotes;
        }
    }
}
