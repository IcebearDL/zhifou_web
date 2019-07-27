package com.example.zhifou.service;

import com.example.zhifou.entity.*;
import com.example.zhifou.repository.*;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.SessionAttribute;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
@Service
public class UserService {
    @Autowired
    private UserInfoRepository userInfoRepository;
    @Autowired
    private UserAnswerRepository userAnswerRepository;
    @Autowired
    private UserQuestionRepository userQuestionRepository;
    @Autowired
    private UserStarRepository userStarRepository;
    @Autowired
    private UserStarArticleRepository userStarArticleRepository;
    @Autowired
    private UserArticleRepository userArticleRepository;
    @Autowired
    private AnswerService answerService;
    @Autowired
    private QuestionService questionService;
    @Autowired
    private CollectionService collectionService;
    @Autowired
    private ArticleService articleService;
    @Autowired
    private DynamicService dynamicService;
    @Autowired
    private CommentInfoArticleRepository commentInfoArticleRepository;

    public UserInfo findByUserId(int userId) {
        return userInfoRepository.findByUserId(userId);
    }
    public UserArticle save(UserArticle userArticle){
        return userArticleRepository.save(userArticle);
    }
    public UserInfo save(UserInfo userInfo) {
        return userInfoRepository.saveAndFlush(userInfo);
    }

    public UserQuestion save(UserQuestion userQuestion) {
        return userQuestionRepository.save(userQuestion);
    }

    public UserAnswer save(UserAnswer userAnswer){
        return userAnswerRepository.save(userAnswer);
    }

    public UserStar save(UserStar userStar) {
        return userStarRepository.save(userStar);
    }

    public UserInfo findByUserNickname(String userNickname){
        return userInfoRepository.findByUserNickname(userNickname);
    }
    public List<UserStarArticle> findAllUserStarArticle(int userId){
        return userStarArticleRepository.findAllByUserId(userId);
    }

    public List<AnswerInfo> findAllStarAnswer(UserInfo userInfo){
        int userId = userInfo.getUserId();
        List<UserStar> userStarList = userStarRepository.findAllByUserId(userId);
        ArrayList<AnswerInfo> answerInfoList = new ArrayList<AnswerInfo>();
        for(UserStar userStar:userStarList){
            int answerId = userStar.getAnswerId();
            answerInfoList.add(answerService.findAnswerInfoById(answerId));
        }
        return answerInfoList;
    }

    public List<ArticleInfo> findAllStarArticle(UserInfo userInfo){
        int userId = userInfo.getUserId();
        List<UserStarArticle> userStarArticleList = userStarArticleRepository.findAllByUserId(userId);
        ArrayList<ArticleInfo> articleInfoList = new ArrayList<ArticleInfo>();
        for(UserStarArticle userStarArticle:userStarArticleList){
            int articleId = userStarArticle.getArticleId();
            articleInfoList.add(articleService.findArticleInfoByArticleId(articleId));
        }
        return articleInfoList;
    }

    public void deleteUserAnserByAnswerId(int answerId){
        userAnswerRepository.deleteByAnswerId(answerId);
    }


    public UserInfo register(String userUserName, String userPassword,String userNickname){
        UserInfo userInfo = new UserInfo();
        UserInfo check = userInfoRepository.findByUserUsername(userUserName);
        if(check != null){
            return null;
        }
        //System.out.println(check);
        userInfo.setUserUsername(userUserName);
        userInfo.setUserPassword(userPassword);
        userInfo.setUserNickname(userNickname);
        userInfo.setCreateTime(new Date());
        userInfo.setUpdateTime(new Date());
        save(userInfo);
        return userInfo;
    }

    public UserInfo login(String userUserName, String userPassword){
        UserInfo userInfo = userInfoRepository.findByUserUsername(userUserName);
        System.out.println(userInfo);
        if(userInfo!=null && userInfo.getUserPassword().equals(userPassword)){
            return userInfo;
        }
        else{
            return null;
        }
    }

   public List<AnswerInfo> findUserAnswers(UserInfo userInfo){
        int userId = userInfo.getUserId();
        List<UserAnswer> userAnswerList = userAnswerRepository.findAllByUserId(userId);
        ArrayList<AnswerInfo> answers = new ArrayList<AnswerInfo>();
        for(UserAnswer userAnswer : userAnswerList){
            answers.add(answerService.findAnswerInfoById(userAnswer.getAnswerId()));
        }
        return answers;
   }
    public List<QuestionInfo> findUserQuestions(UserInfo userInfo){
        int userId = userInfo.getUserId();
        List<UserQuestion> userQuestionList = userQuestionRepository.findAllByUserId(userId);
        ArrayList<QuestionInfo> questions = new ArrayList<QuestionInfo>();
        for(UserQuestion userQuestion : userQuestionList){
            questions.add(questionService.findQuestionInfoByQuestionId(userQuestion.getQuestionId()));
        }
        return questions;
    }
    public List<ArticleInfo> findUserArticles(UserInfo userInfo){
        int userId = userInfo.getUserId();
        List<UserArticle> userArticleList = userArticleRepository.findAllByUserId(userId);
        ArrayList<ArticleInfo> articles = new ArrayList<ArticleInfo>();
        for(UserArticle userArticle:userArticleList){
            articles.add(articleService.findArticleInfoByArticleId(userArticle.getArticleId()));
        }
        return articles;
    }

    @Transactional
    public void collect(int collectionType, int collectionTypeId, int collectionUserId, String state,
                         UserInfo userInfo){
        if(state.equals("up")){
            CollectionInfo collectionInfo = new CollectionInfo();
            collectionInfo.setCollectionType(collectionType);
            collectionInfo.setCollectionTypeId(collectionTypeId);
            collectionInfo.setCollectionUserId(collectionUserId);
            collectionService.save(collectionInfo);

            DynamicInfo dynamicInfo = new DynamicInfo();
            dynamicInfo.setDynamicType(6);
            dynamicInfo.setDynamicUserId(userInfo.getUserId());
            dynamicInfo.setDynamicTypeId(collectionInfo.getCollectionId());
            dynamicService.save(dynamicInfo);
        }
        if(state.equals("down")){
            CollectionInfo collectionInfo = collectionService.find(collectionType,collectionTypeId,collectionUserId);
            System.out.println(collectionInfo.getCollectionType());
            System.out.println(collectionInfo.getCollectionTypeId());
            System.out.println(userInfo.getUserId());
            dynamicService.delete(6,collectionInfo.getCollectionTypeId(),userInfo.getUserId());
            collectionService.delete(collectionInfo);
        }

    }


    public void delete(UserInfo userInfo) {
        userInfoRepository.delete(userInfo);
    }

}