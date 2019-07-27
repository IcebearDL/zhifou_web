package com.example.zhifou.repository;

import com.example.zhifou.entity.UserQuestion;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserQuestionRepository extends JpaRepository<UserQuestion,Integer>{
    List<UserQuestion> findAllByUserId(int userId);
}
