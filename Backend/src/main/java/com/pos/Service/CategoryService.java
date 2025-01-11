package com.pos.Service;

import com.pos.Entity.Category;
import com.pos.Repository.CategoryRepo;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Data
@AllArgsConstructor
public class CategoryService {

    @Autowired
    private CategoryRepo categoryRepo;

    public String addCategory(Category category){
        categoryRepo.save(category);
        return "category save done";
    }

    public String deleteCategory(Category category){
        categoryRepo.delete(category);
        return "category delete done";
    }

    public List<Category> getAll(){
        return categoryRepo.findAll();
    }
}
