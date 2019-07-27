function displayArticlesToHTML(articles) {
    let htmlArticlesString = '';

    // 数据结构：标题title，用于首页显示的摘要partText,和在看questionStar
    //完整的text，需要在点击阅读全文之后取得。
    articles.forEach(data =>{
        htmlArticlesString += `
            <div class="article-card">
                <a class="article-top" id="article-top${data.articleId}"></a>
                <div class="page-card-title" onclick="window.open(window.location.origin+'/zhifou/user/articleDetail?articleId='+${data.articleId})">
                    <span>${data.articleTitle}</span>
                </div>
                <div class="article-card-user-content">
                    <div class="d-inline-block align-middle">
                        <img src="${data.userImageUrl}" height="32" width="32" class="article-user-picture">
                    </div>
                    <div class="d-inline-block align-middle" style="padding-left: 5px">
                        <span>${data.userNickname},&nbsp</span><span class="article-user-description">${data.userDescription}</span>
                    </div>
                </div>
                <div class="article-star">${data.articleStar} 人在看</div>
                <hr style="margin: 0">
                <div class="article-description" id="article-description${data.articleId}" style="height: auto">
                    <div class="article-content" id="content${data.articleId}">${data.articleDescription}</div>
                    <div class="article-shadow" style="display: none" id="article-shadow${data.articleId}">
                        <div class="article-shadow-text" onclick="articleOpeartion('displayFullArticle',${data.articleId})">
                            <span>点击展开全文</span><span class="iconfont icon-xia"></span>
                        </div>
                    </div>
                </div>
                <div class="article-time">编辑于${transfromTimeTag(data.updateTime)}</div>
                <div class="article-card-bottom" id="article-card-bottom${data.articleId}" style="position: relative;bottom: 0">
                    <div class="page-card-bottom-reader" style="display: inline-block" onclick="articleOpeartion('upArticleLooking',${data.articleId})" id="upArticleLooking${data.articleId}">
                        <div class="d-inline-block align-middle">
                            <span class="iconfont icon-reading" style="font-size: 18px;line-height: 22px"></span>
                        </div>
                        <div class="d-inline-block align-middle">
                            <span>在看&nbsp</span><span id="isLooking${data.articleId}">${data.articleStar}</span>
                        </div>
                    </div>
                    <div class="page-card-bottom-reader-already" style="display: none" onclick="articleOpeartion('downArticleLooking',${data.articleId})" id="downArticleLooking${data.articleId}">
                        <div class="d-inline-block align-middle">
                            <span class="iconfont icon-reading" style="font-size: 18px;line-height: 22px"></span>
                        </div>
                        <div class="d-inline-block align-middle">
                            <span>已在看</span><span id="haveLooked${data.articleId}"></span>
                        </div>
                    </div>
                    <div class="page-card-bottom-item" onclick="window.open(window.location.origin+'/zhifou/user/articleDetail?articleId='+${data.articleId})">
                        <div class="d-inline-block align-middle">
                            <span class="iconfont icon-pinglun" style="line-height: 22px"></span>
                        </div>
                        <div class="d-inline-block align-middle">
                            <span>${data.commentNumber} 条评论</span>
                        </div>
                    </div>
                    <div class="page-card-bottom-item" style="display: inline-block" onclick="articleOpeartion('upStoreArticle',${data.articleId})" id="upStoreArticle${data.articleId}">
                        <div class="d-inline-block align-middle">
                            <span class="iconfont icon-shoucang" style="font-size: 18px;line-height: 22px"></span>
                        </div>
                        <div class="d-inline-block align-middle">
                            <span>收藏</span>
                        </div>
                    </div>
                    <div class="page-card-bottom-item" style="display: none" onclick="articleOpeartion('downStoreArticle',${data.articleId})" id="downStoreArticle${data.articleId}">
                        <div class="d-inline-block align-middle">
                            <span class="iconfont icon-shoucang" style="font-size: 18px;line-height: 22px"></span>
                        </div>
                        <div class="d-inline-block align-middle">
                            <span>已收藏</span>
                        </div>
                    </div>
                    <div class="page-card-bottom-item" id="article-card-bottom-pickup${data.articleId}" style="display:none" onclick="articleOpeartion('pickUpArticle',${data.articleId})">
                        <div>
                            <a href="#article-top${data.articleId}" class="page-card-text-button">
                                收起全文 <span class="iconfont icon-shang"></span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            `;
    });

    //将cardColumns插入到useToInsert这个div之前
    let insertDiv = document.querySelector(".useToInsert");
    let articleColumns = document.createElement("div");
    articleColumns.className = "page-cards-container";
    articleColumns.innerHTML = htmlArticlesString;
    insertDiv.parentNode.insertBefore(articleColumns,insertDiv);
}

