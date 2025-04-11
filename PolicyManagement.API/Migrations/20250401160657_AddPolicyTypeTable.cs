using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PolicyManagement.API.Migrations
{
    /// <inheritdoc />
    public partial class AddPolicyTypeTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PolicyType",
                table: "Policies",
                newName: "PolicyTypeId");

            migrationBuilder.CreateTable(
                name: "PolicyTypes",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PolicyTypes", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Policies_PolicyTypeId",
                table: "Policies",
                column: "PolicyTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Policies_PolicyTypes_PolicyTypeId",
                table: "Policies",
                column: "PolicyTypeId",
                principalTable: "PolicyTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Policies_PolicyTypes_PolicyTypeId",
                table: "Policies");

            migrationBuilder.DropTable(
                name: "PolicyTypes");

            migrationBuilder.DropIndex(
                name: "IX_Policies_PolicyTypeId",
                table: "Policies");

            migrationBuilder.RenameColumn(
                name: "PolicyTypeId",
                table: "Policies",
                newName: "PolicyType");
        }
    }
}
