package com.example.zhifou.repository;

import com.example.zhifou.entity.QuestionInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionInfoRepository extends JpaRepository<QuestionInfo,Integer> {
    public QuestionInfo findQuestionInfoByQuestionId(int id);
    List<QuestionInfo> findAllByHot(int hot);
    List<QuestionInfo> findAllByQuestionTitleLikeAndHot(String string,int hot);
}