function getArticleExtraction(type) {

    function judgeArticleHeight(articleList){

        //插入之后对question_description长度进行判断
        articleList.forEach(des=>{
            if (des.clientHeight > 450){
                //大于450的内容将div设置为450px高
                let articleId = des.id.substring(7);
                document.getElementById("article-description"+articleId).style.height = "450px";
                document.getElementById("article-shadow"+articleId).style.display = "block";
            }
        });
    }

    if (type === "firstLoad"){

        // notifyOperation("navBarChange","nav_recommend");

        fetch(
            baseURL+'/article/extraction'
        ).then(response =>{
            if(response.ok){
                return response.json();
            }
        }).then( res=>{

            //将左侧移除
            function removeArticleCards(){
                let cards = document.querySelectorAll(".page-cards-container");
                if (cards.length !== 0){
                    for (let i =0; i<cards.length ; i++){
                        cards[i].remove();
                    }
                    // displayThis("block","pageCardMore");
                }
            }
            removeArticleCards();

            let articleList;
            articleList = res.data;
            //对显示数量及数据是否为空进行判断限制
            displayArticlesToHTML(articleList);
            displaySuggestedReading();
            insertReadMore();
            //cards插入完成后，显示右侧栏
            document.getElementById("pageRightPart").style.display = "block";

            let contents = Array.prototype.slice.call(document.querySelectorAll(".article-content"));
            judgeArticleHeight(contents);

        }).catch(function(e){
            zhiFouAlert("error:" + e);
        });

    } else if (type === "moreLoad"){
        //点击阅读更多之后
        fetch(baseURL+'/article/extraction').then(response =>{
            if(response.ok){
                return response.json();
            }
        }).then(res =>{
            let articleList;
            articleList = res.data;

            //对显示数量及数据是否为空进行判断限制
            if (articleList.length !== 0){
                //对显示数量及数据是否为空进行判断限制
                displayArticlesToHTML(articleList);

            } else if( articleList.length === 0){

                document.getElementById("pageCardMore").innerText = "我已经到底了噢";
                zhiFouAlert("没有更多文章了");
            }
            return articleList.length;

        }).then(num=>{

            //将querySelectorAll选择出的nodelist转化为数组; 在刷出来之后判断；
            let moreContents = Array.prototype.slice.call(document.querySelectorAll(".article-content"),-num);
            judgeArticleHeight(moreContents);

        }).catch(function(e){
            zhiFouAlert("error:" + e);
        });
    }
}

function articleOpeartion(type,id) {

    if(type === "displayFullArticle"){

        document.getElementById("article-shadow"+id).style.display = "none";
        document.getElementById("article-description"+id).style.height = "auto";
        document.getElementById("article-card-bottom-pickup"+id).style.display = "inline-block";

        document.getElementById("article-card-bottom"+id).style.position = "sticky";

    } else if(type === "pickUpArticle"){

        document.getElementById("article-card-bottom-pickup"+id).style.display = "none";
        document.getElementById("article-description"+id).style.height = "450px";
        document.getElementById("article-shadow"+id).style.display = "block";

        document.getElementById("article-card-bottom"+id).style.position = "relative";

    }else if((type === "upArticleLooking") || (type ==="downArticleLooking")){

        if (type.substring(0,2) === "up"){

            function upArticleLooking(articleId) {

                if(typeof (articleId) === "string"){
                    articleId = parseInt(articleId);
                }

                let upStar = {
                    articleId : articleId,
                    state : "up"
                };

                fetch(baseURL+"/article/star",{
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
                    let star = document.getElementById("haveLooked"+articleId);
                    star.innerText = res.data;
                    displayThis("i-block","upArticleLooking"+articleId);
                    displayThis("i-block","downArticleLooking"+articleId);
                }).catch(function(e){
                    zhiFouAlert("error:" + e);
                });
            }
            upArticleLooking(id);

        }else {

            function downArticleLooking(articleId) {

                if(typeof (articleId) === "string"){
                    articleId = parseInt(articleId);
                }

                let downStar = {
                    articleId : articleId,
                    state : "down"
                };

                fetch(baseURL+"/article/star",{
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
                    let star = document.getElementById("isLooking"+articleId);
                    star.innerText = res.data;
                    displayThis("i-block","downArticleLooking"+articleId);
                    displayThis("i-block","upArticleLooking"+articleId);
                }).catch(function(e){
                    zhiFouAlert("error:" + e);
                });
            }
            downArticleLooking(id);
        }

    } else if((type === "upStoreArticle") || (type ==="downStoreArticle")){

        if (type.substring(0,2) === "up"){

            function upStoreArticle(articleId) {

                if(typeof (articleId) === "string"){
                    articleId = parseInt(articleId);
                }

                //type 问题是0，答案是1，文章是2
                let upStore = {
                    state: "up",
                    collectionType: 2,
                    collectionTypeId: articleId,
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
                    displayThis("i-block","upStoreArticle"+articleId);
                    displayThis("i-block","downStoreArticle"+articleId);
                }).catch(function(e){
                    zhiFouAlert("error:" + e);
                });
            }
            upStoreArticle(id);

        }else {

            function downStoreArticle(articleId) {

                if(typeof (articleId) === "string"){
                    articleId = parseInt(articleId);
                }

                let downStore = {
                    state: "down",
                    collectionType: 2,
                    collectionTypeId: articleId,
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
                    displayThis("i-block", "upStoreArticle" + articleId);
                    displayThis("i-block", "downStoreArticle" + articleId);
                }).catch(function (e) {
                    zhiFouAlert("error:" + e);
                });
            }

            downStoreArticle(id);
        }
    }

}

