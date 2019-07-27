<<<<<<< HEAD
let baseURL = "http://localhost:8080/zhifou";
=======
let baseURL = "http://localhost:8080";
>>>>>>> 275b31322d2e32543fd8ba2c46ab16916f5dfc81

//用于公共复用
function displayQuestionsToHTML(questions) {
    let htmlQuestionsString = '';

    // 数据结构：标题title，用于首页显示的摘要partText,和在看questionStar
    //完整的text，需要在点击阅读全文之后取得。
    questions.forEach(data =>{
        htmlQuestionsString += `
            <div class="page-card">
<<<<<<< HEAD
                <a class="question-top" id="question-top${data.answerId}"></a>
                <div class="page-card-title" onclick="window.open(window.location.origin+'/zhifou/question/main?questionId='+${data.questionId}+'&&type=default')">
=======
                <div class="page-card-title" onclick="window.open('zhifou_question.html?'+${data.answerId})">
<!--                 'http://localhost:8080/question/main?answerId=' +-->
<!--                  window.open(window.location.origin+'/question/main?'+)-->
>>>>>>> 275b31322d2e32543fd8ba2c46ab16916f5dfc81
                    <span>${data.questionTitle}</span>
                </div>
                <div class="page-card-text">
                    <div style="display: block" id="pageCardExtraction${data.answerId}">
<<<<<<< HEAD
                        <span onclick="window.open(window.location.origin+'/zhifou/question/main?questionId='+${data.questionId}+'&&type=default')">${data.answerExtraction}</span>
=======
                        <span onclick="window.location.href='zhifou_question.html?'+${data.answerId}">${data.answerExtraction}</span>
>>>>>>> 275b31322d2e32543fd8ba2c46ab16916f5dfc81
                        <a onclick="cardOperation('displayAnswer',${data.answerId})" class="page-card-text-button">
                        阅读全文 <span class="iconfont icon-xia"></span>
                        </a>
                    </div>
                    <div class="page-card-text-pickUp" style="display: none" id="pageCardTextPickUp${data.answerId}">
                        <span id="pageCardDescription${data.answerId}"></span>
<<<<<<< HEAD
                    </div>
                </div>
                <div class="page-card-bottom" id="page-card-bottom${data.answerId}" style="position: relative;bottom: 0">
=======
                        <div style="padding-top: 10px">
                            <a onclick="cardOperation('pickUpAnswer',${data.answerId})" class="page-card-text-button">
                                收起全文 <span class="iconfont icon-shang"></span>
                            </a>
                        </div>
                    </div>
                </div>
                
                <div class="page-card-bottom">
>>>>>>> 275b31322d2e32543fd8ba2c46ab16916f5dfc81
                    <div class="page-card-bottom-reader" style="display: inline-block" onclick="cardOperation('upQuestionLooking',${data.answerId})" id="upQuestionLooking${data.answerId}">
                        <div class="d-inline-block align-middle">
                            <span class="iconfont icon-reading" style="font-size: 18px;line-height: 22px"></span>
                        </div>
                        <div class="d-inline-block align-middle">
                            <span>在看&nbsp</span><span id="isLooking${data.answerId}">${data.answerStar}</span>
                        </div>
                    </div>
                    <div class="page-card-bottom-reader-already" style="display: none" onclick="cardOperation('downQuestionLooking',${data.answerId})" id="downQuestionLooking${data.answerId}">
                        <div class="d-inline-block align-middle">
                            <span class="iconfont icon-reading" style="font-size: 18px;line-height: 22px"></span>
                        </div>
                        <div class="d-inline-block align-middle">
<<<<<<< HEAD
                            <span>已在看</span><span id="haveLooked${data.answerId}"></span>
=======
                            <span>已在看</span><span id="haveLooked${data.answerId}">${data.answerStar}</span>
>>>>>>> 275b31322d2e32543fd8ba2c46ab16916f5dfc81
                        </div>
                    </div>
                    <div class="page-card-bottom-item" onclick="cardOperation('displayComment',${data.answerId})" data-toggle="modal" data-target="#displayComment">
                        <div class="d-inline-block align-middle">
                            <span class="iconfont icon-pinglun" style="line-height: 22px"></span>
                        </div>
                        <div class="d-inline-block align-middle">
                            <span>${data.commentNumber} 条评论</span>
                        </div>
                    </div>
<<<<<<< HEAD
                    <div class="page-card-bottom-item" style="display: inline-block" onclick="cardOperation('upStoreQuestion',${data.answerId})" id="upStoreQuestion${data.answerId}">
                        <div class="d-inline-block align-middle">
                            <span class="iconfont icon-shoucang" style="font-size: 18px;line-height: 22px"></span>
                        </div>
                        <div class="d-inline-block align-middle">
                            <span>收藏</span>
                        </div>
                    </div>
                    <div class="page-card-bottom-item" style="display: none" onclick="cardOperation('downStoreQuestion',${data.answerId})" id="downStoreQuestion${data.answerId}">
=======
                    <div class="page-card-bottom-item" onclick="cardOperation('shareQuestion',${data.answerId})">
                        <div class="d-inline-block align-middle">
                            <span class="iconfont icon-fenxiang" style="font-size: 18px;line-height: 22px"></span>
                        </div>
                        <div class="d-inline-block align-middle">
                            <span style="display: inline-block" id="shareQuestion${data.answerId}">分享</span>
                            <span style="display: none" id="haveShared${data.answerId}">已分享</span>
                        </div>
                    </div>
                    <div class="page-card-bottom-item" onclick="cardOperation('storeQuestion',${data.answerId})">
>>>>>>> 275b31322d2e32543fd8ba2c46ab16916f5dfc81
                        <div class="d-inline-block align-middle">
                            <span class="iconfont icon-shoucang" style="font-size: 18px;line-height: 22px"></span>
                        </div>
                        <div class="d-inline-block align-middle">
<<<<<<< HEAD
                            <span>已收藏</span>
                        </div>
                    </div>
                    <div class="page-card-bottom-item" id="page-card-bottom-pickup${data.answerId}" style="display:none">
                        <div onclick="cardOperation('pickUpAnswer',${data.answerId})">
                            <a href="#question-top${data.answerId}" class="page-card-text-button">
                                收起全文 <span class="iconfont icon-shang"></span>
                            </a>
                        </div>
                    </div>
                </div>
=======
                            <span style="display: inline-block" id="storeQuestion${data.answerId}">收藏</span>
                            <span style="display: none" id="haveStored${data.answerId}">已收藏</span>
                        </div>
                    </div>
                </div>
                <div class="page-card-comments-content" style="display: none" id="pageCardComments${data.answerId}">
                    <hr>
                    <div class="page-card-comments" id="pageCardComments"></div>
                </div>
>>>>>>> 275b31322d2e32543fd8ba2c46ab16916f5dfc81
            </div>
            `;
    });

    //将cardColumns插入到useToInsert这个div之前
    let insertDiv = document.querySelector(".useToInsert");
    let cardColumns = document.createElement("div");
    cardColumns.className = "page-cards-container";
    cardColumns.innerHTML = htmlQuestionsString;
    insertDiv.parentNode.insertBefore(cardColumns,insertDiv);
}

