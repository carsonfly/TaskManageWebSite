package com.taskmanager.pojo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by Administrator on 2018/9/28.
 */
@Entity
public class Employee {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid")
    @Column(name="employee_id")
    String id;
    String name;
    //@JsonIgnore
    String userName;
    //@JsonIgnore
    String userPassword;
    @JsonIgnore
    @ManyToMany(targetEntity = Task.class)                                        //指定多对多关系
    @JoinTable(name="Task_Employee",                       //指定第三张表
            joinColumns={@JoinColumn(referencedColumnName="employee_id",name="employee_id")},             //本表与中间表的外键对应
            inverseJoinColumns={@JoinColumn(referencedColumnName="task_id",name="task_id")})  //另一张表与第三张表的外键的对应关系
    Set<Task> tasks=new HashSet<>();

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    public Set<Task> getTasks() {
        return tasks;
    }

    public void setTasks(Set<Task> tasks) {
        this.tasks = tasks;
    }
}
