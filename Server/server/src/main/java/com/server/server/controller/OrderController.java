package com.server.server.controller;
import com.server.server.data.Response;
import com.server.server.controller.request.*;
import com.server.server.service.OrderService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/createOrder")
    public Response createOrder(@RequestHeader("Authorization") String token, @RequestBody CreateOrder request) {
        return orderService.createOrder(token, request);
    }

    @PostMapping("/cartItems")
    public Response getCartItems(@RequestHeader("Authorization") String token,@RequestParam Integer userId,@RequestParam Integer status,@RequestParam String goodsName) {
        System.out.println("userID: " + userId);
        return orderService.getCartItems(userId,status,goodsName );
    }

    @PostMapping("/delete")
    public Response deleteCartGoods(@RequestHeader("Authorization") String token, @RequestBody DeleteOrder request) {
        return orderService.deleteOrder(token, request);
    }

    @PostMapping("/updateStatus")
    public Response updateStatus(@RequestHeader("Authorization") String token, @RequestBody List<UpdateStatus> request) {
        return orderService.updateStatus(token, request);
    }

    @PostMapping("/updateNum")
    public Response updateNum(@RequestHeader("Authorization") String token, @RequestBody List<UpdateNum> request) {
        return orderService.updateNum(token, request);
    }
    @PostMapping("/selectByName")
    public Response selectByName(@RequestHeader("Authorization") String token,@RequestBody SelectByName request) {
        return orderService.selectByName(token,request);
    }

}
