package com.server.server.service;

import com.server.server.data.Order;
import com.server.server.data.Response;
import com.server.server.controller.request.*;
import com.server.server.mapper.OrderMapper;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderService {

    @Autowired
    private OrderMapper orderMapper;

    public Response<Void> createOrder(String token, CreateOrder request) {
        int result = orderMapper.insert(Order.convertToOrder(request));
        if (result > 0) {
            return new Response<>(1, "添加商品到购物车成功！", null);
        } else {
            return new Response<>(2, "添加商品失败，请重新尝试！", null);
        }
    }

    public Response<List<CartItems>> getCartItems(int userId, int status) {
        try {
            // 调用mapper连接数据库查询
            System.out.println("userId: " + userId);
    
            List<CartItems> cartItems = orderMapper.getCartItems(userId, status);
            
            // 处理空购物车的情况
            if (cartItems == null || cartItems.isEmpty()) {
                return new Response<>(1, "购物车为空", cartItems);
            }
    
            // 遍历购物车中的每个商店，为每个商店获取商品信息
            for (CartItems cartItem : cartItems) {
                int shopId = cartItem.getShop_id(); // 假设CartItems类有getShop_id方法
                List<Items> items = getItemsByShopId(shopId, userId, status); // 调用getItemsByShopId获取商品信息
                cartItem.setItems(items); // 设置商店的商品列表，假设CartItems有setItems方法
            }
    
            return new Response<>(1, "购物车状态请求成功！", cartItems);
        } catch (Exception e) {
            // 处理异常情况
            return new Response<>(-1, "获取购物车信息失败：" + e.getMessage(), null);
        }
    }
    

    public List<Items> getItemsByShopId(int shopId, int userId, int status) {
        // 打印传入的参数值
        System.out.println("shop_id: " + shopId);
        System.out.println("userId: " + userId);
        System.out.println("status: " + status);
        
        // 调用mapper方法
        return orderMapper.selectGoodsByShopId(shopId, userId, status);
    }




    public Response<Void> updateNum(String token, UpdateNum request) {
        int result = orderMapper.update(new Order(/* 初始化 Order 对象 */));
        if (result > 0) {
            return new Response<>(1, "更新购物车商品数量成功！", null);
        } else {
            return new Response<>(4, "更新数据失败，请重试！", null);
        }
    }

    public Response<Void> deleteOrder(String token, DeleteOrder request) {
        int result = orderMapper.delete(request.getOrder_id());
        if (result > 0) {
            return new Response<>(1, "删除购物车商品成功！", null);
        } else {
            return new Response<>(4, "删除商品失败，请重试！", null);
        }
    }

    public Response<Void> updateStatus(String token, UpdateStatus request) {
        int result = orderMapper.update(new Order(/* 初始化 Order 对象 */));
        if (result > 0) {
            return new Response<>(1, "结算成功！", null);
        } else {
            return new Response<>(5, "结算该商品失败，原因未知！", null);
        }
    }

    public Response<Void> clearGoods(String token) {
        // 处理清空购物车的逻辑
        return new Response<>(1, "清空购物车成功", null);
    }
}
