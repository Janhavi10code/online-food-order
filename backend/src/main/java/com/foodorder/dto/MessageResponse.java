package com.foodorder.dto;

import java.time.LocalDateTime;

public class MessageResponse {
    private String message;
    private boolean success;
    private LocalDateTime timestamp = LocalDateTime.now();

    public MessageResponse() {}

    public MessageResponse(String message, boolean success) {
        this.message = message;
        this.success = success;
        this.timestamp = LocalDateTime.now();
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
