package com.server.server.mapper;

import com.server.server.data.Goods;
import com.server.server.data.Shop;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface GoodsMapper {

    @Select("select * from goods limit 100")
    List<Goods> getGoodsList();

}
