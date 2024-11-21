using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Agregar servicios a la colección.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configurar CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder => builder.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});

// Agregar DbContext
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseNpgsql("Host=localhost;Port=5432;Database=Medialityc;User Id=postgres;Password=manu04");
});

var app = builder.Build();

// Aplicar la política de CORS
app.UseCors("AllowAll");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Definición de las rutas
app.MapPost("/Restaurants/", async (Restaurant r, AppDbContext db) =>
{
    db.Restaurants.Add(r);
    await db.SaveChangesAsync();
    return Results.Created($"/Restaurant/{r.id}", r);
});

app.MapGet("/Restaurants/{name}", async (string name, AppDbContext db) =>
{
    var listaRestaurant = await db.Restaurants.Where(r => r.name.Contains(name)).ToListAsync();
    return listaRestaurant.Count == 0 ? Results.NotFound() : Results.Ok(listaRestaurant);
});

app.MapGet("/Restaurants/{id:int}", async (int id, AppDbContext db) =>
{
    return await db.Restaurants.FindAsync(id) is Restaurant r ? Results.Ok(r) : Results.NotFound();
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

// Establecer el puerto para la aplicación
app.Urls.Add("http://localhost:5000");

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
