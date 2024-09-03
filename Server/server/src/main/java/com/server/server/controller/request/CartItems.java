package com.server.server.controller.request;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartItems {
    int goods_id;   //隐藏属性，不展示，赋值需要
    int shop_id;
    String shop_name;
    List<Items> items;
   
}
