package com.github.gadenko.gamereviewsite.backend.controller.status;

public class NameAlreadyExistException extends RuntimeException{
    public NameAlreadyExistException(String errorMessage){super(errorMessage);}
}
