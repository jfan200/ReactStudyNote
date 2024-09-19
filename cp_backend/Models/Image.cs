namespace cp_backend.Models;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;


public class Image
{
    [BsonId]
    public ObjectId _id { get; set; }
    public string img_id { get; set; }
    public string url { get; set; }
}