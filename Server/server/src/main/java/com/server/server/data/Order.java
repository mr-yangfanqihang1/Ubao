package com.server.server.data;

import lombok.Data;

@Data
public class Order {
    private int id;
    private int userId;
    private String username;
    private int goodsId;
    private String shopName;
    private String goodsImg;
    private String goodsName;
    private String goodsDesc;
    private int goodsNum;
    private float goodsPrice;
    private int status;
    // Getters and Setters
}