function displayCommentsToHTML(comments) {
    let htmlCommentsString = '';

    comments.forEach(data =>{
        htmlCommentsString +=`
                <div class="comment-card">
                    <div style="display: table-cell;vertical-align: top">
<<<<<<< HEAD
                        <img src="${data.userImageUrl}" width="24" height="24" class="comment-card-img">
=======
                        <img src="${data.userImageUrl}" width="24" height="24"  class="comment-card-img">
>>>>>>> 275b31322d2e32543fd8ba2c46ab16916f5dfc81
                    </div>
                    <div style="display: table-cell;vertical-align: top;width: 100%">
                        <div class="d-flex justify-content-between">
                            <div>
                                <span>${data.userNickname}</span>
                            </div>
                            <div>
<<<<<<< HEAD
                                <span class="comment-card-time">${transfromTimeTag(data.updateTime)}</span>
=======
                                <span class="comment-card-time">${data.updateTime}</span>
>>>>>>> 275b31322d2e32543fd8ba2c46ab16916f5dfc81
                            </div>
                        </div>
                        <div class="comment-card-description">${data.commentDescription}</div>
                        <div>
                            <div class="comment-bottom-item">
                                <div class="d-inline-block align-middle">
                                    <span class="iconfont icon-dianzan-choose" style="font-size: 14px;line-height: 22px"></span>
                                </div>
                                <div class="d-inline-block align-middle">
                                    <span>赞</span>
                                </div>
                            </div>
                            <div class="comment-bottom-item">
                                <div class="d-inline-block align-middle">
                                    <span class="iconfont icon-dislike-full" style="font-size: 12px;line-height: 22px"></span>
                                </div>
                                <div class="d-inline-block align-middle">
                                    <span>踩</span>
                                </div>
                            </div>
                            <div class="comment-bottom-item">
                                <div class="d-inline-block align-middle">
                                    <span class="iconfont icon-shoucang" style="font-size: 18px;line-height: 22px"></span>
                                </div>
                                <div class="d-inline-block align-middle">
                                    <span style="display: inline-block" id="storeComment">收藏</span>
                                    <span style="display: none" id="commentStored">已收藏</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>  
        `
    });

    //将cardColumns插入到useToInsert这个div之前
    let insertDiv = document.getElementById("insertComments");
    let commentColumns = document.createElement("div");
    commentColumns.className = "comment-card-container";
    commentColumns.innerHTML = htmlCommentsString;
    insertDiv.parentNode.insertBefore(commentColumns,insertDiv);

}

