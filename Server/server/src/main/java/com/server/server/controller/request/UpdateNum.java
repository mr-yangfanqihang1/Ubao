package com.server.server.controller.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateNum {
    private int order_id;
    private int num;
    private int user_id;
    
    
}
