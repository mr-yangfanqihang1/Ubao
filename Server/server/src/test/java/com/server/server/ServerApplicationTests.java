package com.server.server;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.server.server.controller.request.CartItems;
import com.server.server.data.Account;
import com.server.server.mapper.AccountMapper;
import com.server.server.mapper.OrderMapper;

@SpringBootTest
class ServerApplicationTests {
	@Autowired
	private OrderMapper orderMapper;
	@Test
	public void testListAccount(){
		List<CartItems> accountList=orderMapper.getCartItems(1,0);
		accountList.stream().forEach(user->{
			System.out.println(user);
		});

	}

}
