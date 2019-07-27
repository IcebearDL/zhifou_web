package com.example.zhifou.entity;

import lombok.Data;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@DynamicUpdate
@EntityListeners(AuditingEntityListener.class)
public class ArticleInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int articleId;
    private int commentNumber;
    private String articleTitle;
    private String articleExtraction;
    private String articleDescription;
    private int articleStar;
    private String userNickname;
    private String firstImage;
    @CreatedDate
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date createTime;
    @LastModifiedDate
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date updateTime;

}
