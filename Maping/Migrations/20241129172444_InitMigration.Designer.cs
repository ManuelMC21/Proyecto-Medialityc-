﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using NetTopologySuite.Geometries;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Maping.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20241129172444_InitMigration")]
    partial class InitMigration
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.HasPostgresExtension(modelBuilder, "postgis");
            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("District", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<Geometry>("Geom")
                        .IsRequired()
                        .HasColumnType("geometry(Polygon, 4326)");

                    b.Property<int>("MunicipalityId")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("MunicipalityId");

                    b.ToTable("Districts");
                });

            modelBuilder.Entity("Entity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("DistrictId")
                        .HasColumnType("integer");

                    b.Property<int>("EntityTypeId")
                        .HasColumnType("integer");

                    b.Property<Point>("Geom")
                        .IsRequired()
                        .HasColumnType("geometry(Point, 4326)");

                    b.HasKey("Id");

                    b.HasIndex("DistrictId");

                    b.HasIndex("EntityTypeId");

                    b.ToTable("Entities");
                });

            modelBuilder.Entity("EntityType", b =>
                {
                    b.Property<int>("EntityTypeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("EntityTypeId"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("EntityTypeId");

                    b.ToTable("EntityType");
                });

            modelBuilder.Entity("Municipality", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<Geometry>("Geom")
                        .IsRequired()
                        .HasColumnType("geometry(Polygon, 4326)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("ProvinceId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("ProvinceId");

                    b.ToTable("Municipalities");
                });

            modelBuilder.Entity("Province", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<Geometry>("Geom")
                        .IsRequired()
                        .HasColumnType("geometry(Polygon, 4326)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Provinces");
                });

            modelBuilder.Entity("Restaurant", b =>
                {
                    b.Property<int>("RestaurantId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("RestaurantId"));

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("EntityId")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("RestaurantId");

                    b.HasIndex("EntityId");

                    b.ToTable("Restaurants");
                });

            modelBuilder.Entity("District", b =>
                {
                    b.HasOne("Municipality", "Municipality")
                        .WithMany("Districts")
                        .HasForeignKey("MunicipalityId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Municipality");
                });

            modelBuilder.Entity("Entity", b =>
                {
                    b.HasOne("District", "District")
                        .WithMany("Entities")
                        .HasForeignKey("DistrictId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("EntityType", "EntityType")
                        .WithMany("Entities")
                        .HasForeignKey("EntityTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("District");

                    b.Navigation("EntityType");
                });

            modelBuilder.Entity("Municipality", b =>
                {
                    b.HasOne("Province", "Province")
                        .WithMany("Municipalities")
                        .HasForeignKey("ProvinceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Province");
                });

            modelBuilder.Entity("Restaurant", b =>
                {
                    b.HasOne("Entity", "Entity")
                        .WithMany()
                        .HasForeignKey("EntityId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Entity");
                });

            modelBuilder.Entity("District", b =>
                {
                    b.Navigation("Entities");
                });

            modelBuilder.Entity("EntityType", b =>
                {
                    b.Navigation("Entities");
                });

            modelBuilder.Entity("Municipality", b =>
                {
                    b.Navigation("Districts");
                });

            modelBuilder.Entity("Province", b =>
                {
                    b.Navigation("Municipalities");
                });
#pragma warning restore 612, 618
        }
    }
}