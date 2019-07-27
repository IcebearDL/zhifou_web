package com.example.zhifou.repository;

import com.example.zhifou.entity.CommentInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentInfoRepository extends JpaRepository<CommentInfo,Integer> {
    List<CommentInfo> findAllByAnswerId(int answerId);
    void deleteAllByAnswerId(int answerId);
}
