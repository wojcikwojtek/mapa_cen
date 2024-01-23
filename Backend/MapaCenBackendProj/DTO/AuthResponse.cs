namespace MapaCenBackend.DTO
{
    public class AuthResponse
    {
        public int userId {  get; set; }
        public string username { get; set; }
        public bool authorized { get; set; }
        public int id_regionu { get; set; }

        public bool isAdmin { get; set; }

        public AuthResponse(int userId,string username, bool authorized, int id_regionu, bool isAdmin)
        {
            this.userId = userId;
            this.username = username;
            this.authorized = authorized;
            this.id_regionu = id_regionu;
            this.isAdmin = isAdmin;
        }
    }
}
