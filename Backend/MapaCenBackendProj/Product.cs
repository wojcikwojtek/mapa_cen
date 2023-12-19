namespace MapaCenBackend
{
    public class Product
    {
        private int product_id;

        private string product_name;

        private string category_id;

        private string picture;

        private List<Price> prices;

        public Product(int product_id, string product_name, string category_id, string picture, List<Price> prices)
        {
            this.product_id = product_id;
            this.product_name = product_name;
            this.category_id = category_id;
            this.picture = picture;
            this.prices = prices;
        }
    }
}
