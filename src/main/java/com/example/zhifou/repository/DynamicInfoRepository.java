package com.example.zhifou.repository;

import com.example.zhifou.entity.DynamicInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.servlet.Registration;
import java.util.List;

public interface DynamicInfoRepository extends JpaRepository<DynamicInfo,Integer> {
    List<DynamicInfo> findAllByDynamicUserId(int userId);
    void deleteByDynamicTypeAndDynamicTypeIdAndDynamicUserId(int type,int typeId,int userId);
}
