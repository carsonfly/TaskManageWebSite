package com.taskmanager.repo;

import com.taskmanager.pojo.Employee;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by Administrator on 2018/9/28.
 */
public interface EmployeeRepo extends CrudRepository<Employee,String> {
    Employee findOneByUserName(String userName);
    Employee findOneByName(String name);
    Employee findOneByUserNameAndUserPassword(String userName,String userPassword);
}
