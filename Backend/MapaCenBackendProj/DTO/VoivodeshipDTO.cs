using MapaCenBackend.Entities;

namespace MapaCenBackend.DTO
{
    public class VoivodeshipDTO
    {
        public int id {  get; set; }

        public string name { get; set; }

        public VoivodeshipDTO(int id, string name)
        {
            this.id = id;
            this.name = name;
        }
    }
}
