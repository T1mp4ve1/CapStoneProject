namespace backend.Model.DTO.OpinionDTO
{
    public class Opinion_Read
    {
        public Guid Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public int Rating { get; set; }
        public string UserOpinion { get; set; }
        public string UserId { get; set; }
        public string userFirstName { get; set; }
    }
}
