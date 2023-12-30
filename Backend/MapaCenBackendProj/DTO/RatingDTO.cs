using Azure.Identity;

namespace MapaCenBackend.DTO
{
    public class RatingDTO
    {
        public string username {  get; set; }
        public bool isPositive {  get; set; }
        
        public RatingDTO(string username, bool isPositive)
        {
            this.username = username;
            this.isPositive = isPositive;
        }
    }
}
