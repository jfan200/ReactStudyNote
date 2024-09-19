using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace cp_backend.Models;

public class Job
{
    [BsonId]
    public ObjectId _id { get; set; }
    public long task_id { get; set; }
    public long job_id { get; set; }
    public string job_location { get; set; }
    public string job_description { get; set; }
}