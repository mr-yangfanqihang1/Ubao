package com.example.demo.mapper;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;
@Mapper
public interface UserMapper {
     public List<User> list();
}
