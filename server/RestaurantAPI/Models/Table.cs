using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace RestaurantAPI.Models;

public partial class Table
{
    public int TableId { get; set; }

    public string TableNumber { get; set; } = null!;

    public int Capacity { get; set; }

    public bool? IsAvailable { get; set; }

    [JsonIgnore]
    public virtual ICollection<Reservation> Reservations { get; set; } = new List<Reservation>();
}
