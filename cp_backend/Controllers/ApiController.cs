namespace cp_backend.Controllers;
using System.Security.Claims;
using cp_backend.Dtos;
using cp_backend.Models;
using cp_backend.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


[Authorize(Policy = "UserOnly")]
[Authorize(AuthenticationSchemes = "Auth")]
[ApiController]
[Route("webapi")]
public class ApiController : Controller
{

    private readonly IRepo _repo;

    public ApiController(IRepo repo) => _repo = repo;

    
    [HttpGet("Login")]
    public async Task<ActionResult> Login()
    {
        // get username from ClaimIdentity
        ClaimsIdentity ci = HttpContext.User.Identities.FirstOrDefault();
        long user_id = Convert.ToInt64(ci.FindFirst("user_id").Value);
        string user_name = ci.FindFirst("user_name").Value;
        string role = ci.FindFirst("role").Value;
        
        IEnumerable<BuildingTask> tasks = await _repo.GetBuildingTaskByUserIdAsync(user_id);
        
        UserOutput output = new UserOutput()
        {
            user_id = user_id,
            name = user_name,
            role = role,
            building_tasks= tasks
        };
        
        return Ok(output);
    }

    [HttpPost("UserRegister")]
    public async Task<ActionResult> UserRegister(User newUser)
    {
        try
        {
            newUser.user_id = await _repo.GenerateUserIdByRole(newUser.role);

            if (await _repo.AddNewUser(newUser))
            {
                await _repo.AddUserToBuilding(newUser, newUser.building_ids);
                return Ok("User created successfully!");
            }
            else
            {
                return BadRequest("User phone number already exists!");
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"An error occurred while registering the user: {ex.Message}");
            return StatusCode(500, "Internal server error.");
        }
    }

    [HttpGet("GetAllUsers")]
    public async Task<IEnumerable<User>> GetAllUsers() => await _repo.GetAllUsersAsync();
    
    [HttpGet("GetAllBuildings")]
    public async Task<ActionResult<IEnumerable<Building>>> GetAllBuildings()
    {
        try
        {
            var buildings = await _repo.GetBuildingsAsync();
            return Ok(buildings);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"An error occurred while retrieving buildings: {ex.Message}");
            return StatusCode(500, "Internal server error.");
        }
    }
    
    [HttpGet("GetBuildingById/{id}")]
    public async Task<ActionResult<Building>> GetBuildingById(long id)
    {
        try
        {
            Building? building = await _repo.GetBuildingByIdAsync(id);
            if (building is null)
            {
                return NotFound();
            }
            else
            {
                return Ok(building);
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"An error occurred while retrieving the building: {ex.Message}");
            return StatusCode(500, "Internal server error.");
        }
    }
    
    [HttpGet("GetAllTasks")]
    public async Task<IEnumerable<BuildingTask>> GetAllTasks() => await _repo.GetBuildingTasksAsync();
    
    [HttpGet("GetJobsByTaskId/{id}")]
    public async Task<IEnumerable<Job>> GetJobsByTaskId(long id) => await _repo.GetJobsByTaskIdAsync(id);

    
    [HttpPost("AddNewFeedback")]
    public async Task<ActionResult> AddNewFeedback(FeedbackInput feedback)
    {
        try
        {
            await _repo.AddNewFeedback(feedback);
            return Ok("Feedback added successfully!");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"An error occurred while adding feedback: {ex.Message}");
            return StatusCode(500, "Internal server error.");
        }
    }
}