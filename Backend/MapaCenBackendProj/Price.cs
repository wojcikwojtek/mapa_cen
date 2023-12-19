namespace MapaCenBackend
{
    public class Price
    {
        private int price_id;

        private int product_id;

        private string shop_address;

        private string date;

        private List<Rating> ratings;

        private List<Comment> comments;

        public Price(int price_id, int product_id, string shop_address, string date, List<Rating> ratings, List<Comment> comments)
        {
            this.price_id = price_id;
            this.product_id = product_id;
            this.shop_address = shop_address;
            this.date = date;
            this.ratings = ratings;
            this.comments = comments;
        }
    }
}
