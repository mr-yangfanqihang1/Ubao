package com.server.server.data;

import java.io.Serializable;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * <p>
 * 
 * </p>
 *
 * @author author
 * @since 2024-09-03
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class Goods implements Serializable {

    private static final long serialVersionUID = 1L;

    private Integer id;


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
