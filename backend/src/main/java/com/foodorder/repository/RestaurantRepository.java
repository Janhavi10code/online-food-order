package com.foodorder.repository;

import com.foodorder.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
    List<Restaurant> findByIsFeaturedTrue();
    List<Restaurant> findByCuisineTypesContainingIgnoreCase(String cuisine);
    List<Restaurant> findByNameContainingIgnoreCase(String query);
}
