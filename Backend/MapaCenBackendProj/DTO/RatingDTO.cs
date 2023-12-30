using Azure.Identity;

namespace MapaCenBackend.DTO
{
    public class RatingDTO
    {
        public int username {  get; set; }
        public bool isPositive {  get; set; }
        
        public RatingDTO(int username, bool isPositive)
        {
            this.username = username;
            this.isPositive = isPositive;
        }
    }
}