let openAnswerCommentKey;
//将对card-text的操作封装起来
function cardOperation(type,id) {
    if (type === "displayAnswer"){

        function displayAnswerDescription(answerId) {

            fetch(baseURL+"/answer/description",{
                method:'post',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
                },
                body:"answerId="+answerId
            }).then(response=>{
                if (response.ok){
                    return response.json();
                }
            }).then(res=>{
                //后端传来的数据是data后面一个string
                let pageCardDescription = document.getElementById("pageCardDescription"+answerId);
                pageCardDescription.innerHTML = res.data;
<<<<<<< HEAD

            }).then(()=>{

                if(document.getElementById("pageCardTextPickUp"+answerId).clientHeight > 450){
                    document.getElementById("page-card-bottom-pickup"+answerId).style.display = "inline-block";
                    document.getElementById("page-card-bottom"+answerId).style.position = "sticky";
                } else {
                    document.getElementById("page-card-bottom-pickup"+answerId).style.display = "inline-block";
                }

=======
>>>>>>> 275b31322d2e32543fd8ba2c46ab16916f5dfc81
            }).catch(function(e){
                zhiFouAlert("error:" + e);
            });

            //隐藏“摘要部分”
            displayThis("block","pageCardExtraction"+answerId);
            //出现“全文部分”
            displayThis("block","pageCardTextPickUp"+answerId);
<<<<<<< HEAD



=======
>>>>>>> 275b31322d2e32543fd8ba2c46ab16916f5dfc81
        }
        displayAnswerDescription(id);

    } else if(type === "pickUpAnswer"){

        function pickUpAnswerDescription(answerId) {
<<<<<<< HEAD

            document.getElementById("page-card-bottom-pickup"+answerId).style.display = "none";
            document.getElementById("page-card-bottom"+answerId).style.position = "relative";
=======
>>>>>>> 275b31322d2e32543fd8ba2c46ab16916f5dfc81
            //隐藏“全文部分”
            displayThis("block","pageCardTextPickUp"+answerId);
            //出现“摘要部分”
            displayThis("block","pageCardExtraction"+answerId);

        }
        pickUpAnswerDescription(id);

    } else if((type === "upQuestionLooking") || (type ==="downQuestionLooking")){

        if (type.substring(0,2) === "up"){

            function upQuestionLooking(answerId) {

                let upStar = {
<<<<<<< HEAD
                    answerId : answerId,
=======
                    answerId : id,
>>>>>>> 275b31322d2e32543fd8ba2c46ab16916f5dfc81
                    state : "up"
                };

                fetch(baseURL+"/answer/star",{
                    method:'post',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body:JSON.stringify(upStar)
                }).then(response=>{
                    if (response.ok){
                        zhiFouAlert("在看成功！");
                        return response.json();
                    }
                }).then(res=>{
                    let star = document.getElementById("haveLooked"+answerId);
                    star.innerText = res.data;
                    displayThis("i-block","upQuestionLooking"+answerId);
                    displayThis("i-block","downQuestionLooking"+answerId);
                }).catch(function(e){
                    zhiFouAlert("error:" + e);
                });
            }
            upQuestionLooking(id);

        }else {

            function downQuestionLooking(answerId) {

                let downStar = {
<<<<<<< HEAD
                    answerId : answerId,
=======
                    answerId : id,
>>>>>>> 275b31322d2e32543fd8ba2c46ab16916f5dfc81
                    state : "down"
                };

                fetch(baseURL+"/answer/star",{
                    method:'post',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body:JSON.stringify(downStar)
                }).then(response=>{
                    if (response.ok){
                        zhiFouAlert("取消在看成功！");
                        return response.json();
                    }
                }).then(res=>{
                    let star = document.getElementById("isLooking"+answerId);
                    star.innerText = res.data;
                    displayThis("i-block","downQuestionLooking"+answerId);
                    displayThis("i-block","upQuestionLooking"+answerId);
                }).catch(function(e){
                    zhiFouAlert("error:" + e);
                });
            }
            downQuestionLooking(id);
        }

    }else if(type === "displayComment"){

        function displayComments(answerId) {

            function removeComments(){
                let comments = document.querySelectorAll(".comment-card-container");
                if (comments.length !== 0){
                    for (let i =0; i<comments.length ; i++){
                        comments[i].remove();
                    }
                    // displayThis("block","pageCardMore");
                }
            }
            removeComments();

            let commentRequest = {
                answerId : answerId,
                count : 0
            };

            fetch(
<<<<<<< HEAD
                baseURL+"/answer/comment",{
                    method:'post',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body:JSON.stringify(commentRequest)
                }
=======
                "http://localhost:3030/comment"
                // baseURL+"/answer/comment",{
                //     method:'post',
                //     headers: {
                //         'content-type': 'application/json'
                //     },
                //     body:JSON.stringify(commentRequest)
                // }
>>>>>>> 275b31322d2e32543fd8ba2c46ab16916f5dfc81
            ).then(response=>{
                if (response.ok){
                    return response.json();
                }
            }).then(res=>{

                let commentList = res.data.commentInfoList;
                let commentNum = commentList.length;

                if (commentNum !== 0){
                    //插入评论
                    displayCommentsToHTML(commentList);
                }else if(commentNum === 0) {
                    zhiFouAlert("没有更多评论了");
                }

                //显示评论的数量
                document.getElementById("commentNumber").innerText = res.data.commentNumber;

            }).then(()=>{

                openAnswerCommentKey = answerId;
                let modalBody = document.querySelector("#modal-body");

                if (eventList !== 0){
                    modalBody.removeEventListener("scroll", displayMoreComments);
                    addEventList("remove");
                }

                modalBody.addEventListener("scroll",displayMoreComments);
                addEventList("add");

            }).catch(function(e){
                zhiFouAlert("error:" + e);
            });

        }
        displayComments(id);

    }

    else if(type === "shareQuestion"){

        function shareQuestion(answerId) {
            //隐藏分享，显示“已分享"
            displayThis("i-block","shareQuestion"+answerId);
            displayThis("i-block","haveShared"+answerId);
        }
        shareQuestion(id);

<<<<<<< HEAD
    }else if((type === "upStoreQuestion") || (type ==="downStoreQuestion")){

        if (type.substring(0,2) === "up"){

            function upStoreQuestion(answerId) {

                //type 问题回答文章；0，1，2
                let upStore = {
                    state: "up",
                    collectionType: 1,
                    collectionTypeId: answerId,
                };

                fetch(baseURL+"/user/collect",{
                    method:'post',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body:JSON.stringify(upStore)
                }).then(response=>{
                    if (response.ok){
                        zhiFouAlert("收藏成功");
                        return response.json();
                    }
                }).then(()=>{
                    displayThis("i-block","upStoreQuestion"+answerId);
                    displayThis("i-block","downStoreQuestion"+answerId);
                }).catch(function(e){
                    zhiFouAlert("error:" + e);
                });
            }
            upStoreQuestion(id);

        }else {

            function downStoreQuestion(answerId) {

                let downStore = {
                    state: "down",
                    collectionType: 1,
                    collectionTypeId: answerId,
                };

                fetch(baseURL + "/user/collect", {
                    method: 'post',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(downStore)
                }).then(response => {
                    if (response.ok) {
                        zhiFouAlert("取消收藏成功！");
                        return response.json();
                    }
                }).then(() => {
                    displayThis("i-block", "upStoreQuestion" + answerId);
                    displayThis("i-block", "downStoreQuestion" + answerId);
                }).catch(function (e) {
                    zhiFouAlert("error:" + e);
                });
            }

            downStoreQuestion(id);
        }
    }
}

