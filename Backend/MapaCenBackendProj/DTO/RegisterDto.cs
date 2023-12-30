namespace MapaCenBackend.DTO
{
    public class RegisterDto
    {
        public string username { get; set; }

        public string email { get; set; }

        public string password { get; set; }

        public RegisterDto(string username, string email, string password)
        {
            this.username = username;
            this.email = email;
            this.password = password;
        }

        public string getUsername() { return username; }

        public string getEmail() { return email; }

        public string getPassword() { return password; }
    }
}
