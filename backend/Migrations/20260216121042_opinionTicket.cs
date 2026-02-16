using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class opinionTicket : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "EntityId",
                table: "Opinions",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Opinions_EntityId",
                table: "Opinions",
                column: "EntityId");

            migrationBuilder.AddForeignKey(
                name: "FK_Opinions_Tickets_EntityId",
                table: "Opinions",
                column: "EntityId",
                principalTable: "Tickets",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Opinions_Tickets_EntityId",
                table: "Opinions");

            migrationBuilder.DropIndex(
                name: "IX_Opinions_EntityId",
                table: "Opinions");

            migrationBuilder.DropColumn(
                name: "EntityId",
                table: "Opinions");
        }
    }
}
