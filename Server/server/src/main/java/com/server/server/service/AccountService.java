package com.server.server.service;
import com.server.server.data.Account;
import com.server.server.mapper.AccountMapper;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
public class AccountService {

    @Autowired
    private AccountMapper accountMapper;

    public List<Account> selectList(){
        return accountMapper.findAll();
    }
}
