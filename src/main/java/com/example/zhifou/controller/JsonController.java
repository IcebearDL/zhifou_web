package com.example.zhifou.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.example.zhifou.entity.*;
import com.example.zhifou.service.AnswerService;
import com.example.zhifou.service.ArticleService;
import com.example.zhifou.service.QuestionService;
import com.example.zhifou.service.UserService;
import com.example.zhifou.utils.StringUtil;
import com.mysql.cj.xdevapi.JsonArray;
import net.bytebuddy.dynamic.DynamicType;
import org.hibernate.Session;
import org.hibernate.SessionBuilder;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.io.*;
import java.util.*;

@Controller
@RequestMapping("/json")
public class JsonController {
    @Autowired
    UserService userService;
    @Autowired
    AnswerService answerService;
    @Autowired
    QuestionService questionService;
    @Autowired
    ArticleService articleService;


    @RequestMapping("/test")
    public String test() throws IOException {
        writeToDB();
        return "zhifou_main";
    }

    @RequestMapping("/testComment")
    public String testComment() throws IOException {
        writeToDBPlus();
        return "zhifou_main";
    }

    @RequestMapping("/testArticle")
    public String testArticle() throws IOException {
        writeToDBArticle();
        return "zhifou_main";
    }

    @RequestMapping("/testArticleComment")
    public String testArticleComment() throws IOException {
        writeToDBPlusPlus();
        return "zhifou_main";
    }

    @RequestMapping("/testArticleFirstImage")
    public String testArticleImage() throws IOException {
        writeToDBArticleFirstImage();
        return "zhifou_main";
    }

    @RequestMapping("/testQuestion")
    public String testQuestion() throws  IOException{
        writeToDBQuestion();
        return "zhifou_main";
    }

    public void writeToDB() throws IOException {
        File file = new File("C:\\Users\\DELL-PC\\Documents\\GitHub\\zhifou\\src\\main\\resources\\json");
        File[] files = file.listFiles();
        int temp = 0;
        HashMap<String, String> hashMap = new HashMap<String, String>();
        for (File fileIndex : files) {
            String jsonString = readJsonFile(fileIndex.getAbsolutePath());
            JSONObject jsonObject = JSON.parseObject(jsonString);
            String questionTitle = jsonObject.getString("Questiontitle");
            int questionFollowers = jsonObject.getInteger("questionFollowers");
            String questionDescription = jsonObject.getString("questionDescription");
            int questionBrowsers = jsonObject.getInteger("questionBrowsers");
            JSONArray answers = jsonObject.getJSONArray("answers");
            for (int i = 1; i < answers.size(); i++) {
                JSONObject answer = answers.getJSONObject(i);
                int commentNumber = answer.getInteger("commentNumber");
                String userNickname = answer.getString("userNickname");
                String userDescription = answer.getString("userDescription");
                String userImageUrl = answer.getString("userImageUrl");
                String answerExtraction = answer.getString("answerExtraction");
                int answerStar = answer.getInteger("answerStar");
                String answerDescription = answer.getString("answerDescription");
                UserInfo userInfo = new UserInfo();
                QuestionInfo questionInfo = new QuestionInfo();
                questionInfo.setQuestionDescription(questionDescription);
                questionInfo.setQuestionFollowers(questionFollowers);
                questionInfo.setQuestionTitle(questionTitle);
                questionInfo.setUserId(1);
                questionInfo.setQuestionBrowsers(questionBrowsers);
                if(!hashMap.containsKey(questionTitle)){
                    questionService.save(questionInfo);
                    hashMap.put(questionTitle,"111");
                UserQuestion userQuestion = new UserQuestion();;
                userQuestion.setQuestionId(questionInfo.getQuestionId());
                userQuestion.setUserId(1);
                userService.save(userQuestion);
                temp = questionInfo.getQuestionId();
                }

                if (!hashMap.containsKey(userNickname)) {
                    hashMap.put(userNickname, "111");
                    userInfo.setUserNickname(userNickname);
                    userInfo.setUserDescription(userDescription);
                    userInfo.setUserUsername(StringUtil.createUserUsername());
                    userInfo.setUserPassword(StringUtil.createUserUsername());
                    userInfo.setUserImageUrl(userImageUrl);
                    userService.save(userInfo);

                    AnswerInfo answerInfo = new AnswerInfo();
                    answerInfo.setAnswerStar(answerStar);
                    answerInfo.setAnswerExtraction(answerExtraction);
                    answerInfo.setAnswerDescription(answerDescription);
                    answerInfo.setCommentNumber(commentNumber);
                    answerInfo.setUserNickname(userNickname);
                    answerService.saveAnswerInfo(answerInfo);

                    QuestionAnswer questionAnswer = new QuestionAnswer();
                    questionAnswer.setQuestionId(temp);
                    questionAnswer.setAnswerId(answerInfo.getAnswerId());
                    questionService.save(questionAnswer);


                    UserAnswer userAnswer = new UserAnswer();
                    userAnswer.setAnswerId(answerInfo.getAnswerId());
                    userAnswer.setUserId(userInfo.getUserId());
                    userService.save(userAnswer);
                }
            }

        }
    }

