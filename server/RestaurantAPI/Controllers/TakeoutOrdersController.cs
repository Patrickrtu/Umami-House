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
    public class TakeoutOrdersController : ControllerBase
    {
        private readonly JapaneseRestaurantDbContext _context;

        public TakeoutOrdersController(JapaneseRestaurantDbContext context)
        {
            _context = context;
        }

        // GET: api/TakeoutOrders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TakeoutOrder>>> GetTakeoutOrders()
        {
            var takeoutOrders = await _context.TakeoutOrders
                .Include(t => t.OrderItems)
                .ThenInclude(oi => oi.MenuItem)
                .ToListAsync();

            return takeoutOrders;
        }

        // GET: api/TakeoutOrders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TakeoutOrder>> GetTakeoutOrder(int id)
        {
            var takeoutOrder = await _context.TakeoutOrders
                                .Include(t => t.OrderItems)
                                .ThenInclude(oi => oi.MenuItem)
                                .SingleOrDefaultAsync(t => t.OrderId == id);

            if (takeoutOrder == null)
            {
                return NotFound();
            }

            return takeoutOrder;
        }

        // PUT: api/TakeoutOrders/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTakeoutOrder(int id, TakeoutOrder takeoutOrder)
        {
            if (id != takeoutOrder.OrderId)
            {
                return BadRequest();
            }

            _context.Entry(takeoutOrder).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TakeoutOrderExists(id))
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

        // POST: api/TakeoutOrders
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TakeoutOrder>> PostTakeoutOrder(TakeoutOrderDTO takeoutOrderDTO)
        {
            var takeoutOrder = new TakeoutOrder
            {
                OrderDate = takeoutOrderDTO.OrderDate,
                PickupTime = takeoutOrderDTO.PickupTime,
                Status = takeoutOrderDTO.Status,
                TotalAmount = takeoutOrderDTO.TotalAmount,
                OrderItems = takeoutOrderDTO.OrderItems.Select(o => new OrderItem
                {
                    OrderItemId = o.OrderId,
                    OrderId = o.OrderId,
                    MenuItemId = o.MenuItemId,
                    Quantity = o.Quantity,
                }).ToList()
            };

            _context.TakeoutOrders.Add(takeoutOrder);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTakeoutOrder", new { id = takeoutOrder.OrderId }, takeoutOrder);
        }

        // DELETE: api/TakeoutOrders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTakeoutOrder(int id)
        {
            var takeoutOrder = await _context.TakeoutOrders.FindAsync(id);
            if (takeoutOrder == null)
            {
                return NotFound();
            }

            _context.TakeoutOrders.Remove(takeoutOrder);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TakeoutOrderExists(int id)
        {
            return _context.TakeoutOrders.Any(e => e.OrderId == id);
        }
    }
}
