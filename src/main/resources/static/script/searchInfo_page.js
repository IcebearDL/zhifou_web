let searchKeyword;
//将页面URL转化为SearchKeyword
function getSearchKeyword(){
    let thisURL = window.location.href;
    let searchCode = (thisURL.split("?")[1]).split("=")[1];
    searchKeyword =  decodeURI(searchCode, "utf-8");
    document.getElementById("search-input").value = searchKeyword;
}


function searchInfoOperation(type) {
    if(type === "questions"){
        getSearchKeyword();
        changeSearchButton("nav_questions");
        // 问题0，文章是1，回答是2
        let searchInfo = {
            type:0,
            searchKeyword:searchKeyword
        };

        fetch(baseURL + "/user/search", {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(searchInfo)
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
        }).then(res=> {

            //将其他移除
            function removeCards(){
                let cards = document.querySelectorAll(".page-cards-container");
                if (cards.length !== 0){
                    for (let i =0; i<cards.length ; i++){
                        cards[i].remove();
                    }
                    // displayThis("block","pageCardMore");
                }
                let tipCard = document.querySelector(".insert-container");
                if(tipCard!==null){
                    tipCard.remove();
                }
            }
            removeCards();

            if((res.data!=='')&&(res.data!==null)){
                displayNewQuestionsToHTML(res.data);
                insertSearchInfoTip(res.data.length);
            } else {
                insertNoSearchInfoTip();
            }
            document.getElementById("pageRightPart").style.display = "block";

        }).catch(function (e) {
            zhiFouAlert("error:" + e);
        });

    }else if(type === "articles"){

        changeSearchButton("nav_articles");
        // 问题0，文章是2，回答是1
        let searchInfo = {
            type:2,
            searchKeyword:searchKeyword
        };

        fetch(baseURL + "/user/search", {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(searchInfo)
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
        }).then(res=> {

            //将其他移除
            function removeCards(){
                let cards = document.querySelectorAll(".page-cards-container");
                if (cards.length !== 0){
                    for (let i =0; i<cards.length ; i++){
                        cards[i].remove();
                    }
                    // displayThis("block","pageCardMore");
                }
                let tipCard = document.querySelector(".insert-container");
                if(tipCard!==null){
                    tipCard.remove();
                }
            }
            removeCards();

            if((res.data!=='')&&(res.data!==null)){
                displayArticlesToHTML(res.data);
                judgeSearchInfoArticleHeight();
                insertSearchInfoTip(res.data.length);
            } else {
                insertNoSearchInfoTip();
            }

        }).catch(function (e) {
            zhiFouAlert("error:" + e);
        });

    }else if(type === "answers"){

        changeSearchButton("nav_answers");
        // 问题0，文章是2，回答是1
        let searchInfo = {
            type:1,
            searchKeyword:searchKeyword
        };

        fetch(baseURL + "/user/search", {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(searchInfo)
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
        }).then(res=> {

            //将其他移除
            function removeCards(){
                let cards = document.querySelectorAll(".page-cards-container");
                if (cards.length !== 0){
                    for (let i =0; i<cards.length ; i++){
                        cards[i].remove();
                    }
                    // displayThis("block","pageCardMore");
                }
                let tipCard = document.querySelector(".insert-container");
                if(tipCard!==null){
                    tipCard.remove();
                }
            }
            removeCards();

            if((res.data!=='')&&(res.data!==null)){
                displaySearchAnswers(res.data);
                judgeSearchInfoAnswerHeight();
                insertSearchInfoTip(res.data.length);
            } else {
                insertNoSearchInfoTip();
            }

        }).catch(function (e) {
            zhiFouAlert("error:" + e);
        });

    }else if(type === "newQuestions"){

        zhiFouAlert("功能待完善");
        // 问题0，文章是1，回答是2
        let searchInfo = {
            type:3,
            searchKeyword:searchKeyword
        }

    }
}

