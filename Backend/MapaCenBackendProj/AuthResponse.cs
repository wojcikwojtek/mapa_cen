namespace MapaCenBackend
{
    public class AuthResponse
    {
        public string username {  get; set; }
        public bool authorized { get; set; }

        public AuthResponse(string username, bool authorized)
        {
            this.username = username;
            this.authorized = authorized;
        }
    }
}
