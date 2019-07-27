package com.example.zhifou.repository;

import com.example.zhifou.entity.AnswerInfo;
import com.example.zhifou.entity.UserAnswer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserAnswerRepository extends JpaRepository<UserAnswer,Integer> {
     List<UserAnswer> findAllByUserId(int userId);
     void deleteByAnswerId(int answerId);

}
