let articleId;

function getArticleInformation() {
    //将页面URL转化为articleId
    function getArticleID(){
        let thisURL = window.location.href;
        articleId = (thisURL.split("?")[1]).split("=")[1];
    }
    getArticleID();

    function displayArticleBottom(data) {

        let articleBottomHtml = `
            <div class="articleDetail-reader" style="display: inline-block" onclick="articleOpeartion('upArticleLooking',articleId)" id="upArticleLooking${articleId}">
                <div class="d-inline-block align-middle">
                    <span class="iconfont icon-reading" style="font-size: 18px;line-height: 22px"></span>
                </div>
                <div class="d-inline-block align-middle">
                    <span>在看&nbsp</span><span id="isLooking${articleId}">${data.articleStar}</span>
                </div>
            </div>
            <div class="articleDetail-reader-already" style="display: none" onclick="articleOpeartion('downArticleLooking',articleId)" id="downArticleLooking${articleId}">
                <div class="d-inline-block align-middle">
                    <span class="iconfont icon-reading" style="font-size: 18px;line-height: 22px"></span>
                </div>
                <div class="d-inline-block align-middle">
                    <span>已在看</span><span id="haveLooked${articleId}">${data.answerStar}</span>
                </div>
            </div>
            <div class="articleDetail-bottom-item" style="cursor: default">
                <div class="d-inline-block align-middle">
                    <span class="iconfont icon-pinglun" style="line-height: 22px"></span>
                </div>
                <div class="d-inline-block align-middle">
                    <span>${data.commentNumber} 条评论</span>
                </div>
            </div>
            <div class="articleDetail-bottom-item" style="display: inline-block" onclick="articleOpeartion('upStoreArticle',articleId)" id="upStoreArticle${articleId}">
                <div class="d-inline-block align-middle">
                    <span class="iconfont icon-shoucang" style="font-size: 18px;line-height: 22px"></span>
                </div>
                <div class="d-inline-block align-middle">
                    <span>收藏</span>
                </div>
            </div>
            <div class="articleDetail-bottom-item" style="display: none" onclick="articleOpeartion('downStoreArticle',articleId)" id="downStoreArticle${articleId}">
                <div class="d-inline-block align-middle">
                    <span class="iconfont icon-shoucang" style="font-size: 18px;line-height: 22px"></span>
                </div>
                <div class="d-inline-block align-middle">
                    <span>已收藏</span>
                </div>
            </div>
            <div class="articleDetail-bottom-item">
                <div>
                    <a href="#articleDetail-top" class="articleDetail-text-button">
                        返回标题 <span class="iconfont icon-shang"></span>
                    </a>
                </div>
            </div>
        `;

        let insertDiv = document.getElementById("articleDetail-time");
        let articleDetailBottom = document.createElement("div");
        articleDetailBottom.className = "articleDetail-bottom";
        articleDetailBottom.innerHTML = articleBottomHtml;
        insertDiv.parentNode.insertBefore(articleDetailBottom,insertDiv.nextSibling);

    }

    let articleIdInfo = {
        articleId: articleId,
        offset:0
    };

    fetch(baseURL + "/article/full", {
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(articleIdInfo)
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
    }).then(res => {

        document.getElementById("articleDetail-title").innerText = res.data.articleInfo.articleTitle;
        document.getElementById("articleAuthor-name").innerText = res.data.articleInfo.userNickname;
        document.getElementById("articleAuthor-description").innerText = res.data.articleInfo.userDescription;
        document.getElementById("articleDetail-description").innerHTML = res.data.articleInfo.articleDescription;
        document.getElementById("article-edit-time").innerText = transfromTimeTag(res.data.articleInfo.updateTime);
        document.getElementById("articleDetail-comment-number").innerText = res.data.articleInfo.commentNumber;

        displayArticleBottom(res.data.articleInfo);
        displayArticleComments(res.data.commentInfoArticleList.content);

        document.getElementById("comment-box").style.display = "block";

        //显示分页页数
        displayCommentPages(res.data.commentInfoArticleList);

    }).catch(function (e) {
        zhiFouAlert("error:" + e);
    });
}

function displayCommentPages(pages){
    // language=JQuery-CSS
    $("#page-container-static-normal").page({
        count:pages.totalElements,
        maxPage:9,
        pageSize:pages.pageable.pageSize,
        theme:"normal"
    });
    $("#page-container-static-normal").on("pageChanged",function (event,params) {
        console.log(params);
        commentsChangePages(params.pageNum);
        $(this).data("page").refresh(params);
    });
}

