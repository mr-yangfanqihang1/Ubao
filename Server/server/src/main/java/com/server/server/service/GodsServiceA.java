package com.server.server.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.server.server.data.Data;
import com.server.server.dao.GodsDao;

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
