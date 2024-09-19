namespace cp_backend.Models;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;


public class Feedback
{
    [BsonId]
    public ObjectId _id { get; set; }
    public string id { get; set; }
    public long task_id { get; set; }
    public string content { get; set; }
    public IEnumerable<string> img_ids { get; set; }
}