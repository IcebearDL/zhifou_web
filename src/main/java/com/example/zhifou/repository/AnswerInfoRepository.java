package com.example.zhifou.repository;

import com.example.zhifou.entity.AnswerInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnswerInfoRepository extends JpaRepository<AnswerInfo,Integer> {
    public AnswerInfo findAnswerInfoByAnswerId(int id);
    List<AnswerInfo> findAllByAnswerDescriptionLike(String string);
}
