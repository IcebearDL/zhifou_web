package com.example.zhifou.service;

import com.example.zhifou.entity.CommentInfo;
import com.example.zhifou.entity.CommentInfoArticle;
import com.example.zhifou.repository.CommentInfoArticleRepository;
import com.example.zhifou.repository.CommentInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentService {
    @Autowired
    private CommentInfoRepository commentInfoRepository;

    @Autowired
    private CommentInfoArticleRepository commentInfoArticleRepository;

    public CommentInfo save(CommentInfo commentInfo){
        return commentInfoRepository.save(commentInfo);
    }

    public CommentInfoArticle save(CommentInfoArticle commentInfoArticle){
        return commentInfoArticleRepository.save(commentInfoArticle);
    }
    public void deleteByAnswerId(int answerId){
        commentInfoRepository.deleteAllByAnswerId(answerId);
    }

}
