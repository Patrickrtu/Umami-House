namespace RestaurantAPI.DTOs
{
    public class MenuItemDTO
    {
        public int ItemId { get; set; }

        public string Name { get; set; }

        public string? Description { get; set; }
        public bool? IsAvailable { get; set; }

        public decimal Price { get; set; }

        public string Category { get; set; }
    }
}
