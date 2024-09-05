// GoodsController.java
package com.server.server.controller;

import com.server.server.data.Response;
import com.server.server.data.Goods;

import com.server.server.mapper.GoodsMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;



@RestController
@CrossOrigin


public class Goods1Controller {

    @Autowired
    GoodsMapper goodsMapper;

    @GetMapping("/api/goodlistt")
    public Response<Goods> getGoodsById(@RequestParam int id) {
        Goods goods = goodsMapper.findById(id);
        Response<Goods> result = new Response<>();
        result.setData(goods);
        return result;
    }
}

