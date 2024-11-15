using Microsoft.EntityFrameworkCore;
using NetTopologySuite;
using NetTopologySuite.Geometries;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<AppDbContext>(options =>
    {
        options.UseNpgsql(
            "Host=localhost;Port=5432;Database=Medialityc;User Id=postgres;Password=manu04",
            o => o.UseNetTopologySuite()
        );
    });



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapPost("/Restaurants/", async (RestaurantDto dto, AppDbContext db) =>
{
    var geometryFactory = NtsGeometryServices.Instance.CreateGeometryFactory(srid: 4326);
    var Location = geometryFactory.CreatePoint(new Coordinate(dto.longitude, dto.latitude));

    var restaurant = new Restaurant
    {
        name = dto.name,
        phone = dto.phone,
        location = Location,
        type = dto.type,
        description = dto.description
    };

    db.Restaurants.Add(restaurant);
    await db.SaveChangesAsync();

    return Results.Created($"/Restaurant/{restaurant.id}", restaurant);

});

app.MapGet("/Restaurants/{name}", async (string name, AppDbContext db) =>
{
    var listaRestaurant = await db.Restaurants.Where(r => r.name.Contains(name)).ToListAsync();
    if (listaRestaurant is null)
    {
        return Results.NotFound();
    }
    else
    {
        return Results.Ok(listaRestaurant);
    }
});

app.MapGet("/Restaurants/{id:int}", async (int id, AppDbContext db) =>
{
    return await db.Restaurants.FindAsync(id)
    is Restaurant r
    ? Results.Ok(r)
    : Results.NotFound();

});

app.MapGet("/Restaurants", async (AppDbContext db) => await db.Restaurants.ToListAsync());

app.MapPut("/Restaurants/{id:int}", async (int id, Restaurant r, AppDbContext db) =>
{
    if (r.id != id)
        return Results.BadRequest();

    var restaurant = await db.Restaurants.FindAsync(id);

    if (restaurant is null) return Results.NotFound();

    restaurant.id = r.id;
    restaurant.name = r.name;
    restaurant.phone = r.phone;
    restaurant.type = r.type;
    restaurant.description = r.description;

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
