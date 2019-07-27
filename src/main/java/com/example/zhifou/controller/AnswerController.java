package com.example.zhifou.controller;

import com.example.zhifou.VO.ResultVO;
import com.example.zhifou.entity.*;
import com.example.zhifou.service.AnswerService;
import com.example.zhifou.service.DynamicService;
import com.example.zhifou.service.QuestionService;
import com.example.zhifou.utils.ResultVOUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.*;

@Controller
@RequestMapping("/answer")
public class AnswerController {
    @Autowired
    AnswerService answerService;
    @Autowired
    QuestionService questionService;
    @Autowired
    DynamicService dynamicService;

    @PostMapping("/description")
    @ResponseBody
    public ResultVO showFull(@RequestParam("answerId") int answerId){
        AnswerInfo answerInfo = answerService.findAnswerInfoById(answerId);
        return ResultVOUtil.success(answerInfo.getAnswerDescription());
    }

    @PostMapping("/check")
    @ResponseBody
    public ResultVO showCheck(@RequestBody Map map, HttpServletRequest request,@SessionAttribute("userInfo") UserInfo userInfo){
        int questionId = Integer.parseInt((String)map.get("questionId"));
        List<AnswerInfo> answerList = questionService.findAllAnswerByQuestionId(questionId);
        for(AnswerInfo answerInfo:answerList){
            if(answerInfo.getUserNickname().equals(userInfo.getUserNickname())){
                return ResultVOUtil.success(answerInfo);
            }
        }
        return ResultVOUtil.success();
    }


    @GetMapping("/extraction")
    @ResponseBody
    public ResultVO findAllAnswer(){
        List<AnswerInfo> answerInfoList = answerService.findAllAnswer();
        ArrayList<HashMap> maps = new ArrayList<HashMap>();
        int count = 0;
        while(count < 20){
            int max = answerInfoList.size();
            Random random = new Random();
            int index = random.nextInt(max);
            AnswerInfo answerInfo = answerInfoList.get(index);
            QuestionInfo questionInfo = answerService.findQuestionInfo(answerInfo);
            HashMap map = new HashMap();
            map.put("questionTitle",questionInfo.getQuestionTitle());
            map.put("answerStar",answerInfo.getAnswerStar());
            map.put("answerExtraction",answerInfo.getAnswerExtraction());
            map.put("answerId",answerInfo.getAnswerId());
            map.put("commentNumber",answerInfo.getCommentNumber());
            map.put("questionId",questionInfo.getQuestionId());
            maps.add(map);
            count++;
        }
        return ResultVOUtil.success(maps);
    }

    @PostMapping("/star")
    @ResponseBody
    public ResultVO starAnswer(@RequestBody Map map,
                               @SessionAttribute UserInfo userInfo){
        int answerId = (int) map.get("answerId");
        String state = (String) map.get("state");
        answerService.starAnswer(userInfo.getUserId(),answerId, state,userInfo);
        AnswerInfo answerInfo= answerService.findAnswerInfoById(answerId);

        return ResultVOUtil.success(answerInfo.getAnswerStar());
    }

    @PostMapping("/comment")
    @ResponseBody
    public ResultVO showAllAnswers(@RequestBody Map answerMap){
        int answerId = (int)answerMap.get("answerId");
        int count = (int)answerMap.get("count");
        List<CommentInfo> commentInfoListAll = answerService.findAllCommentInfoByAnswerId(answerId);
        List<CommentInfo> commentInfoList;
        if(count+15<commentInfoListAll.size()) {
            commentInfoList = commentInfoListAll.subList(count, count + 15);
        }
        else{
            commentInfoList = commentInfoListAll.subList(count,commentInfoListAll.size());
        }
        HashMap resultMap = new HashMap();
        List<HashMap> resultList = new ArrayList<HashMap>();
        for(CommentInfo commentInfo:commentInfoList)
        {
            HashMap map = new HashMap();
            map.put("userNickname",commentInfo.getUserNickname());
            map.put("userImageUrl",commentInfo.getUserImageUrl());
            map.put("commentStar",commentInfo.getCommentStar());
            map.put("commentDescription",commentInfo.getCommentDescription());
            map.put("commentId",commentInfo.getCommentId());
            map.put("updateTime",commentInfo.getUpdateTime());
            resultList.add(map);
        }
        resultMap.put("commentNumber",answerService.findAnswerInfoById(answerId).getCommentNumber());
        resultMap.put("commentInfoList",resultList);
        return ResultVOUtil.success(resultMap);
    }






}
