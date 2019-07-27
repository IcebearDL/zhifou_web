package com.example.zhifou.service;

import com.example.zhifou.entity.AnswerInfo;
import com.example.zhifou.entity.QuestionAnswer;
import com.example.zhifou.entity.QuestionInfo;
import com.example.zhifou.repository.AnswerInfoRepository;
import com.example.zhifou.repository.QuestionAnswerRepository;
import com.example.zhifou.repository.QuestionInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Service
public class QuestionService {
    @Autowired
    private QuestionAnswerRepository questionAnswerRepository;
    @Autowired
    private QuestionInfoRepository questionInfoRepository;
    @Autowired
    private AnswerInfoRepository answerInfoRepository;

    public QuestionAnswer save(QuestionAnswer questionAnswer){
        return questionAnswerRepository.save(questionAnswer);
    }

    public QuestionInfo save(QuestionInfo questionInfo){
        return questionInfoRepository.save(questionInfo);
    }

    public QuestionInfo findQuestionInfoByQuestionId(int id){
        return questionInfoRepository.findQuestionInfoByQuestionId(id);
    }
    public void deleteQuestionAnswerByAnswerId(int answerId){
        questionAnswerRepository.findByAnswerId(answerId);
    }

    public List<AnswerInfo> findAllAnswerByQuestionId(int questionId){
        List<QuestionAnswer> questionAnswerList = questionAnswerRepository.findAllByQuestionId(questionId);
        List<AnswerInfo> answerInfoList = new ArrayList<AnswerInfo>();
        for(QuestionAnswer questionAnswer : questionAnswerList){
            int answerId = questionAnswer.getAnswerId();
            AnswerInfo answerInfo = answerInfoRepository.findAnswerInfoByAnswerId(answerId);
            answerInfoList.add(answerInfo);
        }
        Collections.sort(answerInfoList, new Comparator<AnswerInfo>() {
            @Override
            public int compare(AnswerInfo o1, AnswerInfo o2) {
                return o2.getAnswerStar()-o1.getAnswerStar();
            }
        });
        return answerInfoList;
    }

    public List<QuestionInfo> findAllHotQuestions(){
        return questionInfoRepository.findAllByHot(1);
    }

    public List<QuestionInfo> searchQuestions(String stirng){
        return questionInfoRepository.findAllByQuestionTitleLikeAndHot("%"+stirng+"%",0);
    }


}
