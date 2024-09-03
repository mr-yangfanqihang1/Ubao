package com.server.server;
import com.server.server.data.Data.User;
import com.server.server.data.Result;
import com.server.server.mapper.AccountMapper;
import com.server.server.mapper.ShopMapper;
import com.server.server.mapper.OrderMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.server.server.service.GodsService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Collections;
import java.util.List;
@SpringBootApplication
@MapperScan("com.server.server.mapper")
@RestController
public class HelloController {
    
    @RequestMapping("/hello/{id}/{name}")
    public String hello(@PathVariable Integer id, @PathVariable String name) {
        System.out.println(id+" "+name);
        return "Greetings from Spring Boot!";
    }
    @RequestMapping("/simple")
    /* public String simple(HttpServletRequest request){
        String name=request.getParameter("name");
        String ageStr=request.getParameter("age");
        int age=Integer.parseInt(ageStr);
        System.out.println(name+": "+age);
        return "OK";
    } */
    public String simple(@RequestParam(name="names",required = true)String name,Integer age){
        System.out.println(name+": "+age);
        return "OK";
    }
    
    // @RequestMapping("/json")
    // public List<Data.User> json(@RequestBody Data.User user){
    //    /*  Gson gson = new Gson();
    //     String jsonString = gson.toJson(user);
    //     System.out.println(jsonString); */
    //     ObjectMapper objectMapper = new ObjectMapper();
    //     try {
    //         String jsonString = objectMapper.writeValueAsString(user);
    //         System.out.println(jsonString); // 输出 JSON 字符串
    //     } catch (JsonProcessingException e) {
    //         e.printStackTrace();
    //     }

    //     return Collections.singletonList(user);
    // }
/*      @RequestMapping(value = "/result", method = RequestMethod.POST)
    public Result<Data.User> result(@RequestBody Data.User user) {
        // 创建一个 Result 对象，封装响应数据
        Result<Data.User> result = new Result<>();
        result.setCode(200); // 假设 200 表示成功
        result.setMessage("Success");
        result.setData(user);

        // 返回封装好的 Result 对象
        return result;
    } */
    @RequestMapping("/world")
    public String hello() {
        System.out.println("hello world!");
        return "Hello World~";
    }
    @Autowired
    private GodsService service;
/*     @RequestMapping("/table")
    public Data.table table() {
        return service.table();
    } */
    public static void main(String[] args) {
        SpringApplication.run(HelloController.class, args);
    }
}
