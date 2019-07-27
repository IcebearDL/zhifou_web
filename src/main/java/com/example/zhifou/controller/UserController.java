package com.example.zhifou.controller;

import com.example.zhifou.VO.ResultVO;
import com.example.zhifou.entity.*;
import com.example.zhifou.service.*;
import com.example.zhifou.utils.CompareUtil;
import com.example.zhifou.utils.ResultVOUtil;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.*;

@Controller
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserService userService;
    @Autowired
    AnswerService answerService;
    @Autowired
    QuestionService questionService;
    @Autowired
    CollectionService collectionService;
    @Autowired
    ArticleService articleService;
    @Autowired
    CommentService commentService;
    @Autowired
    DynamicService dynamicService;

    @GetMapping("/register")
    public String register() {
        return "zhifou_register";
    }

    @GetMapping("/main")
    public String mainPage() {
        return "zhifou_main";
    }

    @GetMapping("/setting")
    public String settingPage() {
        return "zhifou_setting";
    }

    @GetMapping("/article")
    public String article() {
        return "zhifou_article";
    }

    @GetMapping("/searchPage")
    public String search() {
        return "zhifou_searchInfo";
    }

    @GetMapping("/hotSpot")
    public String hotSpot() {
        return "zhifou_hotSpot";
    }

    @GetMapping("/personalPage")
    public String personalPage() {
        return "zhifou_personalInfo";
    }

    @GetMapping("/writeArticle")
    public String writeArticle() {
        return "zhifou_writeArticle";
    }

    @GetMapping("/articleDetail")
    public String articleDetail() {
        return "zhifou_articleDetail";
    }

    @PostMapping("/login")
    @ResponseBody
    public ResultVO login(@RequestBody Map<String, String> map, HttpServletRequest request) {
        String userUserName = map.get("userUserName");
        String userPassword = map.get("userPassword");
        UserInfo userInfo = userService.login(userUserName, userPassword);
        request.getSession().setAttribute("userInfo", userInfo);
        if (userInfo != null) {
            return ResultVOUtil.success(userInfo);
        } else {
            return ResultVOUtil.error(0, "登录失败");
        }
    }

   /* @GetMapping("/logout")
    @ResponseBody
    public ResultVO logout(HttpServletRequest request){
        HttpSession session = request.getSession();
        session.invalidate();
        return ResultVOUtil.success();
    }*/


    @PostMapping("/register/load")
    @ResponseBody
    public String registerLoad(@RequestBody Map<String, String> map) {
        String userUserName = map.get("userUserName");
        String userPassword = map.get("userPassword");
        String userNickName = map.get("userNickname");
        UserInfo userInfo = userService.register(userUserName, userPassword, userNickName);
        if (userInfo != null) {
            return "success";
        } else {
            return "failed";
        }
    }

    @GetMapping("/questions")
    @ResponseBody
    public ResultVO findUserQuestions(HttpServletRequest request) {
        UserInfo userInfo = (UserInfo) request.getSession().getAttribute("userInfo");
        List<QuestionInfo> questionInfoList = userService.findUserQuestions(userInfo);
        return ResultVOUtil.success(questionInfoList);
    }

    @GetMapping("/answers")
    @ResponseBody
    public ResultVO findUserAnswers(HttpServletRequest request) {
        UserInfo userInfo = (UserInfo) request.getSession().getAttribute("userInfo");
        List<AnswerInfo> answerInfoList = userService.findUserAnswers(userInfo);
        ArrayList<HashMap> maps = new ArrayList<HashMap>();
        for (AnswerInfo answerInfo : answerInfoList) {
            QuestionInfo questionInfo = answerService.findQuestionInfo(answerInfo);
            HashMap map = new HashMap();
            map.put("questionTitle", questionInfo.getQuestionTitle());
            map.put("answerStar", answerInfo.getAnswerStar());
            map.put("answerDescription", answerInfo.getAnswerDescription());
            map.put("answerId", answerInfo.getAnswerId());
            map.put("questionId",questionInfo.getQuestionId());
            map.put("commentNumber",answerInfo.getCommentNumber());
            map.put("updateTime",answerInfo.getUpdateTime());
            maps.add(map);
        }
        return ResultVOUtil.success(maps);
    }

    @GetMapping("/articles")
    @ResponseBody
    public ResultVO findUserArticles(@SessionAttribute("userInfo") UserInfo userInfo) {
        List<ArticleInfo> articleInfoList = userService.findUserArticles(userInfo);
        return ResultVOUtil.success(articleInfoList);
    }

    @GetMapping("/stars/answer")
    @ResponseBody
    public ResultVO findUserStarsAnswer(@SessionAttribute("userInfo") UserInfo userInfo) {
        List<AnswerInfo> answerInfoList = userService.findAllStarAnswer(userInfo);
        List<HashMap> resultList = new ArrayList<HashMap>();
        for (AnswerInfo answerInfo : answerInfoList) {
            HashMap map = new HashMap();
            map = new HashMap();
            QuestionInfo questionInfo = answerService.findQuestionInfo(answerInfo);
            UserInfo userInfo1 = userService.findByUserNickname(answerInfo.getUserNickname());
            map.put("questionId",questionInfo.getQuestionId());
            map.put("questionTitle", questionInfo.getQuestionTitle());
            map.put("answerStar", answerInfo.getAnswerStar());
            map.put("answerDescription", answerInfo.getAnswerDescription());
            map.put("updateTime", answerInfo.getUpdateTime());
            map.put("commentNumber", answerInfo.getCommentNumber());
            map.put("answerId", answerInfo.getAnswerId());
            map.put("userNickname",userInfo1.getUserNickname());
            map.put("userImageUrl",userInfo1.getUserImageUrl());
            map.put("userDescription",userInfo1.getUserDescription());
            resultList.add(map);
        }
        return ResultVOUtil.success(resultList);
    }

    @GetMapping("/stars/article")
    @ResponseBody
    public ResultVO findUserStarsArticle(@SessionAttribute("userInfo") UserInfo userInfo) {
        List<ArticleInfo> articleInfoList = userService.findAllStarArticle(userInfo);
        List<HashMap> hashMaps = new ArrayList<HashMap>();
        for(ArticleInfo articleInfo:articleInfoList){
        HashMap hashMap = new HashMap();
        UserInfo userInfo1 = userService.findByUserNickname(articleInfo.getUserNickname());
        hashMap.put("userNickname",articleInfo.getUserNickname());
        hashMap.put("userDescription",userInfo1.getUserDescription());
        hashMap.put("userImageUrl",userInfo1.getUserImageUrl());
        hashMap.put("articleTitle",articleInfo.getArticleTitle());
        hashMap.put("articleStar",articleInfo.getArticleStar());
        hashMap.put("articleDescription",articleInfo.getArticleDescription());
        hashMap.put("articleId",articleInfo.getArticleId());
        hashMap.put("updateTime",articleInfo.getUpdateTime());
        hashMap.put("commentNumber",articleInfo.getCommentNumber());
        hashMap.put("state","down");
        hashMaps.add(hashMap);
        }
        return ResultVOUtil.success(hashMaps);
    }

    @PostMapping("/create/answer")
    @ResponseBody
    public ResultVO writeAnswer(@RequestBody Map map,
                                HttpServletRequest request) {
        int questionId = Integer.parseInt((String) map.get("questionId"));
        String answerDescription = (String) map.get("answerDescription");
        UserInfo userInfo = (UserInfo) request.getSession().getAttribute("userInfo");
        String answerExtraction;
        if (answerDescription.length() > 160) {
            answerExtraction = answerDescription.substring(0, 160);
        } else {
            answerExtraction = answerDescription;
        }
        AnswerInfo answerInfo = new AnswerInfo();
        answerInfo.setAnswerStar(0);
        answerInfo.setAnswerExtraction(answerExtraction);
        answerInfo.setAnswerDescription(answerDescription);
        answerInfo.setUserNickname(userInfo.getUserNickname());
        answerService.saveAnswerInfo(answerInfo);

        QuestionAnswer questionAnswer = new QuestionAnswer();
        questionAnswer.setQuestionId(questionId);
        questionAnswer.setAnswerId(answerInfo.getAnswerId());
        questionService.save(questionAnswer);

        UserAnswer userAnswer = new UserAnswer();
        userAnswer.setUserId(userInfo.getUserId());
        userAnswer.setAnswerId(answerInfo.getAnswerId());
        userService.save(userAnswer);

        DynamicInfo dynamicInfo = new DynamicInfo();
        dynamicInfo.setDynamicType(4);
        dynamicInfo.setDynamicUserId(userInfo.getUserId());
        dynamicInfo.setDynamicTypeId(answerInfo.getAnswerId());
        dynamicService.save(dynamicInfo);
        return ResultVOUtil.success(answerInfo);
    }

    @PutMapping("/editAnswer")
    @ResponseBody
    public ResultVO editAnswer(@RequestBody Map map, @SessionAttribute("userInfo") UserInfo userInfo) {
        int questionId = Integer.parseInt((String) map.get("questionId"));
        String answerDescription = (String) map.get("answerDescription");
        List<AnswerInfo> answerInfoList = questionService.findAllAnswerByQuestionId(questionId);
        for (AnswerInfo answerInfo : answerInfoList) {
            if (answerInfo.getUserNickname().equals(userInfo.getUserNickname())) {
                answerInfo.setAnswerDescription(answerDescription);
                answerService.saveAnswerInfo(answerInfo);
                ResultVOUtil.success(answerInfo);
            }
        }
        return ResultVOUtil.success();
    }

    @PostMapping("/delete/answer")
    @ResponseBody
    public ResultVO deleteAnswer(@RequestBody Map map, @SessionAttribute("userInfo") UserInfo userInfo) {
        int answerId = Integer.parseInt((String) map.get("answerId"));
        answerService.deleteAnswerBuAnswerId(answerId);
        questionService.deleteQuestionAnswerByAnswerId(answerId);
        userService.deleteUserAnserByAnswerId(answerId);
        commentService.deleteByAnswerId(answerId);
        return ResultVOUtil.success();
    }


    @PostMapping("/create/comment")
    @ResponseBody
    public ResultVO writeComment(@RequestBody Map map,
                                 HttpServletRequest request) {
        int answerId = (int) map.get("answerId");
        String commentDescription = (String) map.get("commentDescription");
        UserInfo userInfo = (UserInfo) request.getSession().getAttribute("userInfo");
        CommentInfo commentInfo = new CommentInfo();
        commentInfo.setAnswerId(answerId);
        commentInfo.setCommentStar(0);
        commentInfo.setUserNickname(userInfo.getUserNickname());
        commentInfo.setUserImageUrl(userInfo.getUserImageUrl());
        commentInfo.setCommentDescription(commentDescription);
        commentService.save(commentInfo);
        return ResultVOUtil.success();
    }

    @PostMapping("/create/comment/article")
    @ResponseBody
    public ResultVO writeCommentArticle(@RequestBody Map map,@SessionAttribute("userInfo") UserInfo userInfo) {
        int articleId = (int) map.get("articleId");
        String commentDescription = (String) map.get("commentDescription");
        CommentInfoArticle commentInfoArticle = new CommentInfoArticle();
        commentInfoArticle.setArticleId(articleId);
        commentInfoArticle.setCommentStar(0);
        commentInfoArticle.setUserNickname(userInfo.getUserNickname());
        commentInfoArticle.setUserImageUrl(userInfo.getUserImageUrl());
        commentInfoArticle.setCommentDescription(commentDescription);
        commentService.save(commentInfoArticle);
        return ResultVOUtil.success();
    }

    @PostMapping("/create/question")
    @ResponseBody
    public ResultVO writeQuestion(@RequestBody Map map,
                                  HttpServletRequest request) {
        String questionTitle = (String) map.get("questionTitle");
        String questionDescription = (String) map.get("questionDescription");
        UserInfo userInfo = (UserInfo) request.getSession().getAttribute("userInfo");
        QuestionInfo questionInfo = new QuestionInfo();
        questionInfo.setUserId(userInfo.getUserId());
        questionInfo.setQuestionTitle(questionTitle);
        questionInfo.setQuestionDescription(questionDescription);
        questionInfo.setQuestionFollowers(0);
        QuestionInfo questionInfo1 = questionService.save(questionInfo);

        UserQuestion userQuestion = new UserQuestion();
        userQuestion.setUserId(userInfo.getUserId());
        userQuestion.setQuestionId(questionInfo1.getQuestionId());
        userService.save(userQuestion);

        DynamicInfo dynamicInfo = new DynamicInfo();
        dynamicInfo.setDynamicType(3);
        dynamicInfo.setDynamicUserId(userInfo.getUserId());
        dynamicInfo.setDynamicTypeId(questionInfo.getQuestionId());
        dynamicService.save(dynamicInfo);
        return ResultVOUtil.success();
    }

    @PostMapping("/create/article")
    @ResponseBody
    public ResultVO writeArticle(@RequestBody Map map, @SessionAttribute("userInfo") UserInfo userInfo) {
        String articleTitle = (String) map.get("articleTitle");
        String articleDescription = (String) map.get("articleDescription");
        ArticleInfo articleInfo = new ArticleInfo();
        articleInfo.setArticleTitle(articleTitle);
        articleInfo.setArticleDescription(articleDescription);
        articleInfo.setArticleStar(0);
        articleInfo.setCommentNumber(0);
        articleInfo.setUserNickname(userInfo.getUserNickname());
        articleService.save(articleInfo);

        UserArticle userArticle = new UserArticle();
        userArticle.setUserId(userInfo.getUserId());
        userArticle.setArticleId(articleInfo.getArticleId());
        userService.save(userArticle);

        DynamicInfo dynamicInfo = new DynamicInfo();
        dynamicInfo.setDynamicType(5);
        dynamicInfo.setDynamicUserId(userInfo.getUserId());
        dynamicInfo.setDynamicTypeId(articleInfo.getArticleId());
        dynamicService.save(dynamicInfo);
        return ResultVOUtil.success();
    }


    @PostMapping("/modify")
    @ResponseBody
    public ResultVO modifyPersonalInformation(@RequestBody Map map, HttpServletRequest request) {
        UserInfo userInfo = (UserInfo) request.getSession().getAttribute("userInfo");
        String userNickname = (String) map.get("userNickname");
        String userDescrption = (String) map.get("userDescription");
        String userPassword = (String) map.get("userPassword");
        userInfo.setUserDescription(userDescrption);
        userInfo.setUserNickname(userNickname);
        userInfo.setUserPassword(userPassword);
        userService.save(userInfo);
        request.getSession().setAttribute("userInfo", userInfo);
        return ResultVOUtil.success();
    }

    @PostMapping("/modify/imageUrl")
    @ResponseBody
    public ResultVO modifyUserImageUrl(@RequestBody Map map, HttpServletRequest request) {
        String userImageUrl = (String) map.get("userImageUrl");
        UserInfo userInfo = (UserInfo) request.getSession().getAttribute("userInfo");
        userInfo.setUserImageUrl(userImageUrl);
        userService.save(userInfo);
        HttpSession session = request.getSession();
        session.setAttribute("userInfo", userInfo);
        return ResultVOUtil.success(userInfo);
    }

    @PostMapping("/collect")
    @ResponseBody
    public ResultVO collect(@RequestBody Map map, HttpServletRequest request) {
        UserInfo userInfo = (UserInfo) request.getSession().getAttribute("userInfo");
        int collectionType = (int) map.get("collectionType");
        int collectionTypeId = (int) map.get("collectionTypeId");
        String state = (String) map.get("state");
        userService.collect(collectionType, collectionTypeId, userInfo.getUserId(), state, userInfo);
        return ResultVOUtil.success();
    }

    @GetMapping("/collections/question")
    @ResponseBody
    public ResultVO findAllCollectionsQuestion(HttpServletRequest request) {
        UserInfo userInfo = (UserInfo) request.getSession().getAttribute("userInfo");
        List<CollectionInfo> collectionInfoList = collectionService.findAll(0, userInfo.getUserId());
        ArrayList<HashMap> maps = new ArrayList<HashMap>();
        for (CollectionInfo collectionInfo : collectionInfoList) {
            HashMap map = new HashMap();
            QuestionInfo questionInfo = questionService.findQuestionInfoByQuestionId(collectionInfo.getCollectionTypeId());
            map.put("questionTitle", questionInfo.getQuestionTitle());
            map.put("questionDescription", questionInfo.getQuestionDescription());
            map.put("updateTime", questionInfo.getUpdateTime());
            map.put("questionBrowsers", questionInfo.getQuestionBrowsers());
            map.put("questionFollowers", questionInfo.getQuestionFollowers());
            map.put("questionId",questionInfo.getQuestionId());
            maps.add(map);
        }
        return ResultVOUtil.success(maps);
    }


    @GetMapping("/collections/answer")
    @ResponseBody
    public ResultVO findAllCollectionsAnswer(HttpServletRequest request) {
        UserInfo userInfo = (UserInfo) request.getSession().getAttribute("userInfo");
        List<CollectionInfo> collectionInfoList = collectionService.findAll(1, userInfo.getUserId());
        ArrayList<HashMap> maps = new ArrayList<HashMap>();
        for (CollectionInfo collectionInfo : collectionInfoList) {
            HashMap map = new HashMap();
            AnswerInfo answerInfo = answerService.findAnswerInfoById(collectionInfo.getCollectionTypeId());
            UserInfo userInfo1 = userService.findByUserNickname(answerInfo.getUserNickname());
            QuestionInfo questionInfo = answerService.findQuestionInfo(answerInfo);
            map.put("userNickname",userInfo1.getUserNickname());
            map.put("userDescription",userInfo1.getUserDescription());
            map.put("userImageUrl",userInfo1.getUserImageUrl());
            map.put("questionId",questionInfo.getQuestionId());
            map.put("questionTitle", questionInfo.getQuestionTitle());
            map.put("answerStar", answerInfo.getAnswerStar());
            map.put("answerDescription", answerInfo.getAnswerDescription());
            map.put("commentNumber", answerInfo.getCommentNumber());
            map.put("answerId", answerInfo.getAnswerId());
            map.put("updateTime", answerInfo.getUpdateTime());
            maps.add(map);
        }
        return ResultVOUtil.success(maps);
    }

    @GetMapping("/collections/article")
    @ResponseBody
    public ResultVO findAllCollectionsArticle(HttpServletRequest request) {
        UserInfo userInfo = (UserInfo) request.getSession().getAttribute("userInfo");
        List<CollectionInfo> collectionInfoList = collectionService.findAll(2, userInfo.getUserId());
        ArrayList<HashMap> maps = new ArrayList<HashMap>();
        for (CollectionInfo collectionInfo : collectionInfoList) {
            HashMap map = new HashMap();
            ArticleInfo articleInfo = articleService.findArticleInfoByArticleId(collectionInfo.getCollectionTypeId());
            UserInfo userInfo1 = userService.findByUserNickname(articleInfo.getUserNickname());
            map.put("userNickname",userInfo1.getUserNickname());
            map.put("userDescription",userInfo1.getUserDescription());
            map.put("userImageUrl",userInfo1.getUserImageUrl());
            map.put("articleTitle", articleInfo.getArticleTitle());
            map.put("articleDescription", articleInfo.getArticleDescription());
            map.put("updateTime", articleInfo.getUpdateTime());
            map.put("articleId", articleInfo.getArticleId());
            map.put("commentNumber", articleInfo.getCommentNumber());
            map.put("articleStar", articleInfo.getArticleStar());
            maps.add(map);
        }
        return ResultVOUtil.success(maps);
    }

    @GetMapping("/dynamics")
    @ResponseBody
    public ResultVO findDynamics(@SessionAttribute("userInfo") UserInfo userInfo) {
        List<DynamicInfo> dynamicInfoList = dynamicService.findAllDynamics(userInfo.getUserId());
        Collections.sort(dynamicInfoList, new Comparator<DynamicInfo>() {
            @Override
            public int compare(DynamicInfo o1, DynamicInfo o2) {
                return CompareUtil.compareDate(o2.getUpdateTime(),o1.getUpdateTime());
            }
        });
        List<HashMap> hashMaps = new ArrayList<HashMap>();
        for (DynamicInfo dynamicInfo : dynamicInfoList) {
            int dynamicType = dynamicInfo.getDynamicType();
            int dynamicTypeId = dynamicInfo.getDynamicTypeId();
            if (dynamicType == 1) {
                HashMap hashMap = new HashMap();
                AnswerInfo answerInfo = answerService.findAnswerInfoById(dynamicTypeId);
                QuestionInfo questionInfo = answerService.findQuestionInfo(answerInfo);
                UserInfo userInfo1 = userService.findByUserNickname(answerInfo.getUserNickname());
                HashMap map = new HashMap();
                map.put("userNickname", answerInfo.getUserNickname());
                map.put("userDescription", userInfo1.getUserDescription());
                map.put("userImageUrl", userInfo1.getUserImageUrl());
                map.put("questionTitle", questionInfo.getQuestionTitle());
                map.put("answerStar", answerInfo.getAnswerStar());
                map.put("answerDescription", answerInfo.getAnswerDescription());
                map.put("answerId", answerInfo.getAnswerId());
                map.put("commentNumber", answerInfo.getCommentNumber());
                map.put("questionId", questionInfo.getQuestionId());
                map.put("updateTime",questionInfo.getUpdateTime());
                map.put("type",dynamicType);
                hashMaps.add(map);
            }
            if (dynamicType == 2) {
                ArticleInfo articleInfo = articleService.findArticleInfoByArticleId(dynamicTypeId);
                UserInfo userInfo1 = userService.findByUserNickname(articleInfo.getUserNickname());
                HashMap map = new HashMap();
                map.put("userNickname", articleInfo.getUserNickname());
                map.put("userDescription", userInfo1.getUserDescription());
                map.put("userImageUrl", userInfo1.getUserImageUrl());
                map.put("articleTitle", articleInfo.getArticleTitle());
                map.put("articleStar", articleInfo.getArticleStar());
                map.put("articleDescription", articleInfo.getArticleDescription());
                map.put("articleId", articleInfo.getArticleId());
                map.put("updateTime", articleInfo.getUpdateTime());
                map.put("commentNumber", articleInfo.getCommentNumber());
                map.put("type",dynamicType);
                hashMaps.add(map);
            }
            if(dynamicType==3){
                QuestionInfo questionInfo = questionService.findQuestionInfoByQuestionId(dynamicTypeId);
                HashMap map = new HashMap();
                map.put("questionTitle",questionInfo.getQuestionTitle());
                map.put("questionDescription",questionInfo.getQuestionDescription());
                map.put("questionFollowers",questionInfo.getQuestionFollowers());
                map.put("questionBrowsers",questionInfo.getQuestionBrowsers());
                map.put("questionId",questionInfo.getQuestionId());
                map.put("updateTime",questionInfo.getUpdateTime());
                map.put("type",dynamicType);
            }
            if(dynamicType==4){
                HashMap hashMap = new HashMap();
                AnswerInfo answerInfo = answerService.findAnswerInfoById(dynamicTypeId);
                QuestionInfo questionInfo = answerService.findQuestionInfo(answerInfo);
                UserInfo userInfo1 = userService.findByUserNickname(answerInfo.getUserNickname());
                HashMap map = new HashMap();
                map.put("userNickname", answerInfo.getUserNickname());
                map.put("userDescription", userInfo1.getUserDescription());
                map.put("userImageUrl", userInfo1.getUserImageUrl());
                map.put("questionTitle", questionInfo.getQuestionTitle());
                map.put("answerStar", answerInfo.getAnswerStar());
                map.put("answerDescription", answerInfo.getAnswerDescription());
                map.put("answerId", answerInfo.getAnswerId());
                map.put("commentNumber", answerInfo.getCommentNumber());
                map.put("questionId", questionInfo.getQuestionId());
                map.put("updateTime",questionInfo.getUpdateTime());
                map.put("type",dynamicType);
                hashMaps.add(map);
            }
            if(dynamicType==5){
                ArticleInfo articleInfo = articleService.findArticleInfoByArticleId(dynamicTypeId);
                UserInfo userInfo1 = userService.findByUserNickname(articleInfo.getUserNickname());
                HashMap map = new HashMap();
                map.put("userNickname", articleInfo.getUserNickname());
                map.put("userDescription", userInfo1.getUserDescription());
                map.put("userImageUrl", userInfo1.getUserImageUrl());
                map.put("articleTitle", articleInfo.getArticleTitle());
                map.put("articleStar", articleInfo.getArticleStar());
                map.put("articleDescription", articleInfo.getArticleDescription());
                map.put("articleId", articleInfo.getArticleId());
                map.put("updateTime", articleInfo.getUpdateTime());
                map.put("commentNumber", articleInfo.getCommentNumber());
                map.put("type",dynamicType);
                hashMaps.add(map);
            }
            if(dynamicType==6){
                CollectionInfo collectionInfo = collectionService.findCollectionInfoById(dynamicTypeId);
                if(collectionInfo.getCollectionType()==0){
                    QuestionInfo questionInfo = questionService.findQuestionInfoByQuestionId(
                            collectionInfo.getCollectionTypeId());
                    HashMap map = new HashMap();
                    map.put("questionTitle",questionInfo.getQuestionTitle());
                    map.put("questionDescription",questionInfo.getQuestionDescription());
                    map.put("questionFollowers",questionInfo.getQuestionFollowers());
                    map.put("questionBrowsers",questionInfo.getQuestionBrowsers());
                    map.put("type",dynamicType);
                    map.put("updateTime",questionInfo.getUpdateTime());
                    map.put("collectionType",collectionInfo.getCollectionType());
                    map.put("questionId",questionInfo.getQuestionId());
                    hashMaps.add(map);
                }
                else if(collectionInfo.getCollectionType()==1){
                    AnswerInfo answerInfo = answerService.findAnswerInfoById(collectionInfo.getCollectionTypeId());
                    QuestionInfo questionInfo = answerService.findQuestionInfo(answerInfo);
                    UserInfo userInfo1 = userService.findByUserNickname(answerInfo.getUserNickname());
                    HashMap map = new HashMap();
                    map.put("userNickname", answerInfo.getUserNickname());
                    map.put("userDescription", userInfo1.getUserDescription());
                    map.put("userImageUrl", userInfo1.getUserImageUrl());
                    map.put("questionTitle", questionInfo.getQuestionTitle());
                    map.put("answerStar", answerInfo.getAnswerStar());
                    map.put("answerId", answerInfo.getAnswerId());
                    map.put("answerDescription", answerInfo.getAnswerDescription());
                    map.put("commentNumber", answerInfo.getCommentNumber());
                    map.put("questionId", questionInfo.getQuestionId());
                    map.put("type",dynamicType);
                    map.put("collectionType",collectionInfo.getCollectionType());
                    map.put("updateTime",answerInfo.getUpdateTime());
                    hashMaps.add(map);
                }
                else if(collectionInfo.getCollectionType()==2){
                    ArticleInfo articleInfo = articleService.findArticleInfoByArticleId(collectionInfo.getCollectionTypeId());
                    UserInfo userInfo1 = userService.findByUserNickname(articleInfo.getUserNickname());
                    HashMap map = new HashMap();
                    map.put("userNickname", articleInfo.getUserNickname());
                    map.put("userDescription", userInfo1.getUserDescription());
                    map.put("userImageUrl", userInfo1.getUserImageUrl());
                    map.put("articleTitle", articleInfo.getArticleTitle());
                    map.put("articleStar", articleInfo.getArticleStar());
                    map.put("articleDescription", articleInfo.getArticleDescription());
                    map.put("articleId", articleInfo.getArticleId());
                    map.put("updateTime", articleInfo.getUpdateTime());
                    map.put("commentNumber", articleInfo.getCommentNumber());
                    map.put("type",dynamicType);
                    map.put("collectionType",collectionInfo.getCollectionType());
                    map.put("updateTime",articleInfo.getUpdateTime());
                    hashMaps.add(map);
                }

            }
        }
            return ResultVOUtil.success(hashMaps);
        }


        @PostMapping("/search")
        @ResponseBody
        public ResultVO search (@RequestBody Map map){
            String string = (String) map.get("searchKeyword");
            System.out.println(string);
            int type = (int) map.get("type");
            List<HashMap> hashMaps = new ArrayList<HashMap>();
            if (type == 0) {
                return ResultVOUtil.success(questionService.searchQuestions(string));
            } else if (type == 2) {
                List<ArticleInfo> articleInfoList = articleService.searchArticles(string);
                for(ArticleInfo articleInfo:articleInfoList) {
                    UserInfo userInfo = userService.findByUserNickname(articleInfo.getUserNickname());
                    HashMap map1 = new HashMap();
                    map1.put("userNickname", articleInfo.getUserNickname());
                    map1.put("userDescription", userInfo.getUserDescription());
                    map1.put("userImageUrl", userInfo.getUserImageUrl());
                    map1.put("articleTitle", articleInfo.getArticleTitle());
                    map1.put("articleStar", articleInfo.getArticleStar());
                    map1.put("articleDescription", articleInfo.getArticleDescription());
                    map1.put("articleId", articleInfo.getArticleId());
                    map1.put("updateTime", articleInfo.getUpdateTime());
                    map1.put("commentNumber", articleInfo.getCommentNumber());
                    hashMaps.add(map1);
                }
                return ResultVOUtil.success(hashMaps);

            } else {
                List<AnswerInfo> answerInfoListAll = answerService.searchAnswers(string);
                List<AnswerInfo> answerInfoList;
                if(answerInfoListAll.size()>30){
                    answerInfoList = answerInfoListAll.subList(0,30);
                }
                else{
                    answerInfoList = answerInfoListAll;
                }
                for(AnswerInfo answerInfo : answerInfoList) {
                    HashMap hashMap = new HashMap();
                    QuestionInfo questionInfo = answerService.findQuestionInfo(answerInfo);
                    UserInfo userInfo = userService.findByUserNickname(answerInfo.getUserNickname());
                    HashMap map1 = new HashMap();
                    map1.put("userNickname", answerInfo.getUserNickname());
                    map1.put("userDescription", userInfo.getUserDescription());
                    map1.put("userImageUrl", userInfo.getUserImageUrl());
                    map1.put("questionTitle", questionInfo.getQuestionTitle());
                    map1.put("answerStar", answerInfo.getAnswerStar());
                    map1.put("answerDescription", answerInfo.getAnswerDescription());
                    map1.put("answerId", answerInfo.getAnswerId());
                    map1.put("commentNumber", answerInfo.getCommentNumber());
                    map1.put("questionId", questionInfo.getQuestionId());
                    map1.put("updateTime",answerInfo.getUpdateTime());
                    hashMaps.add(map1);
                }
                return ResultVOUtil.success(hashMaps);
            }
        }


    }
