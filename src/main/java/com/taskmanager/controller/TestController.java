package com.taskmanager.controller;

import com.taskmanager.pojo.Employee;
import com.taskmanager.pojo.Task;
import com.taskmanager.repo.EmployeeRepo;
import com.taskmanager.repo.TaskRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.Set;

/**
 * Created by Administrator on 2018/9/28.
 */
@RestController
@RequestMapping("/test")
public class TestController {
    SimpleDateFormat dateFormat=new SimpleDateFormat("yyyy-MM-dd HH:mm");
    @Autowired
    EmployeeRepo employeeRepo;
    @Autowired
    TaskRepo taskRepo;
    Map<String,Object> result=new HashMap<>();
    @RequestMapping("/hello")
    public Map<String,Object> testHello(){
        result.clear();
        result.put("success",true);
        return result;
    }
    @RequestMapping("/save")
    public Map<String,Object> testSave(){
        result.clear();

        try {
            Employee employee=new Employee();
            employee.setName("test");
            employee.setUserName("name");
            employee.setUserPassword("password");
            Employee employee1 = employeeRepo.save(employee);
            result.put("employee",employee1);
            Task task =new Task();
            task.setTitle("testTaskTitle");
            task.setStartTime(dateFormat.parse("2018-08-10 12:00"));
            task.setState("prepare");
            Set<Employee> employees = task.getEmployees();
            employees.add(employee);
            task.setEmployees(employees);
            Task save = taskRepo.save(task);
            result.put("task",save);
            result.put("success",true);
        } catch (Exception e) {
            result.put("success",false);
            result.put("error",e.getMessage());
            e.printStackTrace();
        }


        return result;
    }
}
