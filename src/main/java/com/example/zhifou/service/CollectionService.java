package com.example.zhifou.service;
import com.example.zhifou.entity.CollectionInfo;
import com.example.zhifou.repository.CollectionInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CollectionService {
    @Autowired
    private CollectionInfoRepository collectionInfoRepository;
    public CollectionInfo save(CollectionInfo collectionInfo){
        return collectionInfoRepository.save(collectionInfo);
    }
    public void delete(CollectionInfo collectionInfo){
        collectionInfoRepository.delete(collectionInfo);
    }
    public CollectionInfo find(int collectionType,int collectionTypeId,int collectionUserId){
        return collectionInfoRepository.findByCollectionTypeAndCollectionTypeIdAndCollectionUserId(collectionType
        ,collectionTypeId,collectionUserId);
    }
    public List<CollectionInfo> findAll(int collectionType, int collectionUserId){
        return collectionInfoRepository.findAllByCollectionTypeAndAndCollectionUserId(collectionType,collectionUserId);
    }
    public CollectionInfo findCollectionInfoById(int collectionId){
        return collectionInfoRepository.findByCollectionId(collectionId);
    }
}
