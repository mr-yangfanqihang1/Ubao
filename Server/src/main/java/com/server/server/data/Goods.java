package com.server.server.data;

import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import java.io.Serializable;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

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
@Accessors(chain = true)
@TableName("goods")
public class Goods implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    @TableField("category")
    private String category;

    @TableField("brand")
    private String brand;

    @TableField("goods_title")
    private String goodsTitle;

    @TableField("goods_price")
    private Float goodsPrice;

    @TableField("goods_sales")
    private Integer goodsSales;

    @TableField("cmt_num")
    private Integer cmtNum;

    @TableField("goods_reserve")
    private Integer goodsReserve;

    @TableField("goods_img")
    private String goodsImg;

    @TableField("goods_params")
    private String goodsParams;

    @TableField("goods_desc")
    private String goodsDesc;

    @TableField("shop_id")
    private Integer shopId;


}
