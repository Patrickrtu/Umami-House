using SendGrid;
using SendGrid.Helpers.Mail;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;

namespace RestaurantAPI.Services 
{
    public class EmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task SendReservationConfirmationAsync(string toEmail, string customerName, string confirmationNumber, DateTime date, TimeOnly time, int partySize)
        {
            var apiKey = _configuration["SendGrid:ApiKey"];
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("muhammad863@revature.net", "Umami House California");
            var subject = "Your Reservation Confirmation - Umami House California";
            var to = new EmailAddress(toEmail, customerName);
            var plainTextContent = $"Thank you for your reservation at Umami House California.";
            var htmlContent = $@"
                <h1>Reservation Confirmation</h1>
                <p>Dear {customerName},</p>
                <p>Thank you for choosing Umami House California. Your reservation details are as follows:</p>
            <ul>
                <li>Confirmation Number: ${confirmationNumber}</li>
                <li>Date: ${date}</li>
                <li>Time: ${time}</li>
                <li>Party Size: ${partySize}</li>
            </ul>
            <p>If you need to modify or cancel your reservation, please contact us at (415) 555-9786</p> 
            <p>You can also use your confirmation number to modify or cancel your reservation on our reservation page</p>
            <p>We look forward to serving you!</p>
            <p>Best regards,<br>Umami House California</p>
            ";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);
        }
    }
}