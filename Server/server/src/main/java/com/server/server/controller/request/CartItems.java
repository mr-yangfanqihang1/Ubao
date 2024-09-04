package com.server.server.controller.request;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartItems {
      //隐藏属性，不展示，赋值需要
   // private int goods_id;
    private int shop_id;
    private String shop_name;
    private List<Items> items;
   
}