    public void writeToDBPlus() throws IOException {
        File file = new File("C:\\Users\\DELL-PC\\Documents\\GitHub\\zhifou\\src\\main\\resources\\jsonComment");
        File[] files = file.listFiles();
        Random random = new Random();
        for (File fileIndex : files) {
            String jsonString = readJsonFile(fileIndex.getAbsolutePath());
            JSONObject jsonObject = JSON.parseObject(jsonString);
            JSONArray comments = jsonObject.getJSONArray("comments");
            List<AnswerInfo> answerInfoList = answerService.findAllAnswer();
            for (AnswerInfo answerInfo : answerInfoList) {
                for (int i = 0; i < answerInfo.getCommentNumber(); i++) {
                    JSONObject comment = comments.getJSONObject(random.nextInt(comments.size()));
                    CommentInfo commentInfo = new CommentInfo();
                    int userId = random.nextInt(600) + 5988;
                    UserInfo userInfo = userService.findByUserId(userId);
                    commentInfo.setUserImageUrl(userInfo.getUserImageUrl());
                    commentInfo.setUserNickname(userInfo.getUserNickname());
                    commentInfo.setCommentDescription(comment.getString("commentText"));
                    commentInfo.setCommentStar(comment.getInteger("commentStar"));
                    commentInfo.setAnswerId(answerInfo.getAnswerId());
                    answerService.saveCommentInfo(commentInfo);
                    if(i>40) break;
                }
            }
        }
    }

    public void writeToDBArticle() throws IOException {
        File file = new File("C:\\Users\\DELL-PC\\Documents\\GitHub\\zhifou\\src\\main\\resources\\jsonArticle");
        File[] files = file.listFiles();
        HashMap<String, String> hashMap = new HashMap<String, String>();
        for (File fileIndex : files) {
            String jsonString = readJsonFile(fileIndex.getAbsolutePath());
            JSONObject article = JSON.parseObject(jsonString);
            String articleTitle = article.getString("title");
            int commentNumber = article.getInteger("commentNumber");
            String userNickname = article.getString("userNickname");
            String userDescription = article.getString("userDescription");
            String userImageUrl = article.getString("userImageUrl");
            String articleExtraction = article.getString("answerExtraction");
            int articleStar = article.getInteger("answerStar");
            String articleDescription = article.getString("answerDescription");
            UserInfo userInfo = new UserInfo();
            if (!hashMap.containsKey(userNickname)) {
                hashMap.put(userNickname, "111");
                userInfo.setUserNickname(userNickname);
                userInfo.setUserDescription(userDescription);
                userInfo.setUserUsername(StringUtil.createUserUsername());
                userInfo.setUserPassword(StringUtil.createUserUsername());
                userInfo.setUserImageUrl(userImageUrl);
                userService.save(userInfo);

                ArticleInfo articleInfo = new ArticleInfo();
                articleInfo.setArticleTitle(articleTitle);
                articleInfo.setArticleStar(articleStar);
                articleInfo.setArticleExtraction(articleExtraction);
                articleInfo.setArticleDescription(articleDescription);
                articleInfo.setCommentNumber(commentNumber);
                articleInfo.setUserNickname(userNickname);
                articleService.save(articleInfo);

                UserArticle userArticle = new UserArticle();
                userArticle.setUserId(userInfo.getUserId());
                userArticle.setArticleId(articleInfo.getArticleId());
                userService.save(userArticle);

                System.out.println(userInfo.getUserId());
                System.out.println(articleInfo.getArticleId());
            }
        }
    }

    public void writeToDBPlusPlus() throws IOException {
        File file = new File("C:\\Users\\DELL-PC\\Documents\\GitHub\\zhifou\\src\\main\\resources\\jsonComment");
        File[] files = file.listFiles();
        Random random = new Random();
        for (File fileIndex : files) {
            String jsonString = readJsonFile(fileIndex.getAbsolutePath());
            JSONObject jsonObject = JSON.parseObject(jsonString);
            List<ArticleInfo> articleInfoList = articleService.findAllArticleInfo();
            JSONArray comments = jsonObject.getJSONArray("comments");
            for (ArticleInfo articleInfo : articleInfoList) {
                for (int i = 0; i < articleInfo.getCommentNumber(); i++) {
                    JSONObject comment = comments.getJSONObject(random.nextInt(comments.size()));
                    CommentInfoArticle commentInfoArticle = new CommentInfoArticle();
                    int userId = random.nextInt(600) + 6000;
                    UserInfo userInfo = userService.findByUserId(userId);
                    if (userInfo != null) {
                        commentInfoArticle.setUserImageUrl(userInfo.getUserImageUrl());
                        commentInfoArticle.setUserNickname(userInfo.getUserNickname());
                        commentInfoArticle.setCommentDescription(comment.getString("commentText"));
                        commentInfoArticle.setCommentStar(comment.getInteger("commentStar"));
                        commentInfoArticle.setArticleId(articleInfo.getArticleId());
                        articleService.saveCommentInfo(commentInfoArticle);
                    }
                }
            }
        }
    }

