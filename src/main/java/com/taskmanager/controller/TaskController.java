package com.taskmanager.controller;

import com.alibaba.fastjson.JSON;
import com.taskmanager.pojo.Employee;
import com.taskmanager.pojo.Task;
import com.taskmanager.repo.EmployeeRepo;
import com.taskmanager.repo.TaskRepo;
import org.apache.commons.collections4.IterableUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by Administrator on 2018/9/28.
 */
@RestController
@RequestMapping("/task")
public class TaskController {
    SimpleDateFormat dateFormat=new SimpleDateFormat("yyyy-MM-dd HH:mm");

    @Autowired
    EmployeeRepo employeeRepo;
    @Autowired
    TaskRepo taskRepo;
    Map<String,Object> result=new HashMap<>();
    @RequestMapping("/listAll")
    public Map<String,Object> listAll(){
        result.clear();
        Iterable<Task> all = taskRepo.findAll();
        List<Task> tasks = IterableUtils.toList(all);
        result.put("count", tasks.size());
        result.put("rows",tasks);
        result.put("success",true);
        return result;
    }
    @RequestMapping("/list")
    public Map<String,Object> list(String state){
        result.clear();
        Iterable<Task> all = taskRepo.findByState(state);
        List<Task> tasks = IterableUtils.toList(all);
        result.put("count", tasks.size());
        result.put("rows",tasks);
        result.put("success",true);
        return result;
    }
    @RequestMapping("/deleteAll")
    public Map<String,Object> deleteAll(){
        result.clear();
        taskRepo.deleteAll();
        result.put("success",true);
        return result;
    }
    @RequestMapping("/delete")
    public Map<String,Object> delete(String uuid){
        result.clear();
        Task task = taskRepo.findById(uuid).get();
        taskRepo.delete(task);

        result.put("success",true);
        return result;
    }
    @RequestMapping("/save")
    public Map<String,Object> save(String data){
        result.clear();
        System.out.println(data);
        taskRepo.save(JSON.parseObject(data, Task.class));
        result.put("success",true);
        return result;
    }
    @RequestMapping("/create")
    public Map<String,Object> create(@RequestParam(required = false)String title,
                                     @RequestParam(required = false)String titleMask,
                                     @RequestParam(required = false)String detail,
                                     @RequestParam(required = false)String detailMask,
                                     @RequestParam(required = false)Integer maxEmployeeNumber,
                                     @RequestParam(required = false)Set<String> employees,
                                     @RequestParam(required = false)String type,
                                     @RequestParam(required = false)Integer totalScore,
                                     @RequestParam(required = false)Integer x,
                                     @RequestParam(required = false)Integer y,
                                     @RequestParam(required = false)String startTimeString,
                                     @RequestParam(required = false)String endTimeString,
                                     @RequestParam(required = false)Long cycle){
        result.clear();
        dateFormat.setTimeZone(TimeZone.getTimeZone("Asia/Shanghai"));  // 设置北京时区
        try{
            Date startTime=null;
            Date endTime=null;
            try{
                startTime=dateFormat.parse(startTimeString.replace("T"," "));
                endTime=dateFormat.parse(endTimeString.replace("T"," "));
            }catch (Exception e){}

            Task task=new Task();
            task.setType(type);
            task.setTitle(title);
            task.setTitleMask(titleMask);
            task.setState("创建");
            task.setMaxEmployeeNumber(maxEmployeeNumber);
            task.setCycle(cycle);
            task.setDetail(detail);
            task.setDetailMask(detailMask);
            task.setTotalScore(totalScore);

            task.setTimeoutMarkDown(x);
            task.setNotSuccessMarkDown(y);
            task.setStartTime(startTime);
            task.setEndTime(endTime);
            Set<Employee> employeeSet=new HashSet<>();
            for(String uuid:employees){
                employeeSet.add(employeeRepo.findById(uuid).get());
            }
            task.setEmployees(employeeSet);
            taskRepo.save(task);
            result.put("success",true);



        }catch (Exception e){
            result.put("success",false);
            e.printStackTrace();
        }

        return result;
    }
    @RequestMapping("/start")
    public Map<String,Object> start(String uuid,
                                    @RequestParam(required = false)String timeString){
        Date time=null;
        dateFormat.setTimeZone(TimeZone.getTimeZone("Asia/Shanghai"));  // 设置北京时区
        try {
            time=dateFormat.parse(timeString.replace("T"," "));
        } catch (ParseException e) {

        }

        result.clear();
        Task task=taskRepo.findById(uuid).get();
        task.setState("开始");
        task.setRealStartTime(new Date());
        if(time!=null){
            time=new Date(time.getTime()+8*3600*1000);
            System.out.println("setRealStartTime:"+time);
            task.setRealStartTime(time);
        }
        taskRepo.save(task);
        result.put("success",true);
        return result;
    }
    @RequestMapping("/end")
    public Map<String,Object> end(String uuid,
                                  @RequestParam(required = false)String timeString){
        Date time=null;
        dateFormat.setTimeZone(TimeZone.getTimeZone("Asia/Shanghai"));  // 设置北京时区
        try {
            time=dateFormat.parse(timeString.replace("T"," "));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        result.clear();
        Task task=taskRepo.findById(uuid).get();
        task.setState("结束");
        task.setRealEndTime(new Date());
        if(time!=null){
            task.setRealStartTime(time);
        }
        if(task.getRealEndTime().after(task.getEndTime())){
            task.setIsTimeout(true);
        }else {
            task.setIsTimeout(false);
        }
        taskRepo.save(task);
        result.put("success",true);
        return result;
    }
    @RequestMapping("/archive")
    public Map<String,Object> Archive(String uuid,
                                      String evaluation,
                                      Boolean success){
        result.clear();
        Task task=taskRepo.findById(uuid).get();
        task.setState("归档");
        task.setIsSuccess(success);
        task.setResult(evaluation);
        taskRepo.save(task);
        result.put("success",true);
        return result;
    }
}
