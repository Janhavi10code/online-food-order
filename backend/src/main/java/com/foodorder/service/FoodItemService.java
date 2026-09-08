package com.foodorder.service;

import com.foodorder.model.FoodItem;
import com.foodorder.repository.FoodItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FoodItemService {

    @Autowired
    private FoodItemRepository foodItemRepository;

    public List<FoodItem> getAllFoodItems() {
        return foodItemRepository.findAll();
    }

    public Optional<FoodItem> getFoodItemById(Long id) {
        return foodItemRepository.findById(id);
    }

    public List<FoodItem> getFoodsByCategory(String category) {
        return foodItemRepository.findByCategoryIgnoreCase(category);
    }

    public List<FoodItem> getFoodsByRestaurant(Long restaurantId) {
        return foodItemRepository.findByRestaurantId(restaurantId);
    }

    public List<FoodItem> searchFoods(String query) {
        if (query == null || query.trim().isEmpty()) {
            return getAllFoodItems();
        }
        return foodItemRepository.searchFoods(query.trim());
    }

    public List<FoodItem> getVegFoods() {
        return foodItemRepository.findByIsVegTrue();
    }

    public FoodItem saveFoodItem(FoodItem foodItem) {
        return foodItemRepository.save(foodItem);
    }
}