function displaySuggestedReading() {

    fetch(baseURL+"/article/hot").then(response => {
        if (response.ok) {
            return response.json();
        }
    }).then(res => {
        if(res.code === 1){
            let suggestedReadingString = '';
            res.data.forEach(data=>{
                suggestedReadingString += `
                <div class="page-suggested-read-content">
                    <div style="cursor: pointer" onclick="window.open(window.location.origin+'/zhifou/user/articleDetail?articleId='+${data.articleId})">
                        <img class="page-suggested-read-picture" src="${data.firstImage}" width="230">
                    </div>
                    <div class="page-suggested-text-content">
                        <span class="page-suggested-read-text">推荐阅读：</span>
                        <a class="page-suggested-title" onclick="window.open(window.location.origin+'/zhifou/user/articleDetail?articleId='+${data.articleId}">${data.articleTitle}</a>
                    </div>
                </div>
                `;
            });

            let insertDiv = document.getElementById("page-suggested-read-container");
            insertDiv.innerHTML = suggestedReadingString;
        }

    }).catch(function (e) {
        zhiFouAlert("error:" + e);
    });


=======
    }else if(type === "storeQuestion"){

        function storeQuestion(answerId) {
            //隐藏收藏，显示“已收藏”
            displayThis("i-block","storeQuestion"+answerId);
            displayThis("i-block","haveStored"+answerId);
        }
        storeQuestion(id);

    }
