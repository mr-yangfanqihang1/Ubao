package com.server.server.controller.request;


import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DeleteOrder {
    private int user_id;
    private int order_id;   
}
