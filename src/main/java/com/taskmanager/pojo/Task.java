package com.taskmanager.pojo;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.*;

/**
 * Created by Administrator on 2018/9/28.
 */
@Entity
public class Task {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid")
    @Column(name="task_id")
    String id;
    String task;

    String title;

    String titleMask;

    String detail;

    String detailMask;
    String type;
    String state;
    Long cycle;
    @Temporal(TemporalType.TIMESTAMP)
    Date startTime;
    @Temporal(TemporalType.TIMESTAMP)
    Date endTime;
    @Temporal(TemporalType.TIMESTAMP)
    Date realStartTime;
    @Temporal(TemporalType.TIMESTAMP)
    Date realEndTime;

    String result;
    Integer maxEmployeeNumber;
    Integer totalScore;
    Boolean isTimeout;
    Boolean isSuccess;
    Integer notSuccessMarkDown;
    Integer timeoutMarkDown;
    TreeMap<String,Integer> scoreArrange=new TreeMap<>();
    @ManyToMany(targetEntity = Employee.class)                                        //指定多对多关系
    @JoinTable(name="Task_Employee",                       //指定第三张表
            joinColumns={@JoinColumn(referencedColumnName="task_id",name="task_id")},             //本表与中间表的外键对应
            inverseJoinColumns={@JoinColumn(referencedColumnName="employee_id",name="employee_id")})  //另一张表与第三张表的外键的对应关系   
   Set<Employee> employees=new HashSet<>();

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Boolean getIsSuccess() {
        return isSuccess;
    }

    public void setIsSuccess(Boolean isSuccess) {
        this.isSuccess = isSuccess;
    }

    public String getTask() {
        return task;
    }

    public void setTask(String task) {
        this.task = task;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getTitleMask() {
        return titleMask;
    }

    public void setTitleMask(String titleMask) {
        this.titleMask = titleMask;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public String getDetailMask() {
        return detailMask;
    }

    public void setDetailMask(String detailMask) {
        this.detailMask = detailMask;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Long getCycle() {
        return cycle;
    }

    public void setCycle(Long cycle) {
        this.cycle = cycle;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public Date getRealStartTime() {
        return realStartTime;
    }

    public void setRealStartTime(Date realStartTime) {
        this.realStartTime = realStartTime;
    }

    public Date getRealEndTime() {
        return realEndTime;
    }

    public void setRealEndTime(Date realEndTime) {
        this.realEndTime = realEndTime;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public Integer getMaxEmployeeNumber() {
        return maxEmployeeNumber;
    }

    public void setMaxEmployeeNumber(Integer maxEmployeeNumber) {
        this.maxEmployeeNumber = maxEmployeeNumber;
    }

    public Integer getTotalScore() {
        return totalScore;
    }

    public void setTotalScore(Integer totalScore) {
        this.totalScore = totalScore;
    }

    public Boolean getIsTimeout() {
        return isTimeout;
    }

    public void setIsTimeout(Boolean isTimeout) {
        this.isTimeout = isTimeout;
    }

    public Integer getNotSuccessMarkDown() {
        return notSuccessMarkDown;
    }

    public void setNotSuccessMarkDown(Integer notSuccessMarkDown) {
        this.notSuccessMarkDown = notSuccessMarkDown;
    }

    public Integer getTimeoutMarkDown() {
        return timeoutMarkDown;
    }

    public void setTimeoutMarkDown(Integer timeoutMarkDown) {
        this.timeoutMarkDown = timeoutMarkDown;
    }

    public TreeMap<String, Integer> getScoreArrange() {
        return scoreArrange;
    }

    public void setScoreArrange(TreeMap<String, Integer> scoreArrange) {
        this.scoreArrange = scoreArrange;
    }

    public Set<Employee> getEmployees() {
        return employees;
    }

    public void setEmployees(Set<Employee> employees) {
        this.employees = employees;
    }
}
