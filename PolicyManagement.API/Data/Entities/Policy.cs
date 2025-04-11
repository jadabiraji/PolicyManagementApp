using System.ComponentModel.DataAnnotations.Schema;

namespace PolicyManagement.API.Data.Entities
{
    public class Policy
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;

        public string? Description { get; set; }

        public DateTime CreationDate { get; set; }

        public DateTime EffectiveDate { get; set; }

        public DateTime ExpiryDate { get; set; }

        public Guid PolicyTypeId { get; set; }

        [ForeignKey(nameof(PolicyTypeId))]
        public PolicyType? PolicyType { get; set; }

        // Add TenantId to the Policy entity
        public string TenantId { get; set; } = null!;
    }
}
