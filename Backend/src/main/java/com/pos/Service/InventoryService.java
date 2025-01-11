package com.pos.Service;

import com.pos.Entity.Inventory;
import com.pos.Repository.InventoryRepo;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Data
@AllArgsConstructor
public class InventoryService {

    @Autowired
    private InventoryRepo inventoryRepo;

    public String addItem(Inventory inventory){
        inventoryRepo.save(inventory);
        return "save done";
    }

    public String removeItem(Inventory inventory){
        inventoryRepo.delete(inventory);
        return "delete done";
    }

    public List<Inventory> getAllItem(){
        return inventoryRepo.findAll();
    }

    public Inventory getItem(String id){
        return inventoryRepo.findById(id).get();
    }

    public  String updateItemPrice(String id,double price){
        Inventory inventory=inventoryRepo.findById(id).get();
        inventory.setPrice(price);
        inventoryRepo.save(inventory);
        return "price update done";
    }

    public  String updateItemQuantity(String id,double quantity){
        Inventory inventory=inventoryRepo.findById(id).get();
        inventory.setQuantity(quantity);
        inventoryRepo.save(inventory);
        return "quantity update done";
    }
}
