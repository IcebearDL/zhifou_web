package com.example.zhifou.service;

import com.example.zhifou.entity.*;
import com.example.zhifou.repository.*;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.boot.SessionFactoryBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.provider.HibernateUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.SessionAttribute;

import java.util.List;

@Service
public class AnswerService {
    @Autowired
    private AnswerInfoRepository answerInfoRepository;
    @Autowired
    private QuestionAnswerRepository questionAnswerRepository;
    @Autowired
    private UserStarRepository userStarRepository;
    @Autowired
    private CommentInfoRepository commentInfoRepository;
    @Autowired
    private QuestionService questionService;
    @Autowired
    private DynamicService dynamicService;


    public List<AnswerInfo> findAllAnswer(){
        return answerInfoRepository.findAll();
    }

    public CommentInfo saveCommentInfo(CommentInfo commentInfo){
        return commentInfoRepository.save(commentInfo);
    }

    public AnswerInfo saveAnswerInfo(AnswerInfo answerInfo){
        return answerInfoRepository.save(answerInfo);
    }

    public void deleteAnswerBuAnswerId(int answerId){
         answerInfoRepository.deleteById(answerId);
    }

    public QuestionInfo findQuestionInfo(AnswerInfo answerInfo){
        int id = answerInfo.getAnswerId();
        QuestionAnswer questionAnswer = questionAnswerRepository.findByAnswerId(id);
        return questionService.findQuestionInfoByQuestionId(questionAnswer.getQuestionId());
    }

    public List<CommentInfo> findAllCommentInfoByAnswerId(int answerId){
        return commentInfoRepository.findAllByAnswerId(answerId);
    }

    @Transactional
    public void starAnswer(int userId, int answerId, String state, UserInfo userInfo){
        UserStar userStar = new UserStar();
        AnswerInfo answerInfo = answerInfoRepository.findAnswerInfoByAnswerId(answerId);
        if(state.equals("up")){
            userStar.setUserId(userId);
            userStar.setAnswerId(answerId);
            userStarRepository.save(userStar);
            answerInfo.setAnswerStar(answerInfo.getAnswerStar()+1);
            answerInfoRepository.save(answerInfo);
            DynamicInfo dynamicInfo = new DynamicInfo();
            dynamicInfo.setDynamicType(1);
            dynamicInfo.setDynamicUserId(userInfo.getUserId());
            dynamicInfo.setDynamicTypeId(answerInfo.getAnswerId());
            dynamicService.save(dynamicInfo);
        }
        else {
            answerInfo.setAnswerStar(answerInfo.getAnswerStar()-1);
            answerInfoRepository.save(answerInfo);
            userStarRepository.deleteByAnswerId(answerId);
            dynamicService.delete(1,answerInfo.getAnswerId(),userInfo.getUserId());
        }
    }

    public AnswerInfo findAnswerInfoById(int id){
        return answerInfoRepository.findAnswerInfoByAnswerId(id);
    }

    public int findQuestionIDByAnswerId(int answerId){
        return questionAnswerRepository.findByAnswerId(answerId).getQuestionId();
    }
    public List<AnswerInfo> searchAnswers(String string){
        return answerInfoRepository.findAllByAnswerDescriptionLike("%"+string+"%");
    }
}
