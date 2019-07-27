package com.example.zhifou.service;
import com.example.zhifou.entity.*;
import com.example.zhifou.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.SessionAttribute;

import java.util.List;

@Service
public class ArticleService {
    @Autowired
    private ArticleInfoRepository articleInfoRepository;
    @Autowired
    private UserStarArticleRepository userStarArticleRepository;
    @Autowired
    private CommentInfoArticleRepository commentInfoArticleRepository;
    @Autowired
    private DynamicService dynamicService;

    public List<ArticleInfo> findAllArticleInfo(){
        return articleInfoRepository.findAll();
    }
    public CommentInfoArticle saveCommentInfo(CommentInfoArticle commentInfoArticle){
        return commentInfoArticleRepository.save(commentInfoArticle);
    }
    public ArticleInfo save(ArticleInfo articleInfo){
        return articleInfoRepository.save(articleInfo);
    }

    public ArticleInfo findArticleInfoByArticleId(int articleId){
        return articleInfoRepository.findByArticleId(articleId);
    }

    public Page<CommentInfoArticle> findAllCommentInfoByArticleId(int articleId,Pageable pageable){
        return commentInfoArticleRepository.findAllByArticleId(articleId,pageable);
    }

    @Transactional
    public void starArticle(int userId, int articleId, String state,UserInfo userInfo){
        UserStarArticle userStarArticle = new UserStarArticle();
        ArticleInfo articleInfo = articleInfoRepository.findByArticleId(articleId);
        if(state.equals("up")){
            userStarArticle.setUserId(userId);
            userStarArticle.setArticleId(articleId);
            userStarArticleRepository.save(userStarArticle);
            articleInfo.setArticleStar(articleInfo.getArticleStar()+1);
            articleInfoRepository.save(articleInfo);

            DynamicInfo dynamicInfo = new DynamicInfo();
            dynamicInfo.setDynamicType(2);
            dynamicInfo.setDynamicUserId(userInfo.getUserId());
            dynamicInfo.setDynamicTypeId(articleInfo.getArticleId());
            dynamicService.save(dynamicInfo);
        }
        else {
            articleInfo.setArticleStar(articleInfo.getArticleStar()-1);
            articleInfoRepository.save(articleInfo);
            userStarArticleRepository.deleteByArticleId(articleId);
            dynamicService.delete(2,articleInfo.getArticleId(),userInfo.getUserId());
        }
    }
    public List<ArticleInfo> searchArticles(String string){
        return articleInfoRepository.findAllByArticleDescriptionLike("%"+string+"%");
    }


}
