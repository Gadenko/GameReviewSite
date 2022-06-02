package com.github.gadenko.gamereviewsite.backend.security.controller;

import com.github.gadenko.gamereviewsite.backend.security.dto.CreateAppUserDto;
import com.github.gadenko.gamereviewsite.backend.security.model.AppUser;
import com.github.gadenko.gamereviewsite.backend.security.service.AppUserDetailsService;
import com.github.gadenko.gamereviewsite.backend.security.service.AppUserService;
import com.github.gadenko.gamereviewsite.backend.security.service.JWTUtilService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AppUserAuthController {

    private final AuthenticationManager authenticationManager;
    private final JWTUtilService jwtUtilService;
    private final AppUserService appUserService;


    @Autowired
    public AppUserAuthController(AuthenticationManager authenticationManager, JWTUtilService jwtUtilService, AppUserDetailsService appUserDetailsService, AppUserService appUserService) {
        this.authenticationManager = authenticationManager;
        this.jwtUtilService = jwtUtilService;
        this.appUserService = appUserService;
    }

    @PostMapping("/login")
    public String login(@RequestBody AppUser appUser) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(appUser.getUsername(), appUser.getPassword()));
        return jwtUtilService.createToken(appUser.getUsername());
    }

    @PostMapping
    public AppUser postNewAppUser(@RequestBody CreateAppUserDto newAppUser){
        return appUserService.addNewAppUser(newAppUser);
    }
}
