namespace backend.Model.DTO.Common
{
    public class RequestResult
    {
        public RequestResult_DTO NotFound()
        {
            var result = new RequestResult_DTO { Success = false, Error = "Not found" };
            return result;
        }

        public RequestResult_DTO NoChanges()
        {
            var result = new RequestResult_DTO { Success = false, Error = "No changes were applied" };
            return result;
        }
    }
}
