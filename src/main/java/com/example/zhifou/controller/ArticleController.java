package com.example.zhifou.controller;

import com.example.zhifou.VO.ResultVO;
import com.example.zhifou.entity.*;
import com.example.zhifou.service.ArticleService;
import com.example.zhifou.service.DynamicService;
import com.example.zhifou.service.UserService;
import com.example.zhifou.utils.ResultVOUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@Controller
@RequestMapping("/article")
public class ArticleController {

    @Autowired
    ArticleService articleService;
    @Autowired
    UserService userService;
    @Autowired
    DynamicService dynamicService;

    @GetMapping("/extraction")
    @ResponseBody
    public ResultVO findAllArticles(){
        List<ArticleInfo> articleInfoList = articleService.findAllArticleInfo();
        ArrayList<HashMap> maps = new ArrayList<HashMap>();
        HashMap articleMap = new HashMap();
        int count = 0;
        while(count < 10){
            int max = articleInfoList.size();
            Random random = new Random();
            int index = random.nextInt(max);
            ArticleInfo articleInfo = articleInfoList.get(index);
            if(!articleMap.containsKey(articleInfo.getArticleId())){
            HashMap map = new HashMap();
            UserInfo userInfo = userService.findByUserNickname(articleInfo.getUserNickname());
            map.put("userNickname",articleInfo.getUserNickname());
            map.put("userDescription",userInfo.getUserDescription());
            map.put("userImageUrl",userInfo.getUserImageUrl());
            map.put("articleTitle",articleInfo.getArticleTitle());
            map.put("articleStar",articleInfo.getArticleStar());
            map.put("articleDescription",articleInfo.getArticleDescription());
            map.put("articleId",articleInfo.getArticleId());
            map.put("updateTime",articleInfo.getUpdateTime());
            map.put("commentNumber",articleInfo.getCommentNumber());
            articleMap.put(articleInfo.getArticleId(),"OK");
            maps.add(map);
            count++;
            }
        }
        return ResultVOUtil.success(maps);
    }

    @PostMapping("/star")
    @ResponseBody
    public ResultVO starArticle(@RequestBody Map map,
                               @SessionAttribute UserInfo userInfo){
        int articleId = (int) map.get("articleId");
        String state = (String) map.get("state");
        articleService.starArticle(userInfo.getUserId(),articleId, state,userInfo);
        ArticleInfo articleInfo= articleService.findArticleInfoByArticleId(articleId);

        return ResultVOUtil.success(articleInfo.getArticleStar());
    }

    @PostMapping("/full")
    @ResponseBody
    public ResultVO showArticle(@RequestBody Map map,
                                @SessionAttribute("userInfo") UserInfo userInfo1 ){
        int offset = (int)map.get("offset");
        int articleId = Integer.parseInt((String)map.get("articleId"));
        Pageable pageable = PageRequest.of(offset,10);
        Page<CommentInfoArticle> commentInfoArticleList = articleService.findAllCommentInfoByArticleId(articleId,pageable);
        ArticleInfo articleInfo = articleService.findArticleInfoByArticleId(articleId);
        HashMap hashMap = new HashMap();
        UserInfo userInfo = userService.findByUserNickname(articleInfo.getUserNickname());
        hashMap.put("userNickname",articleInfo.getUserNickname());
        hashMap.put("userDescription",userInfo.getUserDescription());
        hashMap.put("userImageUrl",userInfo.getUserImageUrl());
        hashMap.put("articleTitle",articleInfo.getArticleTitle());
        hashMap.put("articleStar",articleInfo.getArticleStar());
        hashMap.put("articleDescription",articleInfo.getArticleDescription());
        hashMap.put("articleId",articleInfo.getArticleId());
        hashMap.put("updateTime",articleInfo.getUpdateTime());
        hashMap.put("commentNumber",articleInfo.getCommentNumber());
        hashMap.put("state","down");
        List<UserStarArticle> userStarArticleList = userService.findAllUserStarArticle(userInfo1.getUserId());
        for(UserStarArticle userStarArticle : userStarArticleList){
            int articleId1 = userStarArticle.getArticleId();
            if(articleId1==articleId){
                hashMap.put("state","up");
                break;
            }
        }
        HashMap resultMap = new HashMap();
        resultMap.put("articleInfo",hashMap);
        resultMap.put("commentInfoArticleList",commentInfoArticleList);
        return ResultVOUtil.success(resultMap);
    }

    @GetMapping("/hot")
    @ResponseBody
    public ResultVO findAllHotArticles(){
        List<ArticleInfo> articleInfoListBig = articleService.findAllArticleInfo();
        List<ArticleInfo> articleInfoList  = new ArrayList<ArticleInfo>();
        for(ArticleInfo articleInfo:articleInfoListBig){
            if(articleInfo.getFirstImage()!=null&&(!articleInfo.getFirstImage().equals(""))){
                articleInfoList.add(articleInfo);
            }
        }
        ArrayList<HashMap> maps = new ArrayList<HashMap>();
        HashMap articleMap = new HashMap();
        int count = 0;
        while(count < 2){
            int max = articleInfoList.size();
            Random random = new Random();
            int index = random.nextInt(max);
            ArticleInfo articleInfo = articleInfoList.get(index);
            if(!articleMap.containsKey(articleInfo.getArticleId())){
                HashMap map = new HashMap();
                UserInfo userInfo = userService.findByUserNickname(articleInfo.getUserNickname());
                map.put("userNickname",articleInfo.getUserNickname());
                map.put("userDescription",userInfo.getUserDescription());
                map.put("userImageUrl",userInfo.getUserImageUrl());
                map.put("articleTitle",articleInfo.getArticleTitle());
                map.put("articleStar",articleInfo.getArticleStar());
                map.put("articleDescription",articleInfo.getArticleDescription());
                map.put("articleId",articleInfo.getArticleId());
                map.put("updateTime",articleInfo.getUpdateTime());
                map.put("commentNumber",articleInfo.getCommentNumber());
                map.put("firstImage",articleInfo.getFirstImage());
                articleMap.put(articleInfo.getArticleId(),"OK");
                count++;
                maps.add(map);
            }
        }
        return ResultVOUtil.success(maps);
    }


}
