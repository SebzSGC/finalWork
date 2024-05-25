using Microsoft.EntityFrameworkCore;
using WebApi.Context;

var builder = WebApplication.CreateBuilder(args);
var MyCors = "_MyCors";

// Add services to the container.
// variable for connection string
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
//register service for database context
builder.Services.AddDbContext<AppDBContext>(
    options => options.UseSqlServer(connectionString)
);
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy(MyCors, policy => {
        policy.WithOrigins(
            "*")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(MyCors);

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
