namespace MapaCenBackend.Entities
{
    public class Price
    {
        private int price_id;

        private int product_id;

        private string shop_address;

        private string date;

        private double price_value;

        private List<Rating> ratings;

        private List<Comment> comments;

        private int region_id;

        public Price(int price_id, int product_id, string shop_address, string date, double price_value, List<Rating> ratings, List<Comment> comments, int region_id)
        {
            this.price_id = price_id;
            this.product_id = product_id;
            this.shop_address = shop_address;
            this.date = date;
            this.price_value = price_value;
            this.ratings = ratings;
            this.comments = comments;
            this.region_id = region_id;
        }

        public int getPriceId() { return price_id; }
        public string getShopAddress() { return shop_address; }
        public string getDate() { return date; }
        public double getPriceValue() { return price_value;}
        public List<Rating> getRatings() {  return ratings; }
        public List<Comment> getComments() {  return comments; }
        public int getRegion() { return region_id; }
    }
}
