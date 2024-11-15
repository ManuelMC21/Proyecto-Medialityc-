using System.Text.Json.Serialization;
using NetTopologySuite.Geometries;


public class Restaurant
{
    public int id { get; set; }
    public string name { get; set; }
    public string? phone { get; set; }
    [JsonIgnore]
    public Point? location { get; set; }
    public string type { get; set; }
    public string? description { get; set; }
}