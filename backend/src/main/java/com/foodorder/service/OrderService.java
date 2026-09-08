package com.foodorder.service;

import com.foodorder.dto.OrderItemRequest;
import com.foodorder.dto.OrderRequest;
import com.foodorder.model.*;
import com.foodorder.repository.FoodItemRepository;
import com.foodorder.repository.OrderRepository;
import com.foodorder.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private FoodItemRepository foodItemRepository;

    @Autowired
    private AuthService authService;

    @Transactional
    public Order placeOrder(OrderRequest request) {
        User currentUser = authService.getCurrentUser();
        if (currentUser == null) {
            throw new IllegalStateException("Authentication required to place an order.");
        }

        Restaurant restaurant = restaurantRepository.findById(request.getRestaurantId())
                .orElseThrow(() -> new IllegalArgumentException("Restaurant not found with id: " + request.getRestaurantId()));

        Order order = new Order();
        order.setOrderNumber("ORD-" + System.currentTimeMillis() % 1000000 + "-" + UUID.randomUUID().toString().substring(0, 4).toUpperCase());
        order.setUser(currentUser);
        order.setRestaurant(restaurant);
        order.setDeliveryAddress(request.getDeliveryAddress() != null && !request.getDeliveryAddress().isBlank()
                ? request.getDeliveryAddress() : currentUser.getAddress());
        order.setContactPhone(request.getContactPhone() != null && !request.getContactPhone().isBlank()
                ? request.getContactPhone() : currentUser.getPhone());
        order.setPaymentMethod(request.getPaymentMethod() != null ? request.getPaymentMethod() : "UPI");
        order.setCustomerNotes(request.getCustomerNotes());
        order.setStatus("CONFIRMED");
        order.setEstimatedDeliveryMinutes(restaurant.getDeliveryTimeMinutes());
        order.setCreatedAt(LocalDateTime.now());

        double subtotal = 0.0;
        List<OrderItem> orderItems = new ArrayList<>();

        for (OrderItemRequest itemReq : request.getItems()) {
            FoodItem foodItem = foodItemRepository.findById(itemReq.getFoodItemId())
                    .orElseThrow(() -> new IllegalArgumentException("Food item not found with id: " + itemReq.getFoodItemId()));

            double itemTotal = foodItem.getPrice() * itemReq.getQuantity();
            subtotal += itemTotal;

            OrderItem orderItem = new OrderItem(
                    order,
                    foodItem,
                    foodItem.getName(),
                    foodItem.getPrice(),
                    itemReq.getQuantity(),
                    itemReq.getSpecialInstructions()
            );
            orderItems.add(orderItem);
        }

        double deliveryFee = restaurant.getDeliveryFee() != null ? restaurant.getDeliveryFee() : 30.0;
        double taxes = Math.round((subtotal * 0.05) * 100.0) / 100.0; // 5% GST
        double discount = subtotal > 500 ? 50.0 : 0.0; // Automatic discount for orders above Rs 500
        double finalAmount = Math.max(0, subtotal + deliveryFee + taxes - discount);

        order.setSubtotalAmount(subtotal);
        order.setDeliveryFee(deliveryFee);
        order.setTaxes(taxes);
        order.setDiscount(discount);
        order.setFinalAmount(Math.round(finalAmount * 100.0) / 100.0);
        order.setItems(orderItems);

        return orderRepository.save(order);
    }

    public List<Order> getUserOrders() {
        User currentUser = authService.getCurrentUser();
        if (currentUser == null) {
            return new ArrayList<>();
        }
        return orderRepository.findByUserIdOrderByCreatedAtDesc(currentUser.getId());
    }

    public Order getOrderById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Order not found with id: " + id));
    }

    public Order updateOrderStatus(Long orderId, String newStatus) {
        Order order = getOrderById(orderId);
        order.setStatus(newStatus);
        return orderRepository.save(order);
    }
}
