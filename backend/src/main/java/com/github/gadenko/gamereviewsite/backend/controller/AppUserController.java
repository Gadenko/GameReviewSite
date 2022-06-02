package com.github.gadenko.gamereviewsite.backend.controller;

import com.github.gadenko.gamereviewsite.backend.dto.AppUserDto;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;

@RestController
@RequestMapping("/api/user/")
public class AppUserController {

    @GetMapping("me")
    public AppUserDto getLoggedInUser(Principal principal) {
        return new AppUserDto(principal.getName());
    }
}
