namespace MapaCenBackend.DTO
{
    public class RegionDTO
    {
        public int id {  get; set; }

        public string name { get; set; }

        public RegionDTO(int id, string name) 
        {
            this.id = id;
            this.name = name;
        }
    }
}
