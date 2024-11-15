using NetTopologySuite.Geometries;


public class Restaurant
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string? Phone { get; set; }
    public Point location { get; set; }
    public string type { get; set; }
    public string? description { get; set; }
}