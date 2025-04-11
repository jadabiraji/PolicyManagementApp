using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PolicyManagement.API.Data;
using PolicyManagement.API.Data.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PolicyManagement.API.Controllers
{
[Route("api/policy-types")]
    [ApiController]
    public class PolicyTypesController : ControllerBase
    {
        private readonly PolicyDbContext _context;

        public PolicyTypesController(PolicyDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PolicyType>>> GetPolicyTypes()
        {
            return await _context.PolicyTypes.ToListAsync();
        }
    }
}
