public class NearbyEntities
{
    public double ReferenceLatitude { get; set; }
    public double ReferenceLongitude { get; set; }
    public double SearchDistance { get; set; }
    public List<string>? Filters { get; set; }
}