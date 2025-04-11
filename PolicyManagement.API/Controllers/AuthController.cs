using Microsoft.AspNetCore.Mvc;
using PolicyManagement.API.Models;
using PolicyManagement.API.Services;
using Microsoft.AspNetCore.Authorization;

namespace PolicyManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

       [HttpPost("login")]
public IActionResult Login([FromBody] LoginRequest request)
{
    // Mock user validation. Replace this with actual DB validation
    if (request.Username == "admin" && request.Password == "password")
    {
        string tenantId = request.TenantId;  // Retrieve tenant ID from the request

        // Generate the token with tenant ID
        var token = _authService.GenerateToken(request.Username, tenantId);

        // Store the token in an HttpOnly, Secure cookie (set Secure flag for production)
        Response.Cookies.Append("AuthToken", token, new CookieOptions
        {
            HttpOnly = true,
            Secure = true,  // Set to true in production, false for local development (http://localhost)
            SameSite = SameSiteMode.Strict,
            Expires = DateTimeOffset.UtcNow.AddDays(1)
        });

        return Ok(new { message = "Login successful" });
    }

    return Unauthorized();
}


[HttpGet("validate-token")]
[Authorize]  // This will automatically validate the token from the cookie
public IActionResult ValidateToken()
{
    var tenantId = User.FindFirst("tenantId")?.Value; // Extract tenantId from the token

    if (string.IsNullOrEmpty(tenantId))
    {
        return Unauthorized(new { message = "Tenant ID is missing in token" });
    }

    return Ok(new { message = "Token is valid", tenantId });
}


        [HttpPost("logout")]
        public IActionResult Logout()
        {
            // Remove the "AuthToken" cookie by setting the Expires date to a past date
            Response.Cookies.Append("AuthToken", "", new CookieOptions
            {
                Expires = DateTimeOffset.UtcNow.AddDays(-1),  // Expired cookie, effectively logging out
                HttpOnly = true,
                Secure = false, // Set to true for production
                SameSite = SameSiteMode.Strict
            });

            return Ok(new { message = "Logout successful" });
        }
    }
}
