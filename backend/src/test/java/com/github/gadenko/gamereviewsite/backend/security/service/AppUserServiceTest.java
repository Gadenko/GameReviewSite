package com.github.gadenko.gamereviewsite.backend.security.service;

import com.github.gadenko.gamereviewsite.backend.security.dto.CreateAppUserDto;
import com.github.gadenko.gamereviewsite.backend.security.model.AppUser;
import com.github.gadenko.gamereviewsite.backend.security.repository.AppUserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.password.PasswordEncoder;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AppUserServiceTest {

    private final AppUserRepository appUserRepository = mock(AppUserRepository.class);
    private final PasswordEncoder passwordEncoder = mock(PasswordEncoder.class);
    private final AppUserService appUserService = new AppUserService(appUserRepository, passwordEncoder);

    @Test
    void addNewAppUser() {
        //Given
        AppUser appUserToAdd = AppUser
                .builder()
                .username("Hans")
                .password("geheim")
                .build();
        when(appUserRepository.insert(appUserToAdd)).thenReturn(AppUser
                .builder()
                .id("23")
                .username("Hans")
                .password("geheim")
                .build());
        when(passwordEncoder.encode("geheim")).thenReturn("geheim");
        //When
        CreateAppUserDto newAppUser = CreateAppUserDto
                .builder()
                .username("Hans")
                .password("geheim")
                .build();
        AppUser actual = appUserService.addNewAppUser(newAppUser);
        //Then
        AppUser expected = AppUser
                .builder()
                .id("23")
                .username("Hans")
                .password("geheim")
                .build();
        verify(appUserRepository).insert(appUserToAdd);
        assertEquals(expected, actual);
    }
}