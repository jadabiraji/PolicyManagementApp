using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using PolicyManagement.API.Models;

namespace PolicyManagement.API.Services
{
    public class AuthService
    {
        private readonly IConfiguration _configuration;

        public AuthService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // Method to generate JWT token with TenantId included as claim
        public string GenerateToken(string username, string tenantId)
{
    var jwtSettings = _configuration.GetSection("JwtSettings").Get<JwtSettings>();

    var claims = new[]
    {
        new Claim(ClaimTypes.Name, username),
        new Claim("tenantId", tenantId) // Add tenantId as a claim
    };

    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.SecretKey));
    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

    var token = new JwtSecurityToken(
        issuer: jwtSettings.Issuer,
        audience: jwtSettings.Audience,
        claims: claims,
        expires: DateTime.Now.AddMinutes(jwtSettings.ExpiryMinutes),
        signingCredentials: creds
    );

    return new JwtSecurityTokenHandler().WriteToken(token);
}


        // Method to extract TenantId from the JWT token
        public string GetTenantIdFromToken(string token)
        {
            var handler = new JwtSecurityTokenHandler();
            var jsonToken = handler.ReadToken(token) as JwtSecurityToken;
            return jsonToken?.Claims.FirstOrDefault(c => c.Type == "TenantId")?.Value; // Retrieve TenantId from claims
        }
    }
}
