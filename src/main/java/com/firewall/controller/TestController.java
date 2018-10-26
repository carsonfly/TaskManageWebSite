package com.firewall.controller;

import com.firewall.pojo.IP;
import com.firewall.pojo.IPClass;
import com.firewall.pojo.Port;
import com.firewall.pojo.Strategy;
import com.firewall.repo.IPRepo;
import com.firewall.repo.IPSetRepo;
import com.firewall.repo.PortRepo;
import com.firewall.repo.StrategyRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

/**
 * Created by Administrator on 2018/9/28.
 */
@RestController
@RequestMapping("/test")
public class TestController {
    @Autowired
    IPRepo ipRepo;
    @Autowired
    IPSetRepo ipSetRepo;
    @Autowired
    PortRepo portRepo;
    @Autowired
    StrategyRepo strategyRepo;
    Map<String,Object> result=new HashMap<>();
    @RequestMapping("/hibernate")
    public Map<String,Object> hibernate(){
        IP ip1=new IP();
        IP ip2=new IP();
        IP ip3=new IP();
        IPClass ipClassSource =new IPClass();
        IPClass ipClassTarget =new IPClass();
        Port port=new Port();
        Strategy strategy=new Strategy();


        ip1.setIpAddress("192.168.1.1");
        ip1.setName("wg");
        ip2.setIpAddress("192.168.1.100");
        ip2.setName("pc1");
        ip3.setIpAddress("192.168.1.101");
        ip3.setName("pc2");

        ip1.getIpClasses().add(ipClassTarget);
        ip2.getIpClasses().add(ipClassSource);
        ip3.getIpClasses().add(ipClassSource);

        ipClassTarget.getIps().add(ip1);
        ipClassSource.getIps().add(ip2);
        ipClassSource.getIps().add(ip3);

        port.setPort("");
        port.setName("tomcat");
        port.getTargetStrategies().add(strategy);

        strategy.setName("test");
        strategy.getSourceIpClasses().add(ipClassSource);
        strategy.getTargetIpClasses().add(ipClassTarget);
        strategy.getTargetPorts().add(port);
        strategy.setType("allow");

//        ipRepo.save(ip1);
//        ipRepo.save(ip2);
//        ipRepo.save(ip3);
//
//        ipSetRepo.save(ipClassSource);
//        ipSetRepo.save(ipClassTarget);

//        portRepe.save(port);

//        Strategy saved = strategyRepe.save(strategy);

        result.put("saved", strategyRepo.findOneByName("test"));


        return  result;
    }
}
