package com.server.server.data;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class Response<T> {
    private int code;
    private String message;
    private T data;
}

