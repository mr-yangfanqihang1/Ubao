package com.server.server.data;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Goods {
    private int id;
    private String category;
    private String brand;
    private String goodsTitle;
    private float goodsPrice;
    private int goodsSales;
    private int cmtNum;
    private int goodsReserve;
    private String goodsImg;
    private String goodsParams;
    private String goodsDesc;
    private int shopId;

}
