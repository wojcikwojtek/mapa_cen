using System.Numerics;

namespace MapaCenBackend
{
    public class ProductSearch
    {
        public string productName { get; set; }
        public int productId { get; set; }
        

        public ProductSearch(string productName, int productId)
        {
            this.productName = productName;
            this.productId = productId;
        }
    }

    public class ProductSearchResponse
    {
        public List<ProductSearch> products { get; set; }

        public ProductSearchResponse(List<ProductSearch> products)
        {
            this.products = products;
        }
        
    }
}
