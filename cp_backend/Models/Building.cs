using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace cp_backend.Models;


public class Building
{
    [BsonId]
    public ObjectId _id { get; set; }
    public long building_id { get; set; }
    public IEnumerable<long> internal_ids { get; set; }
    public IEnumerable<long> subcontractor_ids { get; set; }
    public IEnumerable<long> cleaner_ids { get; set; }
    public IEnumerable<long> task_ids { get; set; }
    public Building_info building_info { get; set; }
}


public class Building_info
{
    public string building_name { get; set; }
    public string company_name { get; set; }
    public string owner_corporation { get; set; }
    public string address { get; set; }
    public string suburb { get; set; }
    public string state { get; set; }
    public string postal_code { get; set; }
    public string building_level { get; set; }
    public string contract_start_date {get; set;}
    public string contract_end_date {get; set;}
    public Contact_info contact_info {get; set;}
}


public class Contact_info
{
    public string first_name { get; set; }
    public string last_name { get; set; }
    public string phone { get; set; }
    public string email { get; set; }
}