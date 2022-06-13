package com.github.gadenko.gamereviewsite.backend.controller.status;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

@AllArgsConstructor
@Builder
@Data
public class ErrorResponse {
    private String errorMessage;
    private LocalDateTime timestamp;
    private String requestUri;
    private HttpStatus error;
}
