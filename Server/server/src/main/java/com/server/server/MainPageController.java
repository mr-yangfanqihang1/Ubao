package com.server.server;

import com.server.server.data.Goods;
import com.server.server.data.Result;
import com.server.server.data.Shop;
import com.server.server.mapper.GoodsMapper;
import com.server.server.mapper.ShopMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
public class MainPageController {

    @Autowired
    GoodsMapper goodsMapper;

    @GetMapping("/api/goodslist")
//    @CrossOrigin(origins = "http://localhost:7000")
    public Result<List<Goods>> getGoodsList() {
        List<Goods> list= goodsMapper.getGoodsList();
        Result<List<Goods>> result = new Result<>();
        result.setData(list);
        return result;
    }
}