function insertReadMore() {
    //将查看更多推荐插入最后一个card前面
    let insertDiv = document.querySelector(".useToInsert");
    let readMore = document.createElement("div");
    readMore.className = "page-cards-container";
    let htmlReadMoreHTML;
    htmlReadMoreHTML = `
                <div class="page-card-tips" onclick="getArticleExtraction('moreLoad')" style="text-align: center;color: #8590a6;cursor: pointer" id="pageCardMore">
                        <div class="page-card-more">
                            <span>点击查看更多</span>
                            <i class="fa fa-angle-down" aria-hidden="true"></i>
                     </div>
            </div>
            `;
    readMore.innerHTML = htmlReadMoreHTML;
    insertDiv.parentNode.insertBefore(readMore,insertDiv.nextSibling);
}

//将导航栏的操作封装起来
function navOperation(type,id) {
    if(type === "displayMyFocus"){

        notifyOperation("navBarChange","nav_focus");

        //点击“我的关注” 移除所有推荐问题
        let cards = document.querySelectorAll(".page-cards-container");
        if(cards.length !== 0){
            for (let i =0; i<cards.length; i++){
                cards[i].remove();
            }
        }

        //判断如果没有关注则插入
        if(true){
            let insertDiv = document.querySelector(".useToInsert");
            let noFocusTip = document.createElement("div");
            noFocusTip.className = "page-cards-container";
            let htmlnoFocusTipHTML;
            htmlnoFocusTipHTML = `
                <div class="page-card-tips" style="text-align: center;color: #8590a6" id="noFocusTip">
                    <div class="page-card-more">
                        <span>您暂时还没有关注，快关注以下推荐内容吧！</span>
                    </div>
                </div>
            `;
            noFocusTip.innerHTML = htmlnoFocusTipHTML;
            insertDiv.parentNode.insertBefore(noFocusTip,insertDiv.nextSibling);
            console.log("插入成功");
        }

    } else if(type === "displayNewQuestions"){

        notifyOperation("navBarChange","nav_questions");

        //点击“最新提问” 移除所有其他
        let cards = document.querySelectorAll(".page-cards-container");
        if(cards.length !== 0){
            for (let i =0; i<cards.length; i++){
                cards[i].remove();
            }
        }
    }
}

//右侧通知栏下方的操作封装起来
function notifyOperation(type,id) {
    if (type === "navBarChange"){
        if (id === "nav_recommend"){
            document.getElementById(id).className = "page-header-nav-press";
            document.getElementById("nav_focus").className = "page-header-nav-under";
            document.getElementById("nav_questions").className = "page-header-nav-under";
        } else if (id === "nav_focus"){
            document.getElementById(id).className = "page-header-nav-press";
            document.getElementById("nav_recommend").className = "page-header-nav-under";
            document.getElementById("nav_questions").className = "page-header-nav-under";
        } else if (id === "nav_questions"){
            document.getElementById(id).className = "page-header-nav-press";
            document.getElementById("nav_recommend").className = "page-header-nav-under";
            document.getElementById("nav_focus").className = "page-header-nav-under";
        }
    }
}

