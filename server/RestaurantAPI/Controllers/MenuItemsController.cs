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
    public class MenuItemsController : ControllerBase
    {
        private readonly JapaneseRestaurantDbContext _context;

        public MenuItemsController(JapaneseRestaurantDbContext context)
        {
            _context = context;
        }

        // GET: api/MenuItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MenuItemDTO>>> GetMenuItems()
        {
            // Retrieve menuItem records from database
            var menuItems = await _context.MenuItems.ToListAsync();

            // Map entities to DTOs
            var menuItemDTOs = menuItems.Select(m => new MenuItemDTO
            {
                ItemId = m.ItemId,
                Name = m.Name,
                Description = m.Description,
                IsAvailable = m.IsAvailable,
                Price = m.Price,
                Category = m.Category,
            }
            );

            return Ok(menuItemDTOs);
        }

        // GET: api/MenuItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MenuItemDTO>> GetMenuItem(int id)
        {
            var menuItem = await _context.MenuItems.FindAsync(id);

            if (menuItem == null)
            {
                return NotFound();
            }

            var menuItemDTO = new MenuItemDTO
            {
                ItemId = menuItem.ItemId,
                Name = menuItem.Name,
                Description = menuItem.Description,
                IsAvailable = menuItem.IsAvailable,
                Price = menuItem.Price,
                Category = menuItem.Category,
            };

            return menuItemDTO;
        }

        // PUT: api/MenuItems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMenuItem(int id, MenuItemDTO menuItemDTO)
        {
            if (id != menuItemDTO.ItemId)
            {
                return BadRequest();
            }

            var menuItem = new MenuItem
            {
                ItemId = menuItemDTO.ItemId,
                Name = menuItemDTO.Name,
                Description = menuItemDTO.Description,
                IsAvailable = menuItemDTO.IsAvailable,
                Price = menuItemDTO.Price,
                Category = menuItemDTO.Category,
            };

            _context.Entry(menuItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MenuItemExists(id))
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

        // POST: api/MenuItems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<MenuItemDTO>> PostMenuItem(MenuItemDTO menuItemDTO)
        {
            // First map DTO to Entity
            var menuItem = new MenuItem
            {
                ItemId = menuItemDTO.ItemId,
                Name = menuItemDTO.Name,
                Description = menuItemDTO.Description,
                IsAvailable = menuItemDTO.IsAvailable,
                Price = menuItemDTO.Price,
                Category = menuItemDTO.Category,
            };

            _context.MenuItems.Add(menuItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMenuItem", new { id = menuItem.ItemId }, menuItemDTO);
        }

        // DELETE: api/MenuItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMenuItem(int id)
        {
            var menuItem = await _context.MenuItems.FindAsync(id);
            if (menuItem == null)
            {
                return NotFound();
            }

            _context.MenuItems.Remove(menuItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MenuItemExists(int id)
        {
            return _context.MenuItems.Any(e => e.ItemId == id);
        }
    }
}