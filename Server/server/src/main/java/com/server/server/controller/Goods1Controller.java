// GoodsController.java
package com.server.server.controller;

import com.server.server.controller.request.CreateOrder;
import com.server.server.data.Order;
import com.server.server.data.Response;
import com.server.server.data.Goods;

import com.server.server.mapper.GoodsMapper;

import com.server.server.mapper.OrderMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;



@RestController
@CrossOrigin


public class Goods1Controller {

    @Autowired
    GoodsMapper goodsMapper;
    @Autowired
    private OrderMapper orderMapper;

    @GetMapping("/api/goodlistt")
    public Response<Goods> getGoodsById(@RequestParam int id) {
        Goods goods = goodsMapper.findById(id);
        Response<Goods> result = new Response<>();
        result.setData(goods);
        return result;
    }

    @PostMapping("/api/createOrder")
    public Response<Integer> createOrder(@RequestBody CreateOrder createOrder) {
        Order order = Order.convertToOrder(createOrder);
        int result= orderMapper.insert(order);
        if (result > 0) {
            return new Response<>(1, "添加商品到购物车成功！", null);
        } else {
            return new Response<>(2, "添加商品失败，请重新尝试！", null);
        }
    }
}

