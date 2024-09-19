using cp_backend.Dtos;

namespace cp_backend.Data;
using cp_backend.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;


public class Repo: IRepo
{
    private readonly IMongoCollection<Building> _buildingsCollection;
    private readonly IMongoCollection<Feedback> _feedbacksCollection;
    private readonly IMongoCollection<Image> _imagesCollection;
    private readonly IMongoCollection<Job> _jobsCollection;
    private readonly IMongoCollection<BuildingTask> _buildingTasksCollection;
    private readonly IMongoCollection<User> _usersCollection;


    public Repo( IOptions<CPDatabaseSettings> databaseSettings)
    {
        var mongoClient = new MongoClient(databaseSettings.Value.ConnectionString);
        var mongoDatabase = mongoClient.GetDatabase(databaseSettings.Value.DatabaseName);

        _buildingsCollection = mongoDatabase.GetCollection<Building>(databaseSettings.Value.BuildingsCollection);
        _feedbacksCollection = mongoDatabase.GetCollection<Feedback>(databaseSettings.Value.FeedbacksCollection);
        _imagesCollection = mongoDatabase.GetCollection<Image>(databaseSettings.Value.ImagesCollection);
        _jobsCollection = mongoDatabase.GetCollection<Job>(databaseSettings.Value.JobsCollection);
        _buildingTasksCollection = mongoDatabase.GetCollection<BuildingTask>(databaseSettings.Value.TasksCollection);
        _usersCollection = mongoDatabase.GetCollection<User>(databaseSettings.Value.UsersCollection);
    }


    // Building
    public async Task<IEnumerable<Building>> GetBuildingsAsync() => await _buildingsCollection.Find(_ => true).ToListAsync();
    public async Task<Building?> GetBuildingByIdAsync(long id) => await _buildingsCollection.Find(building => building.building_id == id).FirstOrDefaultAsync();
    public async Task CreateNewBuildingAsync(Building newBuilding) => await _buildingsCollection.InsertOneAsync(newBuilding);
    public async Task UpdateBuildingAsync(long id, Building updatedBuilding) => await _buildingsCollection.ReplaceOneAsync(building => building.building_id == id, updatedBuilding);
    public async Task RemoveBuildingAsync(long id) => await _buildingsCollection.DeleteOneAsync(building => building.building_id == id);
    
    // User
    public async Task<User?> ValidateUserAsync(string phone, string password) => await _usersCollection.Find(user => user.phone == phone && user.password == password).FirstOrDefaultAsync();

    public async Task<long> GenerateUserIdByRole(string role)
    {
        int minId = 0, maxId = 0;

        switch (role.ToLower())
        {
            case "admin":
                minId = 0;
                maxId = 9999;
                break;
            case "internal":
                minId = 10000;
                maxId = 19999;
                break;
            case "subcontractor":
                minId = 20000;
                maxId = 29999;
                break;
            case "cleaner":
                minId = 30000;
                maxId = 39999;
                break;
            default:
                throw new ArgumentException("Invalid role");
        }
        
        var filter = Builders<User>.Filter.And(
            Builders<User>.Filter.Gte(u => u.user_id, minId),
            Builders<User>.Filter.Lte(u => u.user_id, maxId)
        );

        var maxUserIdDoc = await _usersCollection
            .Find(filter)
            .SortByDescending(u => u.user_id)
            .Limit(1)
            .FirstOrDefaultAsync();
         
        long nextUserId;
        if (maxUserIdDoc == null)
        {
            nextUserId = minId;
        }
        else if (maxUserIdDoc.user_id >= maxId)
        {
            throw new InvalidOperationException("User ID range for this role is full.");
        }
        else
        {
            nextUserId = maxUserIdDoc.user_id + 1;
        }
        return nextUserId;
    }
    
    public async Task<bool> AddUserToBuilding(User user, IEnumerable<long> buildingIds)
    {
        var filter = Builders<Building>.Filter.In(b => b.building_id, buildingIds);
        UpdateDefinition<Building> update = null;
        switch (user.role)
        {
            case "internal":
                update = Builders<Building>.Update.Push(b => b.internal_ids, user.user_id);
                break;
            case "subcontractor":
                update = Builders<Building>.Update.Push(b => b.subcontractor_ids, user.user_id);
                break;
            case "cleaner":
                update = Builders<Building>.Update.Push(b => b.cleaner_ids, user.user_id);
                break;
        }
        if (update == null)
        {
            return false;
        }
        var result = await _buildingsCollection.UpdateManyAsync(filter, update);
        return result.ModifiedCount > 0;
    }
    
    public async Task<Boolean> AddNewUser(User newUser)
    {
        try
        {
            var existingUser = await _usersCollection.Find(user => user.phone == newUser.phone).FirstOrDefaultAsync();
            if (existingUser != null)
            {
                return false;
            }

            await _usersCollection.InsertOneAsync(newUser);
            return true;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"An error occurred while adding a new user: {ex.Message}");
            return false;
        }
    }
    
    public async Task<IEnumerable<User>> GetAllUsersAsync() => await _usersCollection.Find(user => true).ToListAsync();

    // Task
    public async Task<IEnumerable<BuildingTask>> GetBuildingTaskByUserIdAsync(long userId) => await _buildingTasksCollection.Find(task => task.cleaner_id == userId || task.internal_id == userId || task.subcontractor_id == userId).ToListAsync();
    
    public async Task<IEnumerable<BuildingTask>> GetBuildingTasksAsync() => await _buildingTasksCollection.Find(_ => true).ToListAsync();

    // Job
    public async Task<IEnumerable<Job>> GetJobsByTaskIdAsync(long id) => await _jobsCollection.Find(job => job.task_id == id).ToListAsync();
    
    // Comment
    public async Task AddNewFeedback(FeedbackInput newFeedback)
    {
        try
        {
            IEnumerable<Image> images = newFeedback.imgs;
            await _imagesCollection.InsertManyAsync(images);

            Feedback feedback = new()
            {
                content = newFeedback.content,
                id = newFeedback.id,
                img_ids = images.Select(x => x.img_id).ToList()
            };

            await _feedbacksCollection.InsertOneAsync(feedback);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"An error occurred while adding feedback: {ex.Message}");
            throw;  // Re-throw the exception if you want the caller to handle it.
        }
    } 

}