>>>>>>> 275b31322d2e32543fd8ba2c46ab16916f5dfc81
}

function displayMoreComments() {

    let modalBody = document.getElementById("modal-body");

    //滚动到底部的判断
    if((modalBody.scrollTop+modalBody.clientHeight)>(modalBody.scrollHeight-300)){

        modalBody.removeEventListener("scroll", displayMoreComments);

        let commentNum = document.querySelectorAll(".comment-card").length;

        let moreRequest = {
            answerId : openAnswerCommentKey,
            count : commentNum
        };

        fetch(
<<<<<<< HEAD
            // "http://localhost:3030/comment"
            baseURL+"/answer/comment",{
                method:'post',
                headers: {
                    'content-type': 'application/json'
                },
                body:JSON.stringify(moreRequest)
            }
=======
            "http://localhost:3030/comment"
            // baseURL+"/answer/comment",{
            //     method:'post',
            //     headers: {
            //         'content-type': 'application/json'
            //     },
            //     body:JSON.stringify(moreRequest)
            // }
>>>>>>> 275b31322d2e32543fd8ba2c46ab16916f5dfc81
        ).then(response=>{
            if (response.ok){
                return response.json();
            }
        }).then(res=>{

            let commentList = res.data.commentInfoList;
            let commentsNum = commentList.length;
            if(commentsNum !== 0){
                displayCommentsToHTML(commentList);
                modalBody.addEventListener("scroll", displayMoreComments);
            }else if(commentsNum === 0){
                zhiFouAlert("没有更多评论了");
            }

        }).catch(function(e){
            zhiFouAlert("error:" + e);
        });

    }
}

