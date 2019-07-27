package com.example.zhifou.repository;

import com.example.zhifou.entity.CommentInfoArticle;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentInfoArticleRepository extends JpaRepository<CommentInfoArticle,Integer> {
    Page<CommentInfoArticle> findAllByArticleId(int articleId, Pageable pageable);

}
