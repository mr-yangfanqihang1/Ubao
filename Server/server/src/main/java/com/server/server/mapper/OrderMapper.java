package com.server.server.mapper;

import com.server.server.controller.request.CartItems;
import com.server.server.controller.request.Items;
import com.server.server.data.Order;
import java.util.List;
import org.apache.ibatis.annotations.*;
import org.apache.ibatis.mapping.FetchType;

@Mapper
public interface OrderMapper {
    @Select("SELECT * FROM `order` WHERE id = #{id}")
    Order findById(int id);

    @Select("SELECT * FROM `order`")
    List<Order> findAll();

    //注意DISTINCT
    // 主查询
    @Select("SELECT DISTINCT o.order_id,g.shop_id, s.shop_name " +
    "FROM `order` o " +
    "JOIN goods g ON o.goods_id = g.id " +
    "JOIN shop s ON g.shop_id = s.id " +
    "WHERE o.user_id = #{userId} AND o.status = #{status}")
    @Results({
    @Result(property = "order_id", column = "order_id"),
    @Result(property = "shop_id", column = "shop_id"),
    @Result(property = "shop_name", column = "shop_name"),
    @Result(property = "items", column = "shop_id", javaType = List.class, 
        many = @Many(select = "selectGoodsByShopId", 
                    fetchType = FetchType.EAGER))
    })
    List<CartItems> getCartItems(@Param("userId") int userId, @Param("status") int status);

    // 子查询
    @Select("SELECT g.id AS goods_id, g.goods_img, g.goods_title AS goods_name, " +
        "o.num AS goods_num, g.goods_price " +
        "FROM `order` o " +
        "JOIN goods g ON o.goods_id = g.id " +
        "WHERE o.user_id = #{userId} AND o.status = #{status} AND g.shop_id = #{shop_id}")
    @Results({
        @Result(property = "goods_id", column = "goods_id"),
        @Result(property = "goods_img", column = "goods_img"),
        @Result(property = "goods_name", column = "goods_name"),
        @Result(property = "goods_num", column = "goods_num"),
        @Result(property = "goods_price", column = "goods_price")
    })
    List<Items> selectGoodsByShopId(@Param("shop_id") int shop_id, @Param("userId") int userId,  @Param("status") int status);




    
    @Insert("INSERT INTO `order`(user_id, goods_id,goods_num,total, status) VALUES(#{userId},  #{goodsId}, #{num},#{total}, #{status})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insert(Order order);

    @Update("UPDATE `order` SET status=#{status}")
    int updateStatus(Order order);

    @Update("UPDATE `order` SET goods_num=#{num} ")
    int updateNum(Order order);

    @Delete("DELETE FROM `order` WHERE id=#{id}")
    int delete(int orderId);

}

