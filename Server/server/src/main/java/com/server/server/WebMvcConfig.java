package com.server.server;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Autowired
    private JwtRequestInterceptor jwtRequestInterceptor;

    @Override
    public void addInterceptors(@SuppressWarnings("null") InterceptorRegistry registry) {
        registry.addInterceptor(jwtRequestInterceptor)
                .addPathPatterns("/api/**") // 拦截所有请求
                .excludePathPatterns("/api/goodslist", "/api/login", "/api/register"); // 排除登录和注册请求
    }

}