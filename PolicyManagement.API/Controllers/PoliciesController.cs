// File: Controllers/PoliciesController.cs
using Microsoft.AspNetCore.Mvc;
using PolicyManagement.API.Data.Entities;
using PolicyManagement.API.Data.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace PolicyManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PoliciesController : ControllerBase
    {
        private readonly IPolicyRepository _repository;

        public PoliciesController(IPolicyRepository repository)
        {
            _repository = repository;
        }

        // Get all policies
          [HttpGet]
    public async Task<ActionResult<IEnumerable<Policy>>> GetAll([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        var tenantId = User.FindFirst("tenantId")?.Value;  // Get tenantId from the JWT claim
        if (tenantId == null)
        {
            return Unauthorized(new { message = "Tenant ID not found in token" });
        }

        var (policies, totalCount) = await _repository.GetAllAsync(tenantId, page, pageSize);

        return Ok(new
        {
            data = policies,
            totalCount,
            totalPages = (int)Math.Ceiling((double)totalCount / pageSize),
            currentPage = page
        });
    }

        // Get policy by ID
        [HttpGet("{id}")]
        public async Task<ActionResult<Policy>> GetById(int id)
        {
            var tenantId = User.FindFirst("tenantId")?.Value;  // Get tenantId from the JWT claim
            if (tenantId == null)
            {
                return Unauthorized(new { message = "Tenant ID not found in token" });
            }

            var policy = await _repository.GetByIdAsync(id, tenantId);
            return policy == null ? NotFound() : Ok(policy);
        }

        // Create policy
        [HttpPost]
        public async Task<ActionResult<Policy>> Create(Policy policy)
        {
            var tenantId = User.FindFirst("tenantId")?.Value;  // Get tenantId from the JWT claim
            if (tenantId == null)
            {
                return Unauthorized(new { message = "Tenant ID not found in token" });
            }

            var created = await _repository.CreateAsync(policy, tenantId);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        // Update policy
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Policy policy)
        {
            if (id != policy.Id) return BadRequest();

            var tenantId = User.FindFirst("tenantId")?.Value;  // Get tenantId from the JWT claim
            if (tenantId == null)
            {
                return Unauthorized(new { message = "Tenant ID not found in token" });
            }

            var updated = await _repository.UpdateAsync(policy, tenantId);
            return updated == null ? NotFound() : Ok(updated);
        }

        // Delete policy
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var tenantId = User.FindFirst("tenantId")?.Value;  // Get tenantId from the JWT claim
            if (tenantId == null)
            {
                return Unauthorized(new { message = "Tenant ID not found in token" });
            }

            var deleted = await _repository.DeleteAsync(id, tenantId);
            return deleted ? NoContent() : NotFound();
        }
    }
}
