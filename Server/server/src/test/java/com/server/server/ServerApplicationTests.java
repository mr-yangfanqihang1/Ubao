package com.server.server;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.server.server.data.Account;
import com.server.server.mapper.AccountMapper;

@SpringBootTest
class ServerApplicationTests {
	@Autowired
	private AccountMapper accountMapper;
	@Test
	public void testListAccount(){
		List<Account> accountList=accountMapper.findAll();
		accountList.stream().forEach(user->{
			System.out.println(user);
		});

	}

}
