package com.server.server.data;

import com.server.server.controller.request.CreateOrder;
import com.server.server.controller.request.QueryOrder;
import com.server.server.controller.request.UpdateStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Order {
    private int id;
    private int userId;
    private int goodsId;
    private int num;
    private int total;
    private int status;

    public static Order convertToOrder(CreateOrder createOrder) {
        return new Order(
            0, 
            createOrder.getUser_id(),
            createOrder.getGoods_id(),
            createOrder.getNum(),
            (int) createOrder.getTotal(), 
            createOrder.getStatus()
        );
    }


    public static Order convertToOrder(QueryOrder queryOrder) {
        return new Order(
            0,
            queryOrder.getUser_Id(),
            0,
            0,
            0,
            queryOrder.getStatus()
        );
    }



    public static Order convertToOrder(UpdateStatus updateStatus) {
        return new Order(
            updateStatus.getOrder_id(),
            0,
            0,
            0,
            0,
            updateStatus.getStatus()
        );
    }
}
