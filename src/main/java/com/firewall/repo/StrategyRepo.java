package com.firewall.repo;

import com.firewall.pojo.Port;
import com.firewall.pojo.Strategy;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by Administrator on 2018/9/28.
 */
public interface StrategyRepo extends CrudRepository<Strategy,String> {

    Strategy findOneByName(String name);
    List<Port> findByNameContaining(String name);
    List<Port> findByDepartmentContaining(String department);
}
