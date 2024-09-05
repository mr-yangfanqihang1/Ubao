package com.server.server.mapper;

import com.server.server.data.Account;
import java.util.List;
import org.apache.ibatis.annotations.*;


@Mapper
public interface AccountMapper {
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

    Account findByUsername(String username);
    

        
    }



