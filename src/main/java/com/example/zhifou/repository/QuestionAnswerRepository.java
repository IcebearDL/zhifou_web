package com.example.zhifou.repository;

import com.example.zhifou.entity.QuestionAnswer;
import com.example.zhifou.entity.QuestionInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionAnswerRepository extends JpaRepository<QuestionAnswer,Integer> {
    QuestionAnswer findByAnswerId(int id);
    List<QuestionAnswer> findAllByQuestionId(int questionId);
    void deleteByAnswerId(int AnswerId);

}
