namespace MapaCenBackend
{
    public class Rating
    {
        private int rating_id;

        private int price_id;

        private int user_id;

        private bool is_positive;

        public Rating(int rating_id, int price_id, int user_id, bool is_positive)
        {
            this.rating_id = rating_id;
            this.price_id = price_id;
            this.user_id = user_id;
            this.is_positive = is_positive;
        }
    }
}
