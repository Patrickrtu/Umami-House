﻿using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace RestaurantAPI.Models;

public partial class OrderItem
{
    public int OrderItemId { get; set; }

    public int OrderId { get; set; }

    public int MenuItemId { get; set; }

    public int Quantity { get; set; }

    public virtual MenuItem MenuItem { get; set; } = null!;

    [JsonIgnore]
    public virtual TakeoutOrder Order { get; set; } = null!;
}
