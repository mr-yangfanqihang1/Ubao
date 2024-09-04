package com.server.server.mapper;

import com.server.server.data.Account;
import org.apache.ibatis.annotations.*;
import java.util.List;

@Mapper
public interface AccountMapper {
<<<<<<< HEAD
=======

>>>>>>> 32598e6c5b56e7376242087d6403cc46f34d6c5f
    @Select("SELECT * FROM account WHERE id = #{id}")
    Account findById(int id);

    @Select("SELECT * FROM account")
    public List<Account> findAll();

    @Insert("INSERT INTO account(user_type, username, email, password, address) VALUES(#{userType}, #{username}, #{email}, #{password}, #{address})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insert(Account account);

    @Update("UPDATE account SET user_type=#{userType}, username=#{username}, email=#{email}, password=#{password}, address=#{address} WHERE id=#{id}")
    void update(Account account);

    @Delete("DELETE FROM account WHERE id=#{id}")
    void delete(int id);

}

