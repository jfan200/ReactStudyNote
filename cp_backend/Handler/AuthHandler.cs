namespace cp_backend.Handler;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
using System.Text.Encodings.Web;
using cp_backend.Data;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Options;
using cp_backend.Models;


public class AuthHandler: AuthenticationHandler<AuthenticationSchemeOptions>
{
    private readonly IRepo _repo;

    public AuthHandler(
        IRepo repo,
        IOptionsMonitor<AuthenticationSchemeOptions> options,
        ILoggerFactory logger,
        UrlEncoder encoder,
        ISystemClock clock)
        :base(options, logger, encoder, clock)
    {
        _repo = repo;
    }

    protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
    {
        if (!Request.Headers.ContainsKey("Authorization"))
        {
            Response.Headers.Add("WWW-Authenticate", "Basic");
            return AuthenticateResult.Fail("Authorization header not found.");
        }
        else
        {
            var authHeader = AuthenticationHeaderValue.Parse(Request.Headers["Authorization"]);
            var credentialBytes = Convert.FromBase64String(authHeader.Parameter);
            var credentials = Encoding.UTF8.GetString(credentialBytes).Split(":");
            var phone = credentials[0];
            var password = credentials[1];

            User user = await _repo.ValidateUserAsync(phone, password);

            if (user == null)
            {
                Response.Headers.Add("WWW-Authenticate", "Basic");
                return AuthenticateResult.Fail("phone number and password do not match");
            }
            else
            {
                var claims = new[] { 
                    new Claim("user_id", user.user_id+""), 
                    new Claim("user_name", user.name+""),
                    new Claim("password", user.password+"") ,
                    new Claim("role", user.role+"") 
                };
                ClaimsIdentity identity = new ClaimsIdentity(claims, "Basic");
                ClaimsPrincipal principle = new ClaimsPrincipal(identity);
                AuthenticationTicket ticket = new AuthenticationTicket(principle, Scheme.Name);
                return AuthenticateResult.Success(ticket);
            }
        }
    }
}