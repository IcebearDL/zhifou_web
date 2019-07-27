package com.example.zhifou.repository;

import com.example.zhifou.entity.UserStarArticle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserStarArticleRepository extends JpaRepository<UserStarArticle,Integer> {
    List<UserStarArticle> findAllByUserId(int userId);
    void deleteByArticleId(int articleId);
}
