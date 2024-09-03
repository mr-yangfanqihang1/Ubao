package com.server.server.mapper;

import com.server.server.controller.request.CartItems;
import com.server.server.controller.request.Items;
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

    @Select("SELECT g.id,g.shop_id AS order_shop_id, s.shop_name, g.* FROM `order` o , goods g,shop s   WHERE  o.user_id = #{userId} AND o.status=0 AND o.goods_id = g.id AND g.shop_id=s.id ")
    @Results({//!!!!!!!!!!注意名字冲突,三列全有id,不能重名,且goods_id必须和selectGoodsByGoodsId参数一致
        @Result(property = "goods_id", column = "id"),
        @Result(property = "shop_id", column = "order_shop_id"),        //会与下面的shop_id冲突
        @Result(property = "shop_name", column = "shop_name"),
        @Result(property = "items", column = "goods_id", javaType = List.class, many = @Many(select = "selectGoodsByGoodsId"))
    })
    List<CartItems> getCartItems(int userId);
    //!!!!!重要!!!!!goods_num不是goods表中的goods_num而是order表中的goods_num
    @Select("SELECT g.id AS goods_id, goods_img, goods_title AS goods_name, o.num AS goods_num, goods_price FROM goods g,`order` o WHERE g.id = #{goods_id} AND o.goods_id=g.id;")
    List<Items> selectGoodsByGoodsId(int goods_id);

    
    @Insert("INSERT INTO `order`(user_id, username, goods_id, shop_name, goods_img, goods_name, goods_desc, goods_num, goods_price, status) VALUES(#{userId}, #{username}, #{goodsId}, #{shopName}, #{goodsImg}, #{goodsName}, #{goodsDesc}, #{goodsNum}, #{goodsPrice}, #{status})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insert(Order order);

    @Update("UPDATE `order` SET user_id=#{userId}, username=#{username}, goods_id=#{goodsId}, shop_name=#{shopName}, goods_img=#{goodsImg}, goods_name=#{goodsName}, goods_desc=#{goodsDesc}, goods_num=#{goodsNum}, goods_price=#{goodsPrice}, status=#{status} WHERE id=#{id}")
    int update(Order order);

    @Delete("DELETE FROM `order` WHERE id=#{id}")
    int delete(int id);

}

