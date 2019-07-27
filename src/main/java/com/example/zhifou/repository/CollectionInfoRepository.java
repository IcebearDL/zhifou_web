package com.example.zhifou.repository;

import com.example.zhifou.entity.CollectionInfo;
import com.example.zhifou.entity.CommentInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CollectionInfoRepository extends JpaRepository<CollectionInfo,Integer> {
    CollectionInfo findByCollectionTypeAndCollectionTypeIdAndCollectionUserId(int collectionType,
                                                                              int collectionTypeId,
                                                                              int collectionUserId);

    List<CollectionInfo> findAllByCollectionTypeAndAndCollectionUserId(int collectionType,int collectionUserId);

    CollectionInfo findByCollectionId(int collectionId);
}
