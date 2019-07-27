package com.example.zhifou.repository;

import com.example.zhifou.entity.UserStar;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserStarRepository extends JpaRepository<UserStar,Integer>{
    List<UserStar> findAllByUserId(int userId);
    void deleteByAnswerId(int answerId);
}
