package com.firewall.pojo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.taskmanager.pojo.Employee;
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
public class Port {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid")
    @Column(name="port_id")
    String id;
    String port;
    String name;
    String comment;
    //多对多映射
    @ManyToMany(mappedBy = "targetPorts")
    @JsonIgnore
    List<Strategy> targetStrategies=new ArrayList<>();

    public List<Strategy> getTargetStrategies() {
        return targetStrategies;
    }

    public void setTargetStrategies(List<Strategy> targetStrategies) {
        this.targetStrategies = targetStrategies;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPort() {
        return port;
    }

    public void setPort(String port) {
        this.port = port;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    @Override
    public String toString() {
        return "Port{" +
                "id='" + id + '\'' +
                ", port=" + port +
                ", name='" + name + '\'' +
                ", comment='" + comment + '\'' +
                ", targetStrategies=" + targetStrategies +
                '}';
    }
}
