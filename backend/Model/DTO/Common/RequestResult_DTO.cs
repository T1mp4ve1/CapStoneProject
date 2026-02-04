namespace backend.Model.DTO.Common
{
    public class RequestResult_DTO
    {
        public bool Success { get; set; }
        public string? Error { get; set; }
        public string? Message { get; set; }
        public object? Data { get; set; }
    }
}
