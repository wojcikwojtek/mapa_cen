using System.Drawing;

namespace MapaCenBackend.DTO
{
    public class AddProductRequest
    {
        public string product_name {  get; set; }
        public int category_id { get; set; }
        public string picture { get; set; }

        public AddProductRequest(string product_name, int category_id, string picture)
        {
            this.product_name = product_name;
            this.category_id = category_id;
            this.picture = picture;
        }
    }
}
