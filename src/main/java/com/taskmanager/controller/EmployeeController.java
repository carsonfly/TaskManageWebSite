package com.taskmanager.controller;

import com.alibaba.fastjson.JSON;
import com.firewall.pojo.IPClass;
import com.taskmanager.pojo.Employee;
import com.taskmanager.repo.EmployeeRepo;
import com.taskmanager.repo.TaskRepo;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.collections4.IterableUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2018/9/28.
 */
@RestController
@RequestMapping("/employee")
public class EmployeeController {
    SimpleDateFormat dateFormat=new SimpleDateFormat("yyyy-MM-dd HH:mm");
    @Autowired
    EmployeeRepo employeeRepo;
    @Autowired
    TaskRepo taskRepo;
    Map<String,Object> result=new HashMap<>();
    @RequestMapping("/list")
    public Map<String,Object> list(){
        result.clear();
        Iterable<Employee> all = employeeRepo.findAll();
        List<Employee> employees = IterableUtils.toList(all);
        result.put("count", employees.size());
        result.put("rows",employees);
        result.put("success",true);
        return result;
    }
    @RequestMapping("/save")
    public Map<String,Object> save(String data){
        result.clear();
        System.out.println(data);
        employeeRepo.save(JSON.parseObject(data, Employee.class));
        result.put("success",true);
        return result;
    }
    @RequestMapping("/add")
    public Map<String,Object> add(String name,String userName,String userPassword){
        result.clear();
        Employee employee=new Employee();
        employee.setName(name);
        employee.setUserName(userName);
        employee.setUserPassword(userPassword);
        employeeRepo.save(employee);
        result.put("success",true);
        return result;
    }
    @RequestMapping("/login")
    public Map<String,Object> login(HttpSession session,String userName,String userPassword){
        result.clear();
        Employee employee = employeeRepo.findOneByUserNameAndUserPassword(userName, userPassword);
        if(employee!=null){
            result.put("success",true);
            session.setAttribute("login", employee);

        }else {
            result.put("success",false);
            result.put("message","name or password error!");
        }

        return result;
    }
    @RequestMapping("/logout")
    public Map<String,Object> logout(HttpSession session,String userName){
        result.clear();
        Employee employee = employeeRepo.findOneByUserName(userName);
        if(employee!=null){
            result.put("success",true);
            session.removeAttribute("login");

        }else {
            result.put("success",false);
            result.put("message","not login!");
        }

        return result;
    }
    @RequestMapping("/delete")
    public Map<String,Object> delete(@RequestParam(required = false)String name,
                                     @RequestParam(required = false)String uuid){
        result.clear();
        Employee employee=null;
        if(name!=null&&!name.equals("")){
            employee=employeeRepo.findOneByName(name);
        }
        if(uuid!=null&&!uuid.equals("")){
            employee=employeeRepo.findById(uuid).get();
        }
        if(employee!=null){
            employeeRepo.delete(employee);
            result.put("success",true);
        }else {
            result.put("message","not exist");
            result.put("success",false);
        }

        return result;
    }
}
