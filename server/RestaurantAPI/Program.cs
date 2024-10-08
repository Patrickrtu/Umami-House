using Microsoft.EntityFrameworkCore;
using RestaurantAPI.Models;
using RestaurantAPI.Services;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
        //.AddJsonOptions(options =>
        //{
        //    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve;
        //    options.JsonSerializerOptions.MaxDepth = 64; // Increase max depth if needed
        //});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

string? connectionString = builder.Configuration.GetConnectionString("cloudserver");

builder.Services.AddDbContext<JapaneseRestaurantDbContext>(options =>
    options.UseSqlServer(connectionString)
);

builder.Services.AddScoped<EmailService>();

builder.Services.AddCors(options =>
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder.AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod();
        })
); 

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();

app.Run();
