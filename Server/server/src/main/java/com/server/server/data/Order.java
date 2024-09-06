package com.server.server.data;
import com.server.server.controller.request.CreateOrder;
import com.server.server.controller.request.DeleteOrder;
import com.server.server.controller.request.UpdateNum;
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
    private double total;
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

    public static Order convertToOrder(DeleteOrder deleteOrder) {
        return new Order(
            deleteOrder.getOrder_id(),
            deleteOrder.getUser_id(),
            0,
            0,
            0,
            0
        );
    }

    public static Order convertToOrder(UpdateNum updateNum) {
        return new Order(
            updateNum.getOrder_id(),
            updateNum.getUser_id(),
            0,
            updateNum.getNum(),
            0,
            0
        );
    }

    public static Order convertToOrder(UpdateStatus updateStatus) {
        return new Order(
            updateStatus.getOrder_id(),
            updateStatus.getUser_id(),
            0,
            updateStatus.getNum(),
            updateStatus.getTotal(),
            updateStatus.getStatus()
        );
    }

}
