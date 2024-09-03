package com.server.server.mapper;

import com.server.server.data.Shop;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface ShopMapper {
    @Select("SELECT * FROM shop WHERE id = #{id}")
    Shop findById(int id);

    @Select("SELECT * FROM shop")
    List<Shop> findAll();

    @Insert("INSERT INTO shop(shop_name, seller_id, seller_name, shop_img, shop_income, location, reputation, qualify, grade_desc, grade_service, grade_logistics, years) VALUES(#{shopName}, #{sellerId}, #{sellerName}, #{shopImg}, #{shopIncome}, #{location}, #{reputation}, #{qualify}, #{gradeDesc}, #{gradeService}, #{gradeLogistics}, #{years})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insert(Shop shop);

    @Update("UPDATE shop SET shop_name=#{shopName}, seller_id=#{sellerId}, seller_name=#{sellerName}, shop_img=#{shopImg}, shop_income=#{shopIncome}, location=#{location}, reputation=#{reputation}, qualify=#{qualify}, grade_desc=#{gradeDesc}, grade_service=#{gradeService}, grade_logistics=#{gradeLogistics}, years=#{years} WHERE id=#{id}")
    void update(Shop shop);

    @Delete("DELETE FROM shop WHERE id=#{id}")
    void delete(int id);
}
