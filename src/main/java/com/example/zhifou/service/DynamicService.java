package com.example.zhifou.service;

import com.example.zhifou.entity.DynamicInfo;
import com.example.zhifou.repository.DynamicInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DynamicService {
    @Autowired
    private DynamicInfoRepository dynamicInfoRepository;
    public List<DynamicInfo> findAllDynamics(int userId){
        return dynamicInfoRepository.findAllByDynamicUserId(userId);
    }
    public DynamicInfo save(DynamicInfo dynamicInfo){
        return dynamicInfoRepository.save(dynamicInfo);
    }
    public void delete(int type,int typeId,int userId){
        dynamicInfoRepository.deleteByDynamicTypeAndDynamicTypeIdAndDynamicUserId(type,typeId,userId);
    }
}