function displaySearchAnswers(list) {

    let htmlAnswersString = '';
    list.forEach(data =>{
        htmlAnswersString += `
                <div class="answer-card">
                    <a class="answer-top" id="answer-top${data.answerId}"></a>
                    <div class="answer-card-author">
                        <div style="display: inline-block;vertical-align: middle">
                                <img src="${data.userImageUrl}" width="48" height="48" class="answer-card-author-img">
                        </div>
                        <div class="author-info">
                            <div class="author-name">
                                <span>${data.userNickname}</span>
                            </div>
                            <div class="author-description">
                                <span>${data.userDescription}</span>
                            </div>
                        </div>
                    </div>
                    <div style="display: flex;justify-content: space-between;align-items: flex-end">
                        <div>
                            <a onclick="window.open(window.location.origin+'/zhifou/question/main?questionId='+${data.questionId}+'&&type=default')" class="looking-answer-title">
                                ${data.questionTitle}
                            </a>
                        </div>
                        <div class="answer-star">
                            ${data.answerStar} 人在看
                        </div>
                    </div>
                    <hr>
                    <div class="answer-description" id="answer-description${data.answerId}" style="height: auto">
                        <div class="description-content" id="content${data.answerId}">${data.answerDescription}</div>
                        <div class="answer-shadow" style="display: none" id="answer-shadow${data.answerId}">
                            <div class="answer-shadow-text" onclick="answerOpeartion('displayFullAnswer',${data.answerId})">
                                <span>点击展开全文</span><span class="iconfont icon-xia"></span>
                            </div>
                        </div>
                    </div>
                    <div class="answer-time">${transfromTimeTag(data.updateTime)}</div>
                    <div class="question-card-bottom" style="position: relative;bottom: 0" id="question-card-bottom${data.answerId}">
                        <div class="answer-card-bottom-reader" style="display: inline-block" onclick="cardOperation('upQuestionLooking',${data.answerId})" id="upQuestionLooking${data.answerId}">
                            <div class="d-inline-block align-middle">
                                <span class="iconfont icon-reading" style="font-size: 18px;line-height: 22px"></span>
                            </div>
                            <div class="d-inline-block align-middle">
                                <span>在看&nbsp</span><span id="isLooking${data.answerId}">${data.answerStar}</span>
                            </div>
                        </div>
                        <div class="answer-card-bottom-reader-already" style="display: none" onclick="cardOperation('downQuestionLooking',${data.answerId})" id="downQuestionLooking${data.answerId}">
                            <div class="d-inline-block align-middle">
                                <span class="iconfont icon-reading" style="font-size: 18px;line-height: 22px"></span>
                            </div>
                            <div class="d-inline-block align-middle">
                                <span>已在看</span><span id="haveLooked${data.answerId}">${data.answerStar}</span>
                            </div>
                        </div>
                        <div class="answer-card-bottom-item" onclick="cardOperation('displayComment',${data.answerId})" data-toggle="modal" data-target="#displayComment">
                            <div class="d-inline-block align-middle">
                                <span class="iconfont icon-pinglun" style="line-height: 22px"></span>
                            </div>
                            <div class="d-inline-block align-middle">
                                <span>${data.commentNumber} 条评论</span>
                            </div>
                        </div>
                        <div class="answer-card-bottom-item" style="display: inline-block" onclick="answerCardOperation('upStoreAnswer',${data.answerId})" id="upStoreAnswer${data.answerId}">
                            <div class="d-inline-block align-middle">
                                <span class="iconfont icon-shoucang" style="font-size: 18px;line-height: 22px"></span>
                            </div>
                            <div class="d-inline-block align-middle">
                                <span>收藏</span>
                            </div>
                        </div>
                        <div class="answer-card-bottom-item" style="display: none" onclick="answerCardOperation('downStoreAnswer',${data.answerId})" id="downStoreAnswer${data.answerId}">
                            <div class="d-inline-block align-middle">
                                <span class="iconfont icon-shoucang" style="font-size: 18px;line-height: 22px"></span>
                            </div>
                            <div class="d-inline-block align-middle">
                                <span>已收藏</span>
                            </div>
                        </div>
                        <div class="page-card-bottom-pickup-answer" style="display: none" onclick="answerOpeartion('pickUpAnswer',${data.answerId})" id="pickUp-answer${data.answerId}">
                            <div>
                                <a href="#answer-top${data.answerId}"><span>收起全文 </span><span class="iconfont icon-shang"></span></a>
                            </div>
                        </div>
                    </div>
                </div>
                `;
    });

    let insertDiv = document.querySelector(".useToInsert");
    let answerCards = document.createElement("div");
    answerCards.className = "page-cards-container";
    answerCards.innerHTML = htmlAnswersString;
    insertDiv.parentNode.insertBefore(answerCards,insertDiv);

}

