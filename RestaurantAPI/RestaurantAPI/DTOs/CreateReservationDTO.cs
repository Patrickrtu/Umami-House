namespace RestaurantAPI.DTOs
{
    public class CreateReservationDTO
    {
        public int ReservationId { get; set; }
        public int? TableId { get; set; }

        public string CustomerName { get; set; } = null!;

        public string CustomerEmail { get; set; } = null!;

        public string? CustomerPhone { get; set; }

        public int PartySize { get; set; }

        public DateTime Date { get; set; }

        public TimeOnly Time { get; set; }

        public string? SpecialRequests { get; set; }
        public string Status { get; set; } = null!;
    }
}
