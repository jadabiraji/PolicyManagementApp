using Microsoft.EntityFrameworkCore;
using PolicyManagement.API.Data.Entities;
using PolicyManagement.API.Data.Interfaces;

namespace PolicyManagement.API.Data.Repositories;

public class PolicyRepository : IPolicyRepository
{
    private readonly PolicyDbContext _context;

    public PolicyRepository(PolicyDbContext context)
    {
        _context = context;
    }

    // Get all policies for a specific tenant
   public async Task<(IEnumerable<Policy>, int)> GetAllAsync(string tenantId, int page, int pageSize)
{
    var totalCount = await _context.Policies
        .Where(p => p.TenantId == tenantId)  // Filter by tenantId
        .CountAsync(); // Get the total number of policies

    var policies = await _context.Policies
        .Where(p => p.TenantId == tenantId)  // Filter by tenantId
        .Include(p => p.PolicyType)
        .Skip((page - 1) * pageSize)  // Skip the records based on page number
        .Take(pageSize)  // Limit the number of records based on page size
        .ToListAsync();

    return (policies, totalCount);
}


    // Get a policy by ID for a specific tenant
    public async Task<Policy?> GetByIdAsync(int id, string tenantId)
    {
        return await _context.Policies
            .Where(p => p.TenantId == tenantId) // Filter by TenantId
            .Include(p => p.PolicyType)
            .FirstOrDefaultAsync(p => p.Id == id);
    }

    // Create a policy for a specific tenant
    public async Task<Policy> CreateAsync(Policy policy, string tenantId)
    {
        policy.TenantId = tenantId; // Set the TenantId for the new policy
        _context.Policies.Add(policy);
        await _context.SaveChangesAsync();
        return policy;
    }

    // Update an existing policy for a specific tenant
    public async Task<Policy?> UpdateAsync(Policy policy, string tenantId)
    {
        var existing = await _context.Policies
            .Where(p => p.TenantId == tenantId) // Filter by TenantId
            .FirstOrDefaultAsync(p => p.Id == policy.Id);
        
        if (existing == null) return null;

        existing.Name = policy.Name;
        existing.Description = policy.Description;
        existing.CreationDate = policy.CreationDate;
        existing.EffectiveDate = policy.EffectiveDate;
        existing.ExpiryDate = policy.ExpiryDate;
        existing.PolicyTypeId = policy.PolicyTypeId;

        await _context.SaveChangesAsync();
        return existing;
    }

    // Delete a policy for a specific tenant
    public async Task<bool> DeleteAsync(int id, string tenantId)
    {
        var policy = await _context.Policies
            .Where(p => p.TenantId == tenantId) // Filter by TenantId
            .FirstOrDefaultAsync(p => p.Id == id);

        if (policy == null) return false;

        _context.Policies.Remove(policy);
        await _context.SaveChangesAsync();
        return true;
    }
}
