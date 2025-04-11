namespace PolicyManagement.API.Models
{
    public class LoginRequest
    {
        public string Username { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string TenantId { get; set; } = null!;  // TenantId
    }
}
