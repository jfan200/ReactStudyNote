using cp_backend.Models;

namespace cp_backend.Dtos;

public class UserOutput
{
    public long user_id { get; set; }
    public string name { get; set; }
    public string role { get; set; }
    public IEnumerable<BuildingTask> building_tasks { get; set; }
}