package com.taskmanager.repo;

import com.taskmanager.pojo.Task;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by Administrator on 2018/9/28.
 */
public interface TaskRepo extends CrudRepository<Task,String> {
    List<Task> findByState(String state);
}
