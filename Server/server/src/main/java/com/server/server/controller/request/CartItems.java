package com.server.server.controller.request;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartItems {

    private int shop_id;
    private String shop_name;
    private List<Items> items;
   
}
