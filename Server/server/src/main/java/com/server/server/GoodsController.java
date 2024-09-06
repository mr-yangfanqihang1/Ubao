package com.server.server;

import com.server.server.data.Response;
import com.server.server.data.Goods;
import com.server.server.mapper.GoodsMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class GoodsController {

    @Autowired
    GoodsMapper goodsMapper;

    @GetMapping("/api/goodslist1")
    public Response<List<Goods>> searchGoods(
            @RequestParam(required = false) String searchQuery,
            @RequestParam(required = false) String tag,
            @RequestParam(required = false) String sort,
            @RequestParam(defaultValue = "1") int page,  // 默认第一页
            @RequestParam(defaultValue = "100") int pageSize) {  // 默认每页100条
        
        int offset = (page - 1) * pageSize;  // 计算偏移量
        List<Goods> list = goodsMapper.searchGoods(searchQuery, tag, sort, offset, pageSize);
        
        Response<List<Goods>> result = new Response<>();
        result.setData(list);
        return result;
    }
    
}   

