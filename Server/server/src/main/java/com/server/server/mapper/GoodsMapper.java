package com.server.server.mapper;
import com.server.server.data.Goods;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface GoodsMapper {
    @Select("SELECT * FROM goods WHERE id = #{id}")
    Goods findById(int id);

    @Select("SELECT * FROM goods")
    List<Goods> findAll();

    @Select("SELECT * FROM goods WHERE shop_id = #{shop_id}")
    List<Goods> selectGoodsByShopId(int shop_id);

    @Insert("INSERT INTO goods(category, brand, goods_title, goods_price, goods_sales, cmt_num, goods_reserve, goods_img, goods_params, goods_desc, shop_id) VALUES(#{category}, #{brand}, #{goodsTitle}, #{goodsPrice}, #{goodsSales}, #{cmtNum}, #{goodsReserve}, #{goodsImg}, #{goodsParams}, #{goodsDesc}, #{shopId})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insert(Goods goods);

    @Update("UPDATE goods SET category=#{category}, brand=#{brand}, goods_title=#{goodsTitle}, goods_price=#{goodsPrice}, goods_sales=#{goodsSales}, cmt_num=#{cmtNum}, goods_reserve=#{goodsReserve}, goods_img=#{goodsImg}, goods_params=#{goodsParams}, goods_desc=#{goodsDesc}, shop_id=#{shopId} WHERE id=#{id}")
    void update(Goods goods);

    @Delete("DELETE FROM goods WHERE id=#{id}")
    void delete(int id);

    @Select("SELECT * FROM goods limit 100")
    List<Goods> getGoodsList();

    @Select("SELECT * FROM goods ")
    List<Goods> getmoreGoodsList();

    @Select("<script>" +
    "SELECT * FROM goods " +
    "<where> " +
    "  <if test='searchQuery != null and searchQuery != \"\"'> " +
    "    goods_title LIKE CONCAT('%', #{searchQuery}, '%') " +
    "  </if> " +
    "  <if test='tag != null and tag != \"\"'> " +
    "    AND goods_title LIKE CONCAT('%', #{tag}, '%') " +
    "  </if> " +
    "</where> " +
    "<if test='sort != null'> " +
    "  ORDER BY " +
    "  <choose> " +
    "    <when test='sort == \"price\"'> goods_price </when> " +
    "    <when test='sort == \"sales\"'> goods_sales DESC </when> " +
    "  </choose> " +
    "</if> " +
    "limit 100"+
    "</script>")
List<Goods> searchGoods(@Param("searchQuery") String searchQuery, @Param("tag") String tag, @Param("sort") String sort);

}