function commentsChangePages(num) {

    let articleIdInfo = {
        articleId: articleId,
        offset:parseInt(num)-1
    };

    fetch(baseURL+ "/article/full", {
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(articleIdInfo)
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
    }).then(res => {
        //滚动到上面的位置
        // 设置滚动行为改为平滑的滚动
        window.scrollTo({
            top: document.getElementById("comment-box").offsetTop-82,
            behavior: "smooth"
        });
        // animateScroll(document.getElementById("comment-box"),100);
        //再次请求 移除之前的评论
        let comments = document.querySelectorAll(".articleComment-card");
        if(comments.length !== 0){
            for (let i =0; i<comments.length; i++){
                comments[i].remove();
            }
        }

        displayArticleComments(res.data.commentInfoArticleList.content);

    }).catch(function (e) {
        zhiFouAlert("error:" + e);
    });
}

function displayArticleComments(comments) {

    let articleCommentsHtml = '';

    comments.forEach(data =>{
        articleCommentsHtml+= `
                <div class="articleComment-card">
                    <div style="display: table-cell;vertical-align: top">
                        <img src="${data.userImageUrl}" width="24" height="24"  class="articleComment-card-img">
                    </div>
                    <div style="display: table-cell;vertical-align: top;width: 100%">
                        <div class="d-flex justify-content-between">
                            <div>
                                <span>${data.userNickname}</span>
                            </div>
                            <div>
                                <span class="articleComment-card-time">${transfromTimeTag(data.updateTime)}</span>
                            </div>
                        </div>
                        <div class="articleComment-card-description">${data.commentDescription}</div>
                        <div>
                            <div class="articleComment-bottom-item">
                                <div class="d-inline-block align-middle">
                                    <span class="iconfont icon-dianzan-choose" style="font-size: 14px;line-height: 22px"></span>
                                </div>
                                <div class="d-inline-block align-middle">
                                    <span>赞</span>
                                </div>
                            </div>
                            <div class="articleComment-bottom-item">
                                <div class="d-inline-block align-middle">
                                    <span class="iconfont icon-dislike-full" style="font-size: 12px;line-height: 22px"></span>
                                </div>
                                <div class="d-inline-block align-middle">
                                    <span>踩</span>
                                </div>
                            </div>
                            <div class="articleComment-bottom-item">
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
        `;

        let insertDiv = document.getElementById("articleDetail-comment-content");
        insertDiv.innerHTML = articleCommentsHtml;
    });
}

function createArticleComments() {

    if (document.getElementById("create-comment-input").value === '') {
        zhiFouAlert("评论不能为空！")
    } else {

        if(typeof (articleId) === "string"){
            articleId = parseInt(articleId);
        }

        let createComment = {
            articleId:articleId,
            commentDescription : document.getElementById("create-comment-input").value
        };

        fetch(baseURL+'/user/create/comment/article',{
            method:'post',
            headers: {
                'content-type': 'application/json'
            },
            body:JSON.stringify(createComment)
        }).then(response=>{
            if (response.ok){
                return response.json();
            }
        }).then(res=>{

            if(res.code ===1 ){
                zhiFouAlert("评论成功！");

                //在comment-card-container上面插入自己的评论
                let myCommentString = `
                    <div style="display: table-cell;vertical-align: top">
                        <img src="${getCookie('userImageUrl')}" width="24" height="24"  class="articleComment-card-img">
                    </div>
                    <div style="display: table-cell;vertical-align: top;width: 100%">
                        <div class="d-flex justify-content-between">
                            <div>
                                <span>${getCookie('userNickname')}</span>
                            </div>
                            <div>
                                <span class="articleComment-card-time">编辑于刚刚</span>
                            </div>
                        </div>
                        <div class="articleComment-card-description">${createComment.commentDescription}</div>
                    </div>
                 `;

                let insertDiv = document.getElementsByClassName("articleComment-card")[0];
                let myComment = document.createElement("div");
                myComment.className = "articleComment-card";
                myComment.innerHTML = myCommentString;
                insertDiv.parentNode.insertBefore(myComment,insertDiv);
            }

        }).catch(function(e){
            zhiFouAlert("error:" + e);
        });

    }
}

//回滚函数
// function animateScroll(element,speed) {
//     let rect=element.getBoundingClientRect();
//     //获取元素相对窗口的top值，此处应加上窗口本身的偏移
//     let top=window.pageYOffset+rect.top;
//     let currentTop= 3780;
//     let requestId;
//     //采用requestAnimationFrame，平滑动画
//     function step(timestamp) {
//         currentTop+=speed;
//         if(currentTop<=top){
//             window.scrollTo(0,currentTop);
//             requestId=window.requestAnimationFrame(step);
//         }else{
//             window.cancelAnimationFrame(requestId);
//         }
//     }
//     window.requestAnimationFrame(step);
// }