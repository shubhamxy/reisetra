package com.reisetra.rome.auth.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class NotFoundException extends RuntimeException {
  private static final long serialVersionUID = 1L;
  public NotFoundException(String token, String message) {
    super(String.format("Not found [%s]: %s", token, message));
  }
}
