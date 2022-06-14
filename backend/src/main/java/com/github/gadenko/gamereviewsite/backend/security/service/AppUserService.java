package com.github.gadenko.gamereviewsite.backend.security.service;

import com.github.gadenko.gamereviewsite.backend.controller.status.NameAlreadyExistException;
import com.github.gadenko.gamereviewsite.backend.security.dto.CreateAppUserDto;
import com.github.gadenko.gamereviewsite.backend.security.model.AppUser;
import com.github.gadenko.gamereviewsite.backend.security.repository.AppUserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AppUserService {

    private final AppUserRepository appUserRepository;
    private final PasswordEncoder passwordEncoder;

    public AppUserService(AppUserRepository appUserRepository, PasswordEncoder passwordEncoder) {
        this.appUserRepository = appUserRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public AppUser addNewAppUser(CreateAppUserDto newAppUser) {
        AppUser newUser = new AppUser();

        if (newAppUser.getUsername() == null) {
            throw new IllegalArgumentException("Username of the given name was null");
        }
        if (appUserRepository.findByUsername(newAppUser.getUsername()).isPresent()) {
            throw new NameAlreadyExistException("The name already exist, please choose another one.");
        }
        if (newAppUser.getPassword() == null) {
            throw new IllegalArgumentException("Password of the given password was null");
        }
        newUser.setUsername(newAppUser.getUsername());
        newUser.setPassword(passwordEncoder.encode(newAppUser.getPassword()));

        return appUserRepository.insert(newUser);
    }
}
