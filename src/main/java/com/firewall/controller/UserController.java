package com.firewall.controller;

import com.alibaba.fastjson.JSON;
import com.firewall.pojo.User;
import com.firewall.repo.*;
import org.apache.commons.collections4.IterableUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2018/10/24.
 */
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    IPRepo ipRepo;
    @Autowired
    IPSetRepo ipSetRepo;
    @Autowired
    PortRepo portRepo;
    @Autowired
    StrategyRepo strategyRepo;
    @Autowired
    UserRepo userRepo;
    Map<String,Object> result=new HashMap<>();
    @RequestMapping("/list")
    public Map<String,Object> list(){
        result.clear();
        Iterable<User> all = userRepo.findAll();
        List<User> rows = IterableUtils.toList(all);
        result.put("count", rows.size());
        result.put("rows",rows);
        result.put("success",true);
        return result;
    }
    @RequestMapping("/save")
    public Map<String,Object> save(String data){
        result.clear();
        System.out.println(data);
        User user=JSON.parseObject(data,User.class);
        userRepo.save(user);
        result.put("success",true);
        return result;
    }
    @RequestMapping("/delete")
    public Map<String,Object> delete(String uuid){
        result.clear();
        Object object=null;
        if(uuid!=null&&!uuid.equals("")){
            object=userRepo.findById(uuid).get();
        }
        if(object!=null){
            userRepo.delete((User)object);
            result.put("success",true);
        }else {
            result.put("message","not exist");
            result.put("success",false);
        }

        return result;
    }

}
