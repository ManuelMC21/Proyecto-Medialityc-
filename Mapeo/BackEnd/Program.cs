using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using NetTopologySuite.Geometries;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

/*builder.Services.AddControllers().AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new GeometryJsonConverter());
    });*/
builder.Services.AddDbContext<AppDbContext>(options =>
    {
        options.UseNpgsql("Host=localhost;Port=5432;Database=Medialityc;User Id=postgres;Password=manu04");
    });



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapPost("/Restaurants/", async (Restaurant r, AppDbContext db) =>
{
    db.Restaurants.Add(r);
    await db.SaveChangesAsync();

    return Results.Created($"/Restaurant/{r.Id}", r);

});

/*app.MapGet("/Restaurants/{location:Point}", async (NetTopologySuite.Geometries.Geometry point, AppDbContext db) =>
{
    return await db.Restaurants.FindAsync(point)
    is Restaurant r
    ? Results.Ok(r)
    : Results.NotFound();

});*/

app.MapGet("/Restaurants", async (AppDbContext db) => await db.Restaurants.ToListAsync());

app.MapPut("/Restaurants/{id:int}", async (int id, Restaurant r, AppDbContext db) =>
{
    if (r.Id != id)
        return Results.BadRequest();

    var restaurant = await db.Restaurants.FindAsync(id);

    if (restaurant is null) return Results.NotFound();

    restaurant.Id = r.Id;
    restaurant.Name = r.Name;
    restaurant.Phone = r.Phone;

    await db.SaveChangesAsync();

    return Results.Ok(restaurant);

});

app.MapDelete("/Restaurants/{id:int}", async (int id, AppDbContext db) =>
{
    var restaurant = await db.Restaurants.FindAsync(id);
    if (restaurant is null) return Results.NotFound();

    db.Restaurants.Remove(restaurant);
    await db.SaveChangesAsync();

    return Results.NoContent();

});

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
