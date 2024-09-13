using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CarRental.Migrations
{
    /// <inheritdoc />
    public partial class initial12 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "CarDetails",
                newName: "CarId");

            migrationBuilder.AddColumn<string>(
                name: "CarId",
                table: "Notifications",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "CarId",
                table: "Bookings",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_CarId",
                table: "Notifications",
                column: "CarId");

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_CarId",
                table: "Bookings",
                column: "CarId");

            migrationBuilder.AddForeignKey(
                name: "FK_Bookings_CarDetails_CarId",
                table: "Bookings",
                column: "CarId",
                principalTable: "CarDetails",
                principalColumn: "CarId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_CarDetails_CarId",
                table: "Notifications",
                column: "CarId",
                principalTable: "CarDetails",
                principalColumn: "CarId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bookings_CarDetails_CarId",
                table: "Bookings");

            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_CarDetails_CarId",
                table: "Notifications");

            migrationBuilder.DropIndex(
                name: "IX_Notifications_CarId",
                table: "Notifications");

            migrationBuilder.DropIndex(
                name: "IX_Bookings_CarId",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "CarId",
                table: "Notifications");

            migrationBuilder.RenameColumn(
                name: "CarId",
                table: "CarDetails",
                newName: "Id");

            migrationBuilder.AlterColumn<string>(
                name: "CarId",
                table: "Bookings",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");
        }
    }
}
