namespace cp_backend.Models;

public class CPDatabaseSettings
{
    public string ConnectionString { get; set; } = null!;

    public string DatabaseName { get; set; } = null!;

    public string BuildingsCollection { get; set; } = null!;
    
    public string FeedbacksCollection { get; set; } = null!;
    
    public string ImagesCollection { get; set; } = null!;
    
    public string JobsCollection { get; set; } = null!;
    
    public string TasksCollection { get; set; } = null!;
    
    public string UsersCollection { get; set; } = null!;
}