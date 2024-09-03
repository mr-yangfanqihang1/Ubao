package com.server.server.mapper;

import com.server.server.controller.request.CartItems;
import com.server.server.data.Goods;
import com.server.server.data.Order;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface OrderMapper {
    @Select("SELECT * FROM `order` WHERE id = #{id}")
    Order findById(int id);

    @Select("SELECT * FROM `order`")
    List<Order> findAll();

    @Select("SELECT o.shop_id AS order_shop_id, o.shop_name, g.* FROM `order` o JOIN goods g ON o.goods_id = g.id WHERE o.user_id = #{userId}")
    @Results({
        @Result(property = "shopId", column = "order_shop_id"),        //会与下面的shop_id冲突
        @Result(property = "shopName", column = "shop_name"),
        @Result(property = "goods", column = "shop_id", javaType = List.class, many = @Many(select = "selectGoodsByShopId"))
    })
    List<CartItems> getCartItems(int userId);
    
    @Select("SELECT * FROM goods WHERE shop_id = #{shop_id}")
    List<Goods> selectGoodsByShopId(int shop_id);
    
    @Insert("INSERT INTO `order`(user_id, username, goods_id, shop_name, goods_img, goods_name, goods_desc, goods_num, goods_price, status) VALUES(#{userId}, #{username}, #{goodsId}, #{shopName}, #{goodsImg}, #{goodsName}, #{goodsDesc}, #{goodsNum}, #{goodsPrice}, #{status})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insert(Order order);

    @Update("UPDATE `order` SET user_id=#{userId}, username=#{username}, goods_id=#{goodsId}, shop_name=#{shopName}, goods_img=#{goodsImg}, goods_name=#{goodsName}, goods_desc=#{goodsDesc}, goods_num=#{goodsNum}, goods_price=#{goodsPrice}, status=#{status} WHERE id=#{id}")
    int update(Order order);

    @Delete("DELETE FROM `order` WHERE id=#{id}")
    int delete(int id);

}

