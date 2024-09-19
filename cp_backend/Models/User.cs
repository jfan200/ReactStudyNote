namespace cp_backend.Models;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;


public class User
{
    [BsonId]
    public ObjectId _id { get; set; }

    public long user_id { get; set; }
    public string name { get; set; }
    public string phone { get; set; }
    public string password { get; set; }
    public string email { get; set; }
    public string role { get; set; }
    public IEnumerable<long> building_ids { get; set; }
}