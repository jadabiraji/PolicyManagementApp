// Data/Entities/PolicyType.cs
using System.ComponentModel.DataAnnotations;

namespace PolicyManagement.API.Data.Entities
{
    public class PolicyType
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public string Name { get; set; } = string.Empty;

        // Navigation property
        public ICollection<Policy>? Policies { get; set; }
    }
}
