namespace MapaCenBackend.DTO
{
    public class ProductDetailResponse
    {
        public string productName {  get; set; }
        public string picture { get; set; }
        public double averagePriceFromLastMonth { get; set; }
        public List<PriceDTO> prices { get; set; }

        public ProductDetailResponse(string productName, string picture, double averagePriceFromLastMonth, List<PriceDTO> prices)
        {
            this.productName = productName;
            this.picture = picture;
            this.prices = prices;
            this.averagePriceFromLastMonth = averagePriceFromLastMonth;
        }
        public ProductDetailResponse() {
            this.productName = "fail";
        }
    }
}
