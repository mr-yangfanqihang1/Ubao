package com.example.demo.dao;
import com.example.demo.Data;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
//import java.util.List;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
@Component
public class GodsDaoA implements GodsDao{
    @Override
    public Data.table table(){
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            // 从 classpath 读取 data.json 文件
            ClassPathResource resource = new ClassPathResource("data.json");
            Data.table table = objectMapper.readValue(resource.getFile(), Data.table.class);
            return table;
        } catch (IOException e) {
            e.printStackTrace();
            return null; // 或者返回一个合适的错误响应
        }
    }
}
