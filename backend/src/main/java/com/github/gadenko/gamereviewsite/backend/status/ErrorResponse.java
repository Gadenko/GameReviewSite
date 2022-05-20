package com.github.gadenko.gamereviewsite.backend.status;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

@AllArgsConstructor
@Builder
@Data
public class ErrorResponse {
    private String errorMessage;
    private LocalDateTime timestamp;
    private String requestUri;
}
