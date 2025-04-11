// File: Data/Interfaces/IPolicyRepository.cs
using PolicyManagement.API.Data.Entities;

namespace PolicyManagement.API.Data.Interfaces
{
    public interface IPolicyRepository
    {
        Task<(IEnumerable<Policy>, int)> GetAllAsync(string tenantId, int page, int pageSize);
        Task<Policy?> GetByIdAsync(int id, string tenantId);  // Add tenantId to method
        Task<Policy> CreateAsync(Policy policy, string tenantId);  // Add tenantId to method
        Task<Policy?> UpdateAsync(Policy policy, string tenantId);  // Add tenantId to method
        Task<bool> DeleteAsync(int id, string tenantId);  // Add tenantId to method
    }
}
