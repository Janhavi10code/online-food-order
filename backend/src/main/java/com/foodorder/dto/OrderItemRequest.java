package com.foodorder.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class OrderItemRequest {
    @NotNull
    private Long foodItemId;

    @NotNull
    @Positive
    private Integer quantity;

    private String specialInstructions;

    public OrderItemRequest() {}

    public OrderItemRequest(Long foodItemId, Integer quantity, String specialInstructions) {
        this.foodItemId = foodItemId;
        this.quantity = quantity;
        this.specialInstructions = specialInstructions;
    }

    public Long getFoodItemId() {
        return foodItemId;
    }

    public void setFoodItemId(Long foodItemId) {
        this.foodItemId = foodItemId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getSpecialInstructions() {
        return specialInstructions;
    }

    public void setSpecialInstructions(String specialInstructions) {
        this.specialInstructions = specialInstructions;
    }
}
