using cp_backend.Models;

namespace cp_backend.Dtos;

public class FeedbackInput
{
    public string id { get; set; }
    public long task_id { get; set; }
    public string content { get; set; }
    public IEnumerable<Image> imgs { get; set; }
}