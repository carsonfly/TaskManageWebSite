package com.firewall.pojo;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by Administrator on 2018/10/24.
 */
@Entity
public class IPClass {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid")

    String ip_class_id;
    String name;
    String department;
    String comment;

    //多对多映射
    @ManyToMany(mappedBy = "sourceIpClasses")
    @JsonIgnore
    List<Strategy> sourceStrategies=new ArrayList<>();
    //多对多映射
    @ManyToMany(mappedBy = "targetIpClasses")
    @JsonIgnore
    List<Strategy> targetStrategies=new ArrayList<>();

    @ManyToMany(targetEntity = IP.class, fetch = FetchType.LAZY)
    @JoinTable(name = "Ip_IpClass", joinColumns = @JoinColumn(name = "ip_class_id"), inverseJoinColumns = @JoinColumn(name = "ip_id"))
    List<IP> ips=new ArrayList<>();

    public List<Strategy> getSourceStrategies() {
        return sourceStrategies;
    }

    public void setSourceStrategies(List<Strategy> sourceStrategies) {
        this.sourceStrategies = sourceStrategies;
    }

    public List<Strategy> getTargetStrategies() {
        return targetStrategies;
    }

    public void setTargetStrategies(List<Strategy> targetStrategies) {
        this.targetStrategies = targetStrategies;
    }

    public String getIp_class_id() {
        return ip_class_id;
    }

    public void setIp_class_id(String ip_class_id) {
        this.ip_class_id = ip_class_id;
    }

    public List<IP> getIps() {
        return ips;
    }

    public void setIps(List<IP> ips) {
        this.ips = ips;
    }



    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
