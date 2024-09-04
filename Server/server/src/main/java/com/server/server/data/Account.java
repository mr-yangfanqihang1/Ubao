package com.server.server.data;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Account {
    private int id;
    private int userType;
    private String username;
    private String email;
    private String password;
    private String address;
}
