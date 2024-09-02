package com.example.demo.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Data;
import com.example.demo.dao.GodsDao;

@Service
public class GodsServiceA implements GodsService{
    @Autowired
    GodsDao godsDao;
    @Override
    public Data.table table(){
        Data.table oldTable=godsDao.table();
        return oldTable;
    }

}
