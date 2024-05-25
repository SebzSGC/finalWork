namespace WebApi.Models
{
    public class User
    {
        public int Id { get; set; }
        public required string Document { get; set; }
        public required string Name { get; set; }
        public required string PhoneNumber { get; set; }
        public required string Mail { get; set; }
        public required string City { get; set; }
        public DateTime DateRegister { get; set; }
    }

    
}