    public void writeToDBArticleFirstImage() throws  IOException{
        File file = new File("C:\\Users\\DELL-PC\\Documents\\GitHub\\zhifou\\src\\main\\resources\\jsonFirstImage");
        File[] files = file.listFiles();
        HashMap<String, String> hashMap = new HashMap<String, String>();
        for (File fileIndex : files) {
            String jsonString = readJsonFile(fileIndex.getAbsolutePath());
            JSONObject article = JSON.parseObject(jsonString);
            String articleTitle = article.getString("title");
            int commentNumber = article.getInteger("commentNumber");
            String userNickname = article.getString("userNickname");
            String firstImage = article.getString("firstImage");
            String userDescription = article.getString("userDescription");
            String userImageUrl = article.getString("userImageUrl");
            String articleExtraction = article.getString("answerExtraction");
            int articleStar = article.getInteger("answerStar");
            String articleDescription = article.getString("answerDescription");
            UserInfo userInfo = new UserInfo();
            if (!hashMap.containsKey(userNickname)) {
                hashMap.put(userNickname, "111");
                userInfo.setUserNickname(userNickname);
                userInfo.setUserDescription(userDescription);
                userInfo.setUserUsername(StringUtil.createUserUsername());
                userInfo.setUserPassword(StringUtil.createUserUsername());
                userInfo.setUserImageUrl(userImageUrl);
                userService.save(userInfo);

                ArticleInfo articleInfo = new ArticleInfo();
                articleInfo.setArticleTitle(articleTitle);
                articleInfo.setArticleStar(articleStar);
                articleInfo.setArticleExtraction(articleExtraction);
                articleInfo.setArticleDescription(articleDescription);
                articleInfo.setCommentNumber(commentNumber);
                articleInfo.setUserNickname(userNickname);
                articleInfo.setFirstImage(firstImage);
                articleService.save(articleInfo);

                UserArticle userArticle = new UserArticle();
                userArticle.setUserId(userInfo.getUserId());
                userArticle.setArticleId(articleInfo.getArticleId());
                userService.save(userArticle);

            }
        }

    }

    public void writeToDBQuestion() throws IOException {
        File file = new File("C:\\Users\\DELL-PC\\Documents\\GitHub\\zhifou\\src\\main\\resources\\jsonQuestion");
        File[] files = file.listFiles();
        for (File fileIndex : files) {
            String jsonString = readJsonFile(fileIndex.getAbsolutePath());
            JSONObject jsonObject = JSON.parseObject(jsonString);
            JSONArray questions = jsonObject.getJSONArray("newQuestion");
            for (int i = 1; i < questions.size(); i++) {
                JSONObject question =questions.getJSONObject(i);
                String questionTitle = question.getString("questionTitle");
                int questionFollowers = question.getInteger("questionFollowers");
                String questionDescription = question.getString("questionExcerpt");
                int questionBrowsers = question.getInteger("questionBrowsers");
                QuestionInfo questionInfo = new QuestionInfo();
                questionInfo.setQuestionDescription(questionDescription);
                questionInfo.setQuestionFollowers(questionFollowers);
                questionInfo.setQuestionTitle(questionTitle);
                questionInfo.setUserId(1);
                questionInfo.setHot(1);
                questionInfo.setQuestionBrowsers(questionBrowsers);
                questionService.save(questionInfo);

                UserQuestion userQuestion = new UserQuestion();
                userQuestion.setQuestionId(questionInfo.getQuestionId());
                userQuestion.setUserId(1);
                userService.save(userQuestion);
            }
        }
    }
    /**
     * 读取json文件，返回json串
     *
     * @param fileName
     * @return
     */
    public static String readJsonFile(String fileName) throws IOException {
        String jsonStr = "";
        try {
            File jsonFile = new File(fileName);
            FileReader fileReader = new FileReader(jsonFile);

            Reader reader = new InputStreamReader(new FileInputStream(jsonFile), "utf-8");
            int ch = 0;
            StringBuffer sb = new StringBuffer();
            while ((ch = reader.read()) != -1) {
                sb.append((char) ch);
            }
            fileReader.close();
            reader.close();
            jsonStr = sb.toString();
            return jsonStr;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
