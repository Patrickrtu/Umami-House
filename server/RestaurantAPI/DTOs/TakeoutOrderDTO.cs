using RestaurantAPI.Models;

namespace RestaurantAPI.DTOs
{
    public class TakeoutOrderDTO
    {
        public int OrderId { get; set; }

        public DateTime OrderDate { get; set; }

        public DateTime PickupTime { get; set; }

        public string Status { get; set; } = null!;
        public decimal TotalAmount { get; set; }

        public virtual ICollection<OrderItemsDTO> OrderItems { get; set; } = new List<OrderItemsDTO>();
    }
}
