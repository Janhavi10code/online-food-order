package com.foodorder.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "restaurants")
public class Restaurant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false)
    private String name;

    private String tagline;

    // E.g. "South Indian, Dosa, Filter Coffee" or "Authentic Maharashtrian & Street Food"
    private String cuisineTypes;

    private Double rating = 4.5;

    private Integer totalRatings = 120;

    private Integer deliveryTimeMinutes = 30;

    private Double deliveryFee = 25.0;

    private Integer priceForTwo = 400;

    @Column(length = 500)
    private String address;

    @Column(length = 1000)
    private String imageUrl;

    private Boolean isFeatured = true;

    private Boolean isOpen = true;

    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("restaurant")
    private List<FoodItem> foodItems = new ArrayList<>();

    public Restaurant() {
    }

    public Restaurant(String name, String tagline, String cuisineTypes, Double rating, Integer totalRatings,
                      Integer deliveryTimeMinutes, Double deliveryFee, Integer priceForTwo, String address,
                      String imageUrl, Boolean isFeatured) {
        this.name = name;
        this.tagline = tagline;
        this.cuisineTypes = cuisineTypes;
        this.rating = rating;
        this.totalRatings = totalRatings;
        this.deliveryTimeMinutes = deliveryTimeMinutes;
        this.deliveryFee = deliveryFee;
        this.priceForTwo = priceForTwo;
        this.address = address;
        this.imageUrl = imageUrl;
        this.isFeatured = isFeatured;
        this.isOpen = true;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTagline() {
        return tagline;
    }

    public void setTagline(String tagline) {
        this.tagline = tagline;
    }

    public String getCuisineTypes() {
        return cuisineTypes;
    }

    public void setCuisineTypes(String cuisineTypes) {
        this.cuisineTypes = cuisineTypes;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public Integer getTotalRatings() {
        return totalRatings;
    }

    public void setTotalRatings(Integer totalRatings) {
        this.totalRatings = totalRatings;
    }

    public Integer getDeliveryTimeMinutes() {
        return deliveryTimeMinutes;
    }

    public void setDeliveryTimeMinutes(Integer deliveryTimeMinutes) {
        this.deliveryTimeMinutes = deliveryTimeMinutes;
    }

    public Double getDeliveryFee() {
        return deliveryFee;
    }

    public void setDeliveryFee(Double deliveryFee) {
        this.deliveryFee = deliveryFee;
    }

    public Integer getPriceForTwo() {
        return priceForTwo;
    }

    public void setPriceForTwo(Integer priceForTwo) {
        this.priceForTwo = priceForTwo;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Boolean getIsFeatured() {
        return isFeatured;
    }

    public void setIsFeatured(Boolean featured) {
        isFeatured = featured;
    }

    public Boolean getIsOpen() {
        return isOpen;
    }

    public void setIsOpen(Boolean open) {
        isOpen = open;
    }

    public List<FoodItem> getFoodItems() {
        return foodItems;
    }

    public void setFoodItems(List<FoodItem> foodItems) {
        this.foodItems = foodItems;
    }
}
