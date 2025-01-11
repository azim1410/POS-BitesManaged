package com.pos.Controller;

import com.pos.Entity.Inventory;
import com.pos.Service.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/inventory")
@RequiredArgsConstructor
public class InventoryController {

    @Autowired
    private  InventoryService inventoryService;

    @PostMapping("/add")
    public ResponseEntity<String> addItem(@RequestBody Inventory inventory) {
        String response = inventoryService.addItem(inventory);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/remove")
    public ResponseEntity<String> removeItem(@RequestBody Inventory inventory) {
        String response = inventoryService.removeItem(inventory);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Inventory>> getAllItems() {
        List<Inventory> items = inventoryService.getAllItem();
        return ResponseEntity.ok(items);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Inventory> getItem(@PathVariable String id) {
        Inventory item = inventoryService.getItem(id);
        return ResponseEntity.ok(item);
    }

    @PutMapping("/{id}/price")
    public ResponseEntity<String> updateItemPrice(@PathVariable String id, @RequestParam double price) {
        String response = inventoryService.updateItemPrice(id, price);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}/quantity")
    public ResponseEntity<String> updateItemQuantity(@PathVariable String id, @RequestParam double quantity) {
        String response = inventoryService.updateItemQuantity(id, quantity);
        return ResponseEntity.ok(response);
    }
}
