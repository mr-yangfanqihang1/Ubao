package com.server.server.mapper;

import com.server.server.data.Order;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface OrderMapper {
    @Select("SELECT * FROM `order` WHERE id = #{id}")
    Order findById(int id);

    @Select("SELECT * FROM `order`")
    List<Order> findAll();

    @Insert("INSERT INTO `order`(user_id, username, goods_id, shop_name, goods_img, goods_name, goods_desc, goods_num, goods_price, status) VALUES(#{userId}, #{username}, #{goodsId}, #{shopName}, #{goodsImg}, #{goodsName}, #{goodsDesc}, #{goodsNum}, #{goodsPrice}, #{status})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insert(Order order);

    @Update("UPDATE `order` SET user_id=#{userId}, username=#{username}, goods_id=#{goodsId}, shop_name=#{shopName}, goods_img=#{goodsImg}, goods_name=#{goodsName}, goods_desc=#{goodsDesc}, goods_num=#{goodsNum}, goods_price=#{goodsPrice}, status=#{status} WHERE id=#{id}")
    void update(Order order);

    @Delete("DELETE FROM `order` WHERE id=#{id}")
    void delete(int id);
}

