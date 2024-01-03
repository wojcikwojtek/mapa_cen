using MapaCenBackend.Entities;

namespace MapaCenBackend.DTO
{
    public class AddPriceRequest
    {
        public int productId { get; set; }

        public string shopAddress { get; set; }

        public double priceValue { get; set; }

        public AddPriceRequest( int productId, string shopAddress, double priceValue)
        {
            this.productId = productId;
            this.shopAddress = shopAddress;
            this.priceValue = priceValue;
        }
    }
}
