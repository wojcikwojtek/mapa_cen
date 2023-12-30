namespace MapaCenBackend.DTO
{
    public class PriceDTO
    {
        public string shopAddress { get; set; }
        public string date {  get; set; }
        public List<RatingDTO> ratings { get; set; }
        public List<CommentDTO> comments { get; set; }

        public PriceDTO(string shopAddress, string date, List<RatingDTO> ratings, List<CommentDTO> comments)
        {
            this.shopAddress = shopAddress;
            this.date = date;
            this.ratings = ratings;
            this.comments = comments;
        }
    }
}
