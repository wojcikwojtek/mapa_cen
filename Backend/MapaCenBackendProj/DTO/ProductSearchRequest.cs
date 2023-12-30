namespace MapaCenBackend.DTO
{
    public class ProductSearchRequest
    {
        public string productName { get; set; }

        public int productId { get; set; }

        public ProductSearchRequest(string productName, int productId)
        {
            this.productName = productName;
            this.productId = productId;
        }
    }
}