function createTheComment() {
    if (document.getElementById("create-comment-input").value === '') {
        zhiFouAlert("评论不能为空！")
    } else {

<<<<<<< HEAD
        let createComment = {
            answerId:openAnswerCommentKey,
            commentDescription : document.getElementById("create-comment-input").value
        };

        fetch(baseURL+'/user/create/comment',{
=======
        fetch(baseURL,{
>>>>>>> 275b31322d2e32543fd8ba2c46ab16916f5dfc81
            method:'post',
            headers: {
                'content-type': 'application/json'
            },
<<<<<<< HEAD
            body:JSON.stringify(createComment)
=======
            body:JSON.stringify(document.getElementById("create-comment-input").value)
>>>>>>> 275b31322d2e32543fd8ba2c46ab16916f5dfc81
        }).then(response=>{
            if (response.ok){
                return response.json();
            }
        }).then(res=>{

<<<<<<< HEAD
            if(res.code ===1 ){
                zhiFouAlert("评论成功！");

                //在comment-card-container上面插入自己的评论
                let myCommentString = `
                <div class="comment-card">
                    <div style="display: table-cell;vertical-align: top">
                        <img src="${getCookie('userImageUrl')}" width="24" height="24"  class="comment-card-img">
                    </div>
                    <div style="display: table-cell;vertical-align: top;width: 100%">
                        <div class="d-flex justify-content-between">
                            <div>
                                <span>${getCookie('userNickname')}</span>
                            </div>
                            <div>
                                <span class="comment-card-time">编辑于刚刚</span>
                            </div>
                        </div>
                        <div class="comment-card-description">${createComment.commentDescription}</div>
                    </div>
                </div>  `;

                let insertDiv = document.getElementsByClassName("comment-card-container")[0];
                let myComment = document.createElement("div");
                myComment.className = "comment-card-container";
                myComment.innerHTML = myCommentString;
                insertDiv.parentNode.insertBefore(myComment,insertDiv);
            }
=======
            //在comment-card-container上面插入自己的评论
            let myCommentString = '';

            let insertDiv = document.querySelector("comment-card-container");
            let myComment = document.createElement("div");
            myComment.className = "comment-card-container";
            myComment.innerHTML = myCommentString;
            insertDiv.parentNode.insertBefore(myComment,insertDiv);

            zhiFouAlert("评论成功！");
>>>>>>> 275b31322d2e32543fd8ba2c46ab16916f5dfc81

        }).catch(function(e){
            zhiFouAlert("error:" + e);
        });

    }
}

function questionCreate() {

    let questiont_title = document.getElementById("create-question-title").value;
    let question_description = document.getElementById("create-question-description").value;

    if(questiont_title === ''){
        zhiFouAlert("问题描述不能为空！");
    } else if(questiont_title.length<7){
<<<<<<< HEAD
        zhiFouAlert("试问题描述太短！")
=======
        zhiFouAlert("试试更长的问题描述！")
>>>>>>> 275b31322d2e32543fd8ba2c46ab16916f5dfc81
    } else {

        let questionInfo = {
            questionTitle:questiont_title,
            questionDescription:question_description
        };

<<<<<<< HEAD
        fetch(baseURL+"/user/create/question",{
=======
        fetch(baseURL+"/create/question",{
>>>>>>> 275b31322d2e32543fd8ba2c46ab16916f5dfc81
            method:'post',
            headers: {
                'content-type': 'application/json'
            },
            body:JSON.stringify(questionInfo)
        }).then(response=>{
            if (response.ok){
                return response.json();
            }
        }).then(res=>{

            if(res.code === 1){
                zhiFouAlert("问题创建成功！");
<<<<<<< HEAD
                setTimeout(function () {
                    $('#questionModal').modal('hide');
                    document.getElementById("create-question-title").value = '';
                    document.getElementById("create-question-description").value = '';
                },1000)
            } else {
                zhiFouAlert("问题创建失败！");
            }
=======
            } else {
                zhiFouAlert("问题创建失败！");
            }

>>>>>>> 275b31322d2e32543fd8ba2c46ab16916f5dfc81
        }).catch(function(e){
            zhiFouAlert("error:" + e);
        });
    }
}

<<<<<<< HEAD
function changePersonalImage() {
    if ((getCookie("userImageUrl")!== '')&&(getCookie("userImageUrl")!== "null")&&(getCookie("userImageUrl")!== null)){
        document.getElementById("yonghu-picture").src = getCookie("userImageUrl");
        document.getElementById("yonghu-picture").style.display = "block";
        document.getElementById("yonghu-icon").style.display = "none";
    }
}

function checkPageCookie() {
    if ((getCookie("userUserName")==='')||(getCookie("userUserName")===null)) {
        zhiFouAlert("请重新登陆！");
        setTimeout(function () {
            window.location.href = window.location.origin+'/zhifou/user/register';
            fetch(baseURL+"/user/logout").catch(function(e){
                zhiFouAlert("error:" + e);
            });
        });
    }
}

=======
>>>>>>> 275b31322d2e32543fd8ba2c46ab16916f5dfc81
function getCookie(cname){
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i=0; i<ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(name)===0) { return c.substring(name.length,c.length); }
    }
    return "";
}

function setCookie(name,value){
    let d = new Date();
    //设置一天的cookies删除时间
    d.setTime(d.getTime()+(24*60*60*1000));
    let expires = "expires="+d.toUTCString();
<<<<<<< HEAD
    document.cookie = name+"="+value+"; "+expires+";path=/zhifou/";
}

function quitWeb() {
    //删除cookies要删除指定位置cookies
    document.cookie = "userUserName=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/zhifou/";
    document.cookie = "userPassword=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/zhifou/";
    document.cookie = "userNickname=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/zhifou/";
    document.cookie = "userDescription=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/zhifou/";
    document.cookie = "userImageUrl=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/zhifou/";
    window.location.href = window.location.origin+'/zhifou/user/register';
=======
    document.cookie = name+"="+value+"; "+expires;
}

//用于注册登陆之后保存用户名密码到cookies
// 改为setUserInfoToCookies()，然后setting_page.js也要修改
function getUserInfo() {

    let userInfo = {
        userUserName:'',
        userPassword:'',
        userNickname:'',
        userDescription:'',
        userImageUrl:''
    };

    fetch(baseURL+"/session/userInfo").then(response =>{
        if(response.ok){
            return response.json();
        }
    }).then(res=>{
        userInfo.userUserName = res.userUserName;
        userInfo.userPassword = res.userPassword;
        userInfo.userNickname = res.userNickname;
        if (!res.userDescription) {
            userInfo.userDescription = res.userDescription;
        }
        if(!res.userImageUrl){
            userInfo.userImageUrl = res.userImageUrl;
        }

    }).catch(function(e){
        zhiFouAlert("error:" + e);
    });

    return userInfo;
>>>>>>> 275b31322d2e32543fd8ba2c46ab16916f5dfc81
}

function displayThis(type,id) {
    let object = document.getElementById(id);

    if (type === "block"){
        if(object.style.display==="none")
        {
            object.style.display="block";
        }
        else
        {
            object.style.display="none";
        }
    } else if (type === "i-block"){
        if(object.style.display==="none")
        {
            object.style.display="inline-block";
        }
        else
        {
            object.style.display="none";
        }
    }

}

function pageSearch() {

    //搜索模块
    let searchWord = document.getElementById("search-input").value;
<<<<<<< HEAD
    if ((searchWord !== "")&&(window.location.href.split('/')[5].split("?")[0] === "searchPage")){
        window.location.href = window.location.origin +"/zhifou/user/searchPage?search_word="+searchWord;
    } else if(searchWord !== ""){
        window.open(window.location.origin +"/zhifou/user/searchPage?search_word="+searchWord);
=======
    if (searchWord !== ""){
        window.open("zhifou_searchInfo.html?search_word="+searchWord);

>>>>>>> 275b31322d2e32543fd8ba2c46ab16916f5dfc81
    } else {
        zhiFouAlert("请输入你想要查找的内容：")
    }

}

let eventList = 0;
function addEventList(type) {
    if (type === "add"){
        eventList+=1;
    } else if(type === "remove"){
        eventList-=1;
    }
}

<<<<<<< HEAD
function transfromTimeTag(time) {
    let timeArray = time.split("-",3);
    let timeMonth = (timeArray[1].split("",2))[1];
    let timeDay = timeArray[2].split("T",1);
    return timeArray[0]+"年"+timeMonth+"月"+timeDay+"日";
}

=======
>>>>>>> 275b31322d2e32543fd8ba2c46ab16916f5dfc81
function zhiFouAlert(text) {
    document.getElementById("content").innerText = text;
    $('#alertModal').toast('show');
    // setTimeout(function () {
    //     $('#alertModal').toast('hide')
    // },3000);
}

function displayWholeSearch(type) {

    let searchInput = document.getElementById("search-input");

    if (type === "click") {
        // searchPart.style.display = "block";
        searchInput.className = "search-input-content-broader";
        document.getElementById("search-bg").className = "page-header-search-bg-hover";

    } else if (type === "close") {
        // searchPart.style.display = "none";
        searchInput.className = "search-input-content-narrower";
        document.getElementById("search-bg").className = "page-header-search-bg";

    }
}

function changeWebState(type,state) {
    if (type === "colorStyle"){

        if(state === "open"){
            if(!document.getElementById("dark-css")){
                let head = document.getElementsByTagName("head")[0];
                let darkCss = document.createElement("link");
                darkCss.rel = "stylesheet";
                darkCss.href = "../static/css/dark_night.css";
                darkCss.id = "dark-css";
                head.appendChild(darkCss);

                document.getElementById("QA-img").src = "../static/img/QAdark.png";
                document.getElementById("open-dark").className = "dark-night-button-press";
                document.getElementById("close-dark").className = "dark-night-button";
                displayHeaderTip('dark-night','pageHeaderDark');
            }
        } else if(state === "close"){
            if(document.getElementById("dark-css")){
                document.getElementById("dark-css").remove();

                document.getElementById("QA-img").src = "../static/img/QA.png";
                document.getElementById("open-dark").className = "dark-night-button";
                document.getElementById("close-dark").className = "dark-night-button-press";
                displayHeaderTip('dark-night','pageHeaderDark');
            }
        }

    } else if(type === "fontStyle"){

        if(state === "songTi"){
            if((!document.getElementById("body").style.fontFamily)
                ||(document.getElementById("body").style.fontFamily === "'pingFang font', serif !important")){
                document.getElementById("body").setAttribute("style","font-family: 'songTi font', serif !important");
                document.querySelectorAll(".page-card-title").forEach(element=>{element.style.fontWeight = "normal"});
                document.getElementById("songTiButton").className = "dark-night-button-press";
                document.getElementById("heiTiButton").className = "dark-night-button";
                displayHeaderTip('dark-night','pageHeaderDark');
            }
        }else if(state === "heiTi"){
            if(document.getElementById("body").style.fontFamily){
                document.getElementById("body").removeAttribute("style");
                document.querySelectorAll(".page-card-title").forEach(element=>{element.style.fontWeight = "bold"});
                document.getElementById("songTiButton").className = "dark-night-button";
                document.getElementById("heiTiButton").className = "dark-night-button-press";
                displayHeaderTip('dark-night','pageHeaderDark')
            }
        }

    }
}

function displayHeaderTip(hidePart,moseoverPart) {
    let hide_part = document.getElementById(hidePart);
    let hoverStyle = document.getElementById(moseoverPart);

    if(hide_part.style.display === "none"){
        hide_part.style.display = "block";

        hoverStyle.style.color = "#1f8dfb";
        hoverStyle.style.borderTop = "4px solid #1f8dfb";
        hoverStyle.style.borderLeft = "1px solid #eeeeee";
        hoverStyle.style.borderRight = "1px solid #eeeeee";
    }else{
        hide_part.style.display = "none";

        hoverStyle.style.color = "#8590a6";
        hoverStyle.style.borderTop = "4px solid transparent";
        hoverStyle.style.borderLeft = "1px solid transparent";
        hoverStyle.style.borderRight = "1px solid transparent";
    }
}