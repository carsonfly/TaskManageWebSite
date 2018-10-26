package com.firewall.controller;

import com.alibaba.fastjson.JSON;
import com.firewall.pojo.IP;
import com.firewall.pojo.IPClass;
import com.firewall.repo.IPRepo;
import com.firewall.repo.IPSetRepo;
import com.firewall.repo.PortRepo;
import com.firewall.repo.StrategyRepo;
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
@RequestMapping("/ip_class")
public class IPClassController {
    @Autowired
    IPRepo ipRepo;
    @Autowired
    IPSetRepo ipSetRepo;
    @Autowired
    PortRepo portRepo;
    @Autowired
    StrategyRepo strategyRepo;
    Map<String,Object> result=new HashMap<>();
    @RequestMapping("/list")
    public Map<String,Object> list(){
        result.clear();
        Iterable<IPClass> all = ipSetRepo.findAll();
        List<IPClass> rows = IterableUtils.toList(all);
        result.put("count", rows.size());
        result.put("rows",rows);
        result.put("success",true);
        return result;
    }
    @RequestMapping("/save")
    public Map<String,Object> save(String data){
        result.clear();
        System.out.println(data);

        ipSetRepo.save(JSON.parseObject(data, IPClass.class));
        result.put("success",true);
        return result;
    }
    @RequestMapping("/delete")
    public Map<String,Object> delete(String uuid){
        result.clear();
        Object object=null;
        if(uuid!=null&&!uuid.equals("")){
            object=ipSetRepo.findById(uuid).get();
        }
        if(object!=null){
            ipSetRepo.delete((IPClass)object);
            result.put("success",true);
        }else {
            result.put("message","not exist");
            result.put("success",false);
        }

        return result;
    }
}
