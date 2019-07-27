package com.example.zhifou.enums;

public enum DynamicType {
    STAR_ANSWER(1),
    STAR_ARTICLE(2),
    WRITE_QUESTION(3),
    WRITE_ANSWER(4),
    WRITE_ARTICLE(5),
    COLLECTION(6);
    private int type;
    DynamicType(int type){
        this.type = type;
    }
}
