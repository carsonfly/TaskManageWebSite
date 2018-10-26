package com.firewall.repo;

import com.firewall.pojo.IP;
import com.firewall.pojo.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by Administrator on 2018/9/28.
 */
public interface UserRepo extends CrudRepository<User,String> {
    User findOneByName(String name);
    User findOneByNameAndPassword(String name,String password);

}
