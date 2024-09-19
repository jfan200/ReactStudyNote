using cp_backend.Dtos;

namespace cp_backend.Data;
using cp_backend.Models;


public interface IRepo
{
    // Building
    public Task<IEnumerable<Building>> GetBuildingsAsync();
    public Task<Building?> GetBuildingByIdAsync(long id);
    public Task CreateNewBuildingAsync(Building newBuilding);
    public Task UpdateBuildingAsync(long id, Building updatedBuilding);
    public Task RemoveBuildingAsync(long id);
    
    // User
    public Task<User?> ValidateUserAsync(string phone, string password);
    public Task<long> GenerateUserIdByRole(string role);
    public Task<bool> AddUserToBuilding(User user, IEnumerable<long> buildingIds);
    public Task<Boolean> AddNewUser(User newUser);
    public Task<IEnumerable<User>> GetAllUsersAsync();
    
    // Task
    public Task<IEnumerable<BuildingTask>> GetBuildingTaskByUserIdAsync(long userId);
    public Task<IEnumerable<BuildingTask>> GetBuildingTasksAsync();
    
    // Job
    public Task<IEnumerable<Job>> GetJobsByTaskIdAsync(long id);
    
    // Comment
    public Task AddNewFeedback(FeedbackInput newFeedback);

}