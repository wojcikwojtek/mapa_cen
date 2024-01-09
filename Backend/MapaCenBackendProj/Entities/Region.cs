namespace MapaCenBackend.Entities
{
    public class Region
    {
        private int id;

        private string name;

        private int idVoivodeship;

        public Region(int id, string name, int idVoivodeship)
        {
            this.id = id;
            this.name = name;
            this.idVoivodeship = idVoivodeship;
        }
    }
}
