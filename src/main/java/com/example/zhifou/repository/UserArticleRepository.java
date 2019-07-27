package com.example.zhifou.repository;

import com.example.zhifou.entity.UserArticle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserArticleRepository extends JpaRepository<UserArticle,Integer> {
    List<UserArticle> findAllByUserId(int userId);
}
