package com.server.server.controller.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@AllArgsConstructor
@Data
@NoArgsConstructor
public class Items {
    private int goods_id;
    private String goods_img;
    private String goods_name;
    private int goods_num;
    private double goods_price;
} 
