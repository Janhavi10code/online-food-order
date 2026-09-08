package com.foodorder.controller;

import com.foodorder.model.FoodItem;
import com.foodorder.service.FoodItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/foods")
public class FoodItemController {

    @Autowired
    private FoodItemService foodItemService;

    @GetMapping
    public ResponseEntity<List<FoodItem>> getAllFoods() {
        return ResponseEntity.ok(foodItemService.getAllFoodItems());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FoodItem> getFoodById(@PathVariable Long id) {
        return foodItemService.getFoodItemById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<FoodItem>> getFoodsByCategory(@PathVariable String category) {
        return ResponseEntity.ok(foodItemService.getFoodsByCategory(category));
    }

    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<List<FoodItem>> getFoodsByRestaurant(@PathVariable Long restaurantId) {
        return ResponseEntity.ok(foodItemService.getFoodsByRestaurant(restaurantId));
    }

    @GetMapping("/search")
    public ResponseEntity<List<FoodItem>> searchFoods(@RequestParam(required = false, defaultValue = "") String q) {
        return ResponseEntity.ok(foodItemService.searchFoods(q));
    }

    @GetMapping("/veg")
    public ResponseEntity<List<FoodItem>> getVegFoods() {
        return ResponseEntity.ok(foodItemService.getVegFoods());
    }
}
