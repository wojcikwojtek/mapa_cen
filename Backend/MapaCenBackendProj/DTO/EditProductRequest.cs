namespace MapaCenBackend.DTO
{
    public class EditProductRequest
    {
        public int id {  get; set; }
        public string product_name { get; set; }
        public int category_id { get; set; }
        public string picture { get; set; }

        public EditProductRequest(int id, string product_name, int category_id, string picture)
        {
            this.id = id;
            this.product_name = product_name;
            this.category_id = category_id;
            this.picture = picture;
        }
    }
}
