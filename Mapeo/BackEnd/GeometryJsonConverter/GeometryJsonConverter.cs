using System;
using System.Text.Json;
using System.Text.Json.Serialization;
using NetTopologySuite.Geometries;

public class GeometryJsonConverter : JsonConverter<Geometry>
{
    public override Geometry? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        if (reader.TokenType != JsonTokenType.StartObject)
        {
            throw new JsonException("Expected StartObject token");
        }
        double x = 0, y = 0;
        while (reader.Read())
        {

            if (reader.TokenType == JsonTokenType.PropertyName)
            {

                string propertyName = reader.GetString();
                reader.Read();

                switch (propertyName)
                {

                    case "x":
                        x = reader.GetDouble();
                        break;
                    case "y":
                        y = reader.GetDouble();
                        break;
                }
            }
            else if (reader.TokenType == JsonTokenType.EndObject)
            {
                break;
            }
        }

        return new Point(x, y);
    }

    public override void Write(Utf8JsonWriter writer, Geometry value, JsonSerializerOptions options)
    {
        if (value is Point point)
        {

            writer.WriteStartObject();
            writer.WriteNumber("x", point.X);
            writer.WriteNumber("y", point.Y);
            writer.WriteEndObject();
        }
        else
        {

            throw new NotSupportedException("Only point is supported for now");
        }
    }
}
