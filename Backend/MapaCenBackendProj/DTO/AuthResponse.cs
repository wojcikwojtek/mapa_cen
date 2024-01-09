namespace MapaCenBackend.DTO
{
    public class AuthResponse
    {
        public int userId {  get; set; }
        public string username { get; set; }
        public bool authorized { get; set; }

        public AuthResponse(int userId,string username, bool authorized)
        {
            this.userId = userId;
            this.username = username;
            this.authorized = authorized;
        }
    }
}
