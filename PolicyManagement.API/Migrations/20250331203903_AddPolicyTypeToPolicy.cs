using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PolicyManagement.API.Migrations
{
    /// <inheritdoc />
    public partial class AddPolicyTypeToPolicy : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PolicyTypeId",
                table: "Policies",
                newName: "PolicyType");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PolicyType",
                table: "Policies",
                newName: "PolicyTypeId");
        }
    }
}
