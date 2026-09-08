package com.foodorder.repository;

import com.foodorder.model.FoodItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FoodItemRepository extends JpaRepository<FoodItem, Long> {
    List<FoodItem> findByCategoryIgnoreCase(String category);
    List<FoodItem> findByRestaurantId(Long restaurantId);
    List<FoodItem> findByIsVegTrue();
    
    @Query("SELECT f FROM FoodItem f WHERE LOWER(f.name) LIKE LOWER(CONCAT('%', :query, '%')) " +
           "OR LOWER(f.description) LIKE LOWER(CONCAT('%', :query, '%')) " +
           "OR LOWER(f.category) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<FoodItem> searchFoods(@Param("query") String query);
}