function changeSearchButton(id) {
    if (id === "nav_questions") {
        document.getElementById(id).className = "searchInfo-header-active";
        document.getElementById("nav_articles").className = "searchInfo-header-default";
        document.getElementById("nav_answers").className = "searchInfo-header-default";
        document.getElementById("nav_newQuestions").className = "searchInfo-header-default";
    } else if (id === "nav_articles") {
        document.getElementById(id).className = "searchInfo-header-active";
        document.getElementById("nav_questions").className = "searchInfo-header-default";
        document.getElementById("nav_answers").className = "searchInfo-header-default";
        document.getElementById("nav_newQuestions").className = "searchInfo-header-default";
    } else if (id === "nav_answers") {
        document.getElementById(id).className = "searchInfo-header-active";
        document.getElementById("nav_articles").className = "searchInfo-header-default";
        document.getElementById("nav_questions").className = "searchInfo-header-default";
        document.getElementById("nav_newQuestions").className = "searchInfo-header-default";
    } else if (id === "nav_newQuestions") {
        document.getElementById(id).className = "searchInfo-header-active";
        document.getElementById("nav_articles").className = "searchInfo-header-default";
        document.getElementById("nav_answers").className = "searchInfo-header-default";
        document.getElementById("nav_questions").className = "searchInfo-header-default";
    }
}

function insertSearchInfoTip(num) {
    //将查看更多推荐插入最后一个card前面
    let insertDiv = document.querySelector(".useToInsert");
    let noMoreSearchInfo = document.createElement("div");
    noMoreSearchInfo.className = "insert-container";
    let htmlNoMoreSearchInfoHTML;
    htmlNoMoreSearchInfoHTML = `
                <div class="search-card-tips">
                        <div class="search-card-noMore">
                            <span>共${num}条搜索结果显示完毕</span>
                            <i class="fa fa-angle-down" aria-hidden="true"></i>
                        </div>
                </div>
            `;
    noMoreSearchInfo.innerHTML = htmlNoMoreSearchInfoHTML;
    insertDiv.parentNode.insertBefore(noMoreSearchInfo,insertDiv.nextSibling);
}

function insertNoSearchInfoTip() {
    //将查看更多推荐插入最后一个card前面
    let insertDiv = document.getElementById("useToInsert");
    let noMoreSearchInfo = document.createElement("div");
    noMoreSearchInfo.className = "insert-container";
    let htmlNoMoreSearchInfoHTML;
    htmlNoMoreSearchInfoHTML = `
                <div class="search-card-tips">
                        <div class="search-card-noMore">
                            <span>暂无搜索结果，试试其他关键词</span>
                            <i class="fa fa-angle-down" aria-hidden="true"></i>
                        </div>
                </div>
            `;
    noMoreSearchInfo.innerHTML = htmlNoMoreSearchInfoHTML;
    insertDiv.parentNode.insertBefore(noMoreSearchInfo,insertDiv.nextSibling);
}

function judgeSearchInfoAnswerHeight(){
    let contents = Array.prototype.slice.call(document.querySelectorAll(".description-content"));
    //插入之后对question_description长度进行判断
    contents.forEach(des=>{
        if (des.clientHeight > 450){
            //大于450的内容将div设置为450px高
            let answerId = des.id.substring(7);
            document.getElementById("answer-description"+answerId).style.height = "450px";
            document.getElementById("answer-shadow"+answerId).style.display = "block";
        }
    });
}

function judgeSearchInfoArticleHeight(){
    let contents = Array.prototype.slice.call(document.querySelectorAll(".article-content"));
    //插入之后对question_description长度进行判断
    contents.forEach(des=>{
        if (des.clientHeight > 450){
            //大于450的内容将div设置为450px高
            let articleId = des.id.substring(7);
            document.getElementById("article-description"+articleId).style.height = "450px";
            document.getElementById("article-shadow"+articleId).style.display = "block";
        }
    });
}