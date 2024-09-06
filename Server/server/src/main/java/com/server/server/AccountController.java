
package com.server.server;

import com.server.server.data.Account;
import com.server.server.mapper.AccountMapper;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AccountController {

    @Autowired
    private AccountMapper accountMapper;

    @Autowired
    private JwtUtil jwtUtil;

    // 登录接口
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> loginDetails) {
        String username = loginDetails.get("username");
        String password = loginDetails.get("password");

        List<Account> accounts = accountMapper.findAll();
        Map<String, Object> response = new HashMap<>();

        for (Account account : accounts) {
            if (account.getUsername().equals(username) && account.getPassword().equals(password)) {
                String token = jwtUtil.generateToken(username);
                Integer userID = account.getId();
                response.put("status", 1);
                response.put("message", "登录成功！");
                response.put("token", token);
                response.put("userID", userID); 
                return ResponseEntity.ok(response);
            }
        }

        response.put("status", 0);
        response.put("message", "用户名或密码错误！");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }

    // 示例受保护接口
    @GetMapping("/api/**")
    public ResponseEntity<Map<String, Object>> protectedEndpoint(HttpServletRequest request) {
        Map<String, Object> response = new HashMap<>();
        
        // 从请求中获取 JWT Claims
        Claims claims = (Claims) request.getAttribute("claims");
        if (claims == null) {
            response.put("status", 0);
            response.put("message", "未授权的访问");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        String username = claims.getSubject();
        response.put("status", 1);
        response.put("message", "你已成功访问受保护的接口！");
        response.put("username", username);

        return ResponseEntity.ok(response);
    }

    // 注册接口
    @PostMapping("/register")
    public Map<String, Object> register(@RequestBody Account newAccount) {
        Map<String, Object> response = new HashMap<>();
        List<Account> accounts = accountMapper.findAll();

        // 检查用户名和邮箱是否已经存在
        for (Account account : accounts) {
            if (account.getUsername().equals(newAccount.getUsername())) {
                response.put("status", 0);
                response.put("message", "用户名已存在！");
                return response;
            } else if (account.getEmail().equals(newAccount.getEmail())) {
                response.put("status", 0);
                response.put("message", "邮箱已被注册！");
                return response;
            }
        }

        // 插入新用户
        accountMapper.insert(newAccount);
        response.put("status", 1);
        response.put("message", "注册成功！");
        return response;
    }
    @GetMapping("/user")
    public ResponseEntity<Map<String, Object>> getUserInfo(@RequestParam String username) {
        // 获取用户信息的逻辑
        Map<String, Object> response = new HashMap<>();
        Account account = accountMapper.findByUsername(username);
        if (account != null) {
            response.put("username", account.getUsername());
            response.put("email", account.getEmail());
            return ResponseEntity.ok(response);
        } else {
            response.put("error", "User not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }
}

