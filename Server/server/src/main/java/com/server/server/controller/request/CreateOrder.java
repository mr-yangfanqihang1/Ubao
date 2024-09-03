package com.server.server.controller.request;

import lombok.Data;

@Data
public class CreateOrder {
    private int user_id;
    private int goods_id;
    private int num;
    private double total;
    private int status;
    
    
}


