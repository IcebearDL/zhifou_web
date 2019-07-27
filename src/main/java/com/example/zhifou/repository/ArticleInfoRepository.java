package com.example.zhifou.repository;

import com.example.zhifou.entity.ArticleInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ArticleInfoRepository extends JpaRepository<ArticleInfo,Integer> {
    ArticleInfo findByArticleId(int articleId);
    List<ArticleInfo> findAllByArticleDescriptionLike(String string);
}
