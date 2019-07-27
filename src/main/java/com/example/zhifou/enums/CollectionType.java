package com.example.zhifou.enums;

public enum CollectionType {
    QUESTION(0),
    ANSWER(1),
    ARTICLE(2);
    private int type;
    CollectionType(int type){
        this.type = type;
    }
}
