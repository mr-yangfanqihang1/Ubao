package com.server.server.controller;
import com.server.server.data.Response;
import com.server.server.controller.request.*;
import com.server.server.service.OrderService;

import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/addGoods")
    public Response addGoodsToCart(@RequestHeader("Authorization") String token, @RequestBody CreateOrder request) {
        // 处理添加商品到购物车的逻辑
        return orderService.createOrder(token, request);
    }

    @PostMapping("/cartItems")
    public Response getCartItems(@RequestHeader("Authorization") String token,@RequestParam Integer userId,@RequestParam Integer status) {
        // 处理获取购物车信息的逻辑
        System.out.println("userID: " + userId);
        return orderService.getCartItems(userId,status);
    }

    @PostMapping("/updateNum")
    public Response updateGoodsNum(@RequestHeader("Authorization") String token, @RequestBody UpdateNum request) {
        // 处理更新购物车中商品数量的逻辑
        return orderService.updateNum(token, request);
    }

    @PostMapping("/delete")
    public Response deleteCartGoods(@RequestHeader("Authorization") String token, @RequestBody DeleteOrder request) {
        // 处理删除购物车中商品的逻辑
        return orderService.deleteOrder(token, request);
    }

    @PostMapping("/settlement")
    public Response settlement(@RequestHeader("Authorization") String token, @RequestBody UpdateStatus request) {
        // 处理购物车结算的逻辑
        return orderService.updateStatus(token, request);
    }

    @PostMapping("/clearGoods")
    public Response clearGoods(@RequestHeader("Authorization") String token) {
        // 处理清空购物车的逻辑
        return orderService.clearGoods(token);
    }

}
