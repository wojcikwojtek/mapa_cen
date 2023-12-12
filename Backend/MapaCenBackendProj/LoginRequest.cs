namespace MapaCenBackend
{
    public class LoginRequest
    {
        public string username { get; set; }

        public string password { get; set; }

        public LoginRequest(string username, string password)
        {
            this.username = username;
            this.password = password;
        }
    }
}
