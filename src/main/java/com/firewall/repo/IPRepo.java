package com.firewall.repo;

import com.firewall.pojo.IP;
import com.taskmanager.pojo.Employee;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by Administrator on 2018/9/28.
 */
public interface IPRepo extends CrudRepository<IP,String> {

    IP findOneByName(String name);
    IP findOneByipAddress(String ipAddress);
    List<IP> findByNameContaining(String name);
    List<IP> findByDepartmentContaining(String department);
}
