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
//    @CrossOrigin(origins = "http://localhost:7000")
    public Response<List<Goods>> getGoodsList() {
        List<Goods> list= goodsMapper.getGoodsList();
        Response<List<Goods>> result = new Response<>();
        result.setData(list);
        return result;
    }}
