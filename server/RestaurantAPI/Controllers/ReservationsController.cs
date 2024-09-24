using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestaurantAPI.Models;
using RestaurantAPI.DTOs;

namespace RestaurantAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationsController : ControllerBase
    {
        private readonly JapaneseRestaurantDbContext _context;

        public ReservationsController(JapaneseRestaurantDbContext context)
        {
            _context = context;
        }

        // GET: api/Reservations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Reservation>>> GetReservations()
        {
            return await _context.Reservations
                        .Include(r => r.Table)
                        .ToListAsync();
        }

        // GET: api/Reservations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Reservation>> GetReservation(int id)
        {
            var reservation = await _context.Reservations
                    .Include(r => r.Table)
                    .SingleOrDefaultAsync(res => res.ReservationId == id);

            if (reservation == null)
            {
                return NotFound();
            }

            return reservation;
        }

        [HttpGet("byname")]
        public async Task<ActionResult<IEnumerable<Reservation>>> GetReservationByName([FromQuery] string name)
        {
            var reservation = await _context.Reservations
                    .Include(r => r.Table)
                    .Where(r => r.CustomerName == name)
                    .ToListAsync();

            if (reservation.Count == 0)
            {
                return NotFound();
            }

            return Ok(reservation);
        }

        // PUT: api/Reservations/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReservation(int id, CreateReservationDTO reservationDTO)
        {
            if (id != reservationDTO.ReservationId)
            {
                return BadRequest();
            }

            var reservation = new Reservation
            {
                ReservationId = reservationDTO.ReservationId,
                TableId = reservationDTO.TableId,
                CustomerName = reservationDTO.CustomerName,
                CustomerEmail = reservationDTO.CustomerEmail,
                CustomerPhone = reservationDTO.CustomerPhone,
                PartySize = reservationDTO.PartySize,
                Date = reservationDTO.Date,
                Time = reservationDTO.Time,
                SpecialRequests = reservationDTO.SpecialRequests,
                Status = reservationDTO.Status,
            };

            _context.Entry(reservation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReservationExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Reservations
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Reservation>> PostReservation(CreateReservationDTO reservationDTO)
        {
            // Perhaps add validation to ensure only avaliable tables are reserved  

            var reservation = new Reservation
            {
                TableId = reservationDTO.TableId,
                CustomerName = reservationDTO.CustomerName,
                CustomerEmail = reservationDTO.CustomerEmail,
                CustomerPhone = reservationDTO.CustomerPhone,
                PartySize = reservationDTO.PartySize,
                Date = reservationDTO.Date,
                Time = reservationDTO.Time,
                SpecialRequests = reservationDTO.SpecialRequests,
                Status = reservationDTO.Status,
            };

            _context.Reservations.Add(reservation);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetReservation", new { id = reservation.ReservationId }, reservation);
        }

        // DELETE: api/Reservations/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReservation(int id)
        {
            var reservation = await _context.Reservations.FindAsync(id);
            if (reservation == null)
            {
                return NotFound();
            }

            _context.Reservations.Remove(reservation);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ReservationExists(int id)
        {
            return _context.Reservations.Any(e => e.ReservationId == id);
        }
    }
}
