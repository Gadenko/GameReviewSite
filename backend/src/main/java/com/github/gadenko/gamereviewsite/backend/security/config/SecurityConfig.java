package com.github.gadenko.gamereviewsite.backend.security.config;

import com.github.gadenko.gamereviewsite.backend.security.filter.JWTAuthFilter;
import com.github.gadenko.gamereviewsite.backend.security.service.AppUserDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final AppUserDetailsService appUserDetailsService;
    private final JWTAuthFilter jwtAuthFilter;

    public SecurityConfig(AppUserDetailsService appUserDetailsService, JWTAuthFilter jwtAuthFilter) {
        this.appUserDetailsService = appUserDetailsService;
        this.jwtAuthFilter = jwtAuthFilter;
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(appUserDetailsService);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
       return new Argon2PasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable().authorizeRequests()
                .antMatchers("/api/gamereview").permitAll()
                .antMatchers("/api/gamereview/registration").permitAll()
                .antMatchers("/api/**").permitAll()
                .antMatchers("/api/gamereview/${id}").authenticated()
                .antMatchers("/auth/login").permitAll()
                .antMatchers("/**").permitAll()
                .and().addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    }
}
