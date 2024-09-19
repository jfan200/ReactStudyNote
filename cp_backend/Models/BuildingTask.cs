namespace cp_backend.Models;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;


public class BuildingTask
{
    [BsonId]
    public ObjectId _id { get; set; }
    public long task_id { get; set; }
    public long building_id { get; set; }
    public long internal_id { get; set; }
    public long subcontractor_id { get; set; }
    public long cleaner_id { get; set; }
    public string date { get; set; }
    public IEnumerable<long> job_ids { get; set; }
    
    public string comment_id { get; set; }
    public string internal_feedback_id { get; set; }
    public string subcontractor_feedback_id { get; set; }
}