package com.server.server.data;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class Goods {
    private int id;
    private String category;


    private String brand;


    private String goodsTitle;


    private Float goodsPrice;


    private Integer goodsSales;


    private Integer cmtNum;


    private Integer goodsReserve;


    private String goodsImg;


    private String goodsParams;


    private String goodsDesc;


    private Integer shopId;


}
