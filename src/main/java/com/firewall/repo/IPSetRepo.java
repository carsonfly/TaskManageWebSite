package com.firewall.repo;

import com.firewall.pojo.IPClass;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by Administrator on 2018/9/28.
 */
public interface IPSetRepo extends CrudRepository<IPClass,String> {
    IPClass findOneByName(String name);

}
