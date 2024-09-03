// Shop.java
package com.server.server.data;


import lombok.Data;

@Data
public class Shop {
    private int id;
    private String shopName;
    private int sellerId;
    private String sellerName;
    private String shopImg;
    private float shopIncome;
    private String location;
    private String reputation;
    private String qualify;
    private float gradeDesc;
    private float gradeService;
    private float gradeLogistics;
    private int years;
}

