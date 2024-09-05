package com.server.server.controller.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@AllArgsConstructor
@NoArgsConstructor
@Data
public class SelectByName {
    private int userId;
    private int status;
    private String goodsName;
}
