package com.example.zhifou.controller;

import com.example.zhifou.VO.ResultVO;
import com.example.zhifou.entity.AnswerInfo;
import com.example.zhifou.entity.QuestionInfo;
import com.example.zhifou.entity.UserInfo;
import com.example.zhifou.entity.UserStar;
import com.example.zhifou.service.AnswerService;
import com.example.zhifou.service.QuestionService;
import com.example.zhifou.service.UserService;
import com.example.zhifou.utils.ResultVOUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/question")
public class QuestionController {
    @Autowired
    QuestionService questionService;
    @Autowired
    AnswerService answerService;
    @Autowired
    UserService userService;

    @GetMapping("/main")
    public String mainPage(){
        return "zhifou_question";
    }

    @PostMapping("/full")
    @ResponseBody
    public ResultVO showAllAnswers(@RequestBody Map answerMap){
        int questionId = Integer.parseInt((String) answerMap.get("questionId"));
        int count = (int)answerMap.get("count");
        QuestionInfo questionInfo = questionService.findQuestionInfoByQuestionId(questionId);
        List<AnswerInfo> answerInfoListAll = questionService.findAllAnswerByQuestionId(questionId);
        List<AnswerInfo> answerInfoList;
        if(count+10<answerInfoListAll.size()) {
            answerInfoList = answerInfoListAll.subList(count, count + 10);
        }
        else{
            answerInfoList = answerInfoListAll.subList(count,answerInfoListAll.size());
        }
        HashMap map1 = new HashMap();
        List<HashMap> resultList = new ArrayList<HashMap>();
        for(AnswerInfo answerInfo:answerInfoList)
        {
            HashMap map = new HashMap();
            map = new HashMap();
            UserInfo userInfo = userService.findByUserNickname(answerInfo.getUserNickname());
            map.put("userNickname",answerInfo.getUserNickname());
            map.put("userDescription",userInfo.getUserDescription());
            map.put("userImageUrl",userInfo.getUserImageUrl());
            map.put("answerStar",answerInfo.getAnswerStar());
            map.put("answerDescription",answerInfo.getAnswerDescription());
            map.put("updateTime",answerInfo.getUpdateTime());
            map.put("commentNumber",answerInfo.getCommentNumber());
            map.put("answerId",answerInfo.getAnswerId());
            map.put("state","down");
            List<AnswerInfo> answerInfoList1 = userService.findAllStarAnswer(userInfo);
            for(AnswerInfo answerInfoIndex:answerInfoList1){
                if(answerInfoIndex.getAnswerId()==answerInfo.getAnswerId()){
                    map.put("state","up");
                    break;
                }
            }
            System.out.println(userInfo.getUserDescription());
            resultList.add(map);
        }
        map1.put("questionTitle",questionInfo.getQuestionTitle());
        map1.put("questionDescription",questionInfo.getQuestionDescription());
        map1.put("questionBrowsers",questionInfo.getQuestionBrowsers());
        map1.put("questionFollowers",questionInfo.getQuestionFollowers());
        map1.put("answerInfoList",resultList);
        return ResultVOUtil.success(map1);
    }

    @GetMapping("/new")
    @ResponseBody
    public ResultVO findHotQuestion(){
        return ResultVOUtil.success(questionService.findAllHotQuestions());
    }


}
