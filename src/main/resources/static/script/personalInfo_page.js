function getPersonalInfo() {
<<<<<<< HEAD
    changePersonalImage();
    if((getCookie("userImageUrl")!==null)&&(getCookie("userImageUrl")!=='')){
        document.getElementById("personalInfo-picture").src = getCookie("userImageUrl");
    }
    document.getElementById("personalInfo-name").innerText = getCookie("userNickname");
    if((getCookie("userDescription")!==null)&&(getCookie("userDescription")!=='')){
        document.getElementById("personalInfo-description").innerText = getCookie("userDescription");
    }
}

function judgeWebType() {
    let thisURL = window.location.href;
    let webType = (thisURL.split("?")[1]).split("=")[1];
    if(webType === "dynamic"){
        changeButtonStyle('dynamic');
        displayPersonalInfo("dynamic");
    } else if(webType === "questions"){
        changeButtonStyle('questions');
        displayPersonalInfo("questions");
    } else if(webType === "answers"){
        changeButtonStyle('answers');
        displayPersonalInfo("answers");
    } else if(webType === "articles"){
        changeButtonStyle('articles');
        displayPersonalInfo("articles");
    } else if(webType === "looking"){
        changeButtonStyle('looking');
        displayPersonalInfo("looking-answers");
    } else if(webType === "collection"){
        changeButtonStyle('collect');
        displayPersonalInfo("collect-questions");
    }
}

function displayPersonalInfo(type) {

    if(type === "dynamic"){

        fetch(baseURL+"/user/dynamics").then(response=>{
            if (response.ok){
                return response.json();
            }
        }).then(res=>{
            if(res.code === 1){
                removePersonalCards();
                if (res.data.length === 0) {
                    insertTips("dynamic");
                } else {
                    displayDynamicToHtml(res.data);
                    judgeLookingCollectAnswerHeight();
                    judgeLookingCollectArticleHeight();
                }
            }
        }).catch(function(e){
            zhiFouAlert("error:" + e);
        });

    } else if(type === "questions"){

        fetch(baseURL+"/user/questions").then(response=>{
            if (response.ok){
                return response.json();
            }
        }).then(res=>{
            if(res.code === 1){
                console.log(res.data);
                removePersonalCards();
                if (res.data.length === 0) {
                    insertTips("myQuestions");
                } else {
                    displayToHtml("myQuestions",res.data);
                }
            }
        }).catch(function(e){
            zhiFouAlert("error:" + e);
        });

    } else if(type === "answers"){

        fetch(baseURL+"/user/answers").then(response=>{
            if (response.ok){
                return response.json();
            }
        }).then(res=>{
            if(res.code === 1){
                removePersonalCards();
                if (res.data.length === 0) {
                    insertTips("myAnswers");
                } else {
                    displayToHtml("myAnswers",res.data);
                    judgeLookingCollectAnswerHeight();
                }
            }
        }).catch(function(e){
            zhiFouAlert("error:" + e);
        });

    } else if(type === "articles"){

        fetch(baseURL+"/user/articles").then(response=>{
            if (response.ok){
                return response.json();
            }
        }).then(res=>{
            if(res.code === 1){
                removePersonalCards();
                if (res.data.length === 0) {
                    insertTips("myArticles");
                } else {
                    displayToHtml("myArticles",res.data);
                    judgeLookingCollectArticleHeight();
                }
            }
        }).catch(function(e){
            zhiFouAlert("error:" + e);
        });

    } else if(type === "looking-answers"){

        changeButtonStyle("looking-answers");
        fetch(baseURL+"/user/stars/answer").then(response=>{
            if (response.ok){
                return response.json();
            }
        }).then(res=>{
            if(res.code === 1){
                removePersonalCards();
                if (res.data.length === 0) {
                    insertTips("myLooking");
                } else {
                    displayToHtml("looking-answers",res.data);
                    judgeLookingCollectAnswerHeight();
                }
            }
        }).catch(function(e){
            zhiFouAlert("error:" + e);
        });

    } else if(type === "looking-articles"){

        changeButtonStyle("looking-articles");
        fetch(baseURL+"/user/stars/article").then(response=>{
            if (response.ok){
                return response.json();
            }
        }).then(res=>{
            if(res.code === 1){
                removePersonalCards();
                if (res.data.length === 0) {
                    insertTips("myLooking");
                } else {
                    displayToHtml("looking-articles",res.data);
                    judgeLookingCollectArticleHeight();
                }
            }
        }).catch(function(e){
            zhiFouAlert("error:" + e);
        });

    } else if(type === "collect-questions"){

        changeButtonStyle("collect-questions");
        fetch(baseURL+"/user/collections/question").then(response=>{
            if (response.ok){
                return response.json();
            }
        }).then(res=>{
            if(res.code === 1){
                removePersonalCards();
                if (res.data.length === 0) {
                    insertTips("myCollection");
                } else {
                    displayToHtml("collect-questions",res.data);
                }
            }
        }).catch(function(e){
            zhiFouAlert("error:" + e);
        });

    } else if(type === "collect-answers"){

        changeButtonStyle("collect-answers");
        fetch(baseURL+"/user/collections/answer").then(response=>{
            if (response.ok){
                return response.json();
            }
        }).then(res=>{
            if(res.code === 1){
                removePersonalCards();
                if (res.data.length === 0) {
                    insertTips("myCollection");
                } else {
                    displayToHtml("collect-answers",res.data);
                    judgeLookingCollectAnswerHeight();
                }
            }
        }).catch(function(e){
            zhiFouAlert("error:" + e);
        });

    } else if(type === "collect-articles"){

        changeButtonStyle("collect-articles");
        fetch(baseURL+"/user/collections/article").then(response=>{
            if (response.ok){
                return response.json();
            }
        }).then(res=>{
            if(res.code === 1){
                removePersonalCards();
                if (res.data.length === 0) {
                    insertTips("myCollection");
                } else {
                    displayToHtml("collect-articles",res.data);
                    judgeLookingCollectArticleHeight();
                }
            }
        }).catch(function(e){
            zhiFouAlert("error:" + e);
        });

    }
}

function displayToHtml(type,list){

    function insert(htmlString) {
        let insertDiv = document.querySelector(".useToInsert");
        let newDiv = document.createElement("div");
        newDiv.className = "page-cards-container";
        newDiv.innerHTML = htmlString;
        insertDiv.parentNode.insertBefore(newDiv,insertDiv);
    }

    if(type === "myQuestions"){

        let htmlMyQuestionsString = '';
        list.forEach(data =>{
            htmlMyQuestionsString += `
                <div class="page-card">
                    <div class="page-card-title" id="insert-myQuestions${data.questionTitle}" onclick="window.open(window.location.origin+'/zhifou/question/main?questionId='+${data.questionId}+'&&type=default')">
                        <span>${data.questionTitle}</span>
                    </div>
                    <div class="page-card-text">
                        <div style="display: block">
                            <span onclick="window.open(window.location.origin+'/zhifou/question/main?questionId='+${data.questionId}+'&&type=default')">${data.questionDescription}</span>
                        </div>
                    </div>
                    <div class="new-question-card-bottom">
                        <div>
                            <div class="page-card-bottom-item">
                                <div class="d-inline-block align-middle">
                                    <span class="myQuestion-bottom-text">${data.questionFollowers}人关注</span>
                                </div>
                            </div>
                            <div class="page-card-bottom-item">
                                <div class="d-inline-block align-middle">
                                    <span class="myQuestion-bottom-text">${data.questionBrowsers}个浏览</span>
                                </div>
                            </div>
                            <div class="page-card-bottom-item">
                                <div class="d-inline-block align-middle">
                                    <span style="cursor: default">创建于${transfromTimeTag(data.updateTime)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
        insert(htmlMyQuestionsString);

    } else if(type === "myAnswers"){

        let htmlMyAnswersString = '';
        list.forEach(data =>{
            htmlMyAnswersString += `
                <div class="answer-card">
                    <a class="answer-top" id="answer-top${data.answerId}"></a>
                    <div class="answer-card-author" id="insert-myAnswers${data.answerId}">
                        <div style="display: inline-block;vertical-align: middle">
                                <img src="${getCookie('userImageUrl')}" width="48" height="48" class="answer-card-author-img">
                        </div>
                        <div class="author-info">
                            <div class="author-name">
                                <span>${getCookie("userNickname")}</span>
                            </div>
                            <div class="author-description">
                                <span>${getCookie("userDescription")}</span>
                            </div>
                        </div>
                    </div>
                    <div style="display: flex;justify-content: space-between;align-items: flex-end">
                        <div>
                            <a onclick="window.open(window.location.origin+'/zhifou/question/main?questionId='+${data.questionId}+'&&type=default')" class="looking-answer-title">
                                ${data.questionTitle}
                            </a>
                        </div>
                        <div class="answer-star" style="margin-right: 10px">
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
                        <div style="display: flex;justify-content: space-between">
                            <div>
                                <div class="answer-card-bottom-reader-already" style="display: inline-block">
                                    <div class="d-inline-block align-middle">
                                        <span class="iconfont icon-reading" style="font-size: 18px;line-height: 22px"></span>
                                    </div>
                                    <div class="d-inline-block align-middle">
                                        <span>在看&nbsp</span><span>${data.answerStar}</span>
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
                                <div class="page-card-bottom-pickup-answer" style="display: none" onclick="answerOpeartion('pickUpAnswer',${data.answerId})" id="pickUp-answer${data.answerId}">
                                    <div>
                                        <a href="#answer-top${data.answerId}"><span>收起全文 </span><span class="iconfont icon-shang"></span></a>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div class="myQuestion-delete" onclick="zhiFouAlert('功能待完善！')">
                                    <div class="d-inline-block align-middle">
                                        <span>删除回答</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `;
        });
        insert(htmlMyAnswersString);

    } else if(type === "myArticles"){

        let htmlArticlesString = '';
        list.forEach(data =>{
            htmlArticlesString += `
            <div class="article-card">
                <a class="article-top" id="article-top${data.articleId}"></a>
                <div class="page-card-title" id="insert-myArticles${data.articleId}" onclick="window.open(window.location.origin+'/zhifou/user/articleDetail?articleId='+${data.articleId})">
                    <span>${data.articleTitle}</span>
                </div>
                <div class="article-card-user-content">
                    <div class="d-inline-block align-middle">
                        <img src="${getCookie('userImageUrl')}" height="32" width="32" class="article-user-picture">
                    </div>
                    <div class="d-inline-block align-middle" style="padding-left: 5px">
                        <span>${getCookie('userNickname')},&nbsp</span><span class="article-user-description">${getCookie('userDescription')}</span>
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
                    <div style="display: flex;justify-content: space-between">
                        <div>
                            <div class="page-card-bottom-reader-already" style="display: inline-block">
                                <div class="d-inline-block align-middle">
                                    <span class="iconfont icon-reading" style="font-size: 18px;line-height: 22px"></span>
                                </div>
                                <div class="d-inline-block align-middle">
                                    <span>在看&nbsp</span><span id="isLooking${data.articleId}">${data.articleStar}</span>
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
                            <div class="page-card-bottom-item" id="article-card-bottom-pickup${data.articleId}" style="display:none" onclick="articleOpeartion('pickUpArticle',${data.articleId})">
                                <div>
                                    <a href="#article-top${data.articleId}" class="page-card-text-button">
                                        收起全文 <span class="iconfont icon-shang"></span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="myQuestion-delete" onclick="zhiFouAlert('功能待完善！')">
                                <div class="d-inline-block align-middle">
                                    <span>删除文章</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
            `;
        });
        insert(htmlArticlesString);

    } else if(type === "looking-answers"){

        let htmlAnswersString = '';
        list.forEach(data =>{
            htmlAnswersString += `
                <div class="answer-card">
                    <a class="answer-top" id="answer-top${data.answerId}"></a>
                    <div class="answer-card-author" id="insert-looking-answers${data.answerId}">
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
                        <div class="answer-card-bottom-reader" style="display: none" onclick="cardOperation('upQuestionLooking',${data.answerId})" id="upQuestionLooking${data.answerId}">
                            <div class="d-inline-block align-middle">
                                <span class="iconfont icon-reading" style="font-size: 18px;line-height: 22px"></span>
                            </div>
                            <div class="d-inline-block align-middle">
                                <span>在看&nbsp</span><span id="isLooking${data.answerId}">${data.answerStar}</span>
                            </div>
                        </div>
                        <div class="answer-card-bottom-reader-already" style="display: inline-block" onclick="cardOperation('downQuestionLooking',${data.answerId})" id="downQuestionLooking${data.answerId}">
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
        insert(htmlAnswersString);

    } else if(type === "looking-articles"){

        let htmlArticlesString = '';
        list.forEach(data =>{
            htmlArticlesString += `
            <div class="article-card">
                <a class="article-top" id="article-top${data.articleId}"></a>
                <div class="page-card-title" id="insert-looking-articles${data.articleId}" onclick="window.open(window.location.origin+'/zhifou/user/articleDetail?articleId='+${data.articleId})">
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
                    <div class="page-card-bottom-reader" style="display: none" onclick="articleOpeartion('upArticleLooking',${data.articleId})" id="upArticleLooking${data.articleId}">
                        <div class="d-inline-block align-middle">
                            <span class="iconfont icon-reading" style="font-size: 18px;line-height: 22px"></span>
                        </div>
                        <div class="d-inline-block align-middle">
                            <span>在看&nbsp</span><span id="isLooking${data.articleId}">${data.articleStar}</span>
                        </div>
                    </div>
                    <div class="page-card-bottom-reader-already" style="display: inline-block" onclick="articleOpeartion('downArticleLooking',${data.articleId})" id="downArticleLooking${data.articleId}">
                        <div class="d-inline-block align-middle">
                            <span class="iconfont icon-reading" style="font-size: 18px;line-height: 22px"></span>
                        </div>
                        <div class="d-inline-block align-middle">
                            <span>已在看</span><span id="haveLooked${data.articleId}">${data.articleStar}</span>
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
        insert(htmlArticlesString);

    } else if(type === "collect-questions"){

        let htmlNewQuestionsString = '';
        list.forEach(data =>{
            htmlNewQuestionsString += `
                <div class="page-card">
                    <div class="page-card-title" id="insert-collect-questions${data.questionId}" onclick="window.open(window.location.origin+'/zhifou/question/main?questionId='+${data.questionId}+'&&type=edit')">
                        <span>${data.questionTitle}</span>
                    </div>
                    <div class="page-card-text">
                        <div style="display: block">
                            <span onclick="window.open(window.location.origin+'/zhifou/question/main?questionId='+${data.questionId}+'&&type=edit')">${data.questionDescription}</span>
                        </div>
                    </div>
                    <div class="new-question-card-bottom">
                        <div>
                            <div class="page-card-bottom-edit" style="display: inline-block" onclick="newQuestionOperation('answerQuestion',${data.questionId})">
                                <div class="d-inline-block align-middle">
                                    <span class="iconfont icon-qinziAPPtubiao-" style="font-size: 16px;line-height: 22px"></span>
                                </div>
                                <div class="d-inline-block align-middle">
                                    <span>回答问题</span>
                                </div>
                            </div>
                            <div class="page-card-bottom-item" style="display: none" onclick="newQuestionOperation('upStoreQuestion',${data.questionId})" id="upStoreQuestion${data.questionId}">
                                <div class="d-inline-block align-middle">
                                    <span class="iconfont icon-shoucang" style="font-size: 18px;line-height: 22px"></span>
                                </div>
                                <div class="d-inline-block align-middle">
                                    <span>收藏问题</span>
                                </div>
                            </div>
                            <div class="page-card-bottom-item" style="display: inline-block" onclick="newQuestionOperation('downStoreQuestion',${data.questionId})" id="downStoreQuestion${data.questionId}">
                                <div class="d-inline-block align-middle">
                                    <span class="iconfont icon-shoucang" style="font-size: 18px;line-height: 22px"></span>
                                </div>
                                <div class="d-inline-block align-middle">
                                    <span>问题已收藏</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="page-card-bottom-item">
                                <div class="d-inline-block align-middle">
                                    <span>${data.questionFollowers}人关注</span>
                                </div>
                            </div>
                            <div class="page-card-bottom-item">
                                <div class="d-inline-block align-middle">
                                    <span>${data.questionBrowsers}个浏览</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
        insert(htmlNewQuestionsString);

    } else if(type === "collect-answers"){

        let htmlAnswersString = '';
        list.forEach(data =>{
            htmlAnswersString += `
                <div class="answer-card">
                    <a class="answer-top" id="answer-top${data.answerId}"></a>
                    <div class="answer-card-author" id="insert-collect-answers${data.answerId}">
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
                                <span>已在看</span><span id="haveLooked${data.answerId}"></span>
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
                        <div class="answer-card-bottom-item" style="display: none" onclick="answerCardOperation('upStoreAnswer',${data.answerId})" id="upStoreAnswer${data.answerId}">
                            <div class="d-inline-block align-middle">
                                <span class="iconfont icon-shoucang" style="font-size: 18px;line-height: 22px"></span>
                            </div>
                            <div class="d-inline-block align-middle">
                                <span>收藏</span>
                            </div>
                        </div>
                        <div class="answer-card-bottom-item" style="display: inline-block" onclick="answerCardOperation('downStoreAnswer',${data.answerId})" id="downStoreAnswer${data.answerId}">
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
        insert(htmlAnswersString);

    } else if(type === "collect-articles"){

        let htmlArticlesString = '';
        list.forEach(data =>{
            htmlArticlesString += `
            <div class="article-card">
                <a class="article-top" id="article-top${data.articleId}"></a>
                <div class="page-card-title" id="insert-collect-articles${data.articleId}" onclick="window.open(window.location.origin+'/zhifou/user/articleDetail?articleId='+${data.articleId})">
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
                    <div class="page-card-bottom-item" style="display: none" onclick="articleOpeartion('upStoreArticle',${data.articleId})" id="upStoreArticle${data.articleId}">
                        <div class="d-inline-block align-middle">
                            <span class="iconfont icon-shoucang" style="font-size: 18px;line-height: 22px"></span>
                        </div>
                        <div class="d-inline-block align-middle">
                            <span>收藏</span>
                        </div>
                    </div>
                    <div class="page-card-bottom-item" style="display: inline-block" onclick="articleOpeartion('downStoreArticle',${data.articleId})" id="downStoreArticle${data.articleId}">
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
        insert(htmlArticlesString);

    }
}

function displayDynamicToHtml(list) {

    let userNickname = getCookie("userNickname");

    //list按时间排序，时间最近的在最前面
    list.forEach(data=>{
        if(data.type === 3){

            displayToHtml("myQuestions",[data]);
            let insertDiv = document.getElementById("insert-myQuestions"+data.questionTitle);
            let insertTimeString = `
                <span>${userNickname}&nbsp;创建了问题</span>
            `;
            let newDiv = document.createElement("div");
            newDiv.innerHTML = insertTimeString;
            newDiv.className = "insertTime";
            insertDiv.parentNode.insertBefore(newDiv,insertDiv);

        } else if(data.type === 4){

            displayToHtml("myAnswers",[data]);
            let insertDiv = document.getElementById("insert-myAnswers"+data.answerId);
            let insertTimeString = `
                <span>${userNickname}&nbsp;创建了回答</span>
            `;
            let newDiv = document.createElement("div");
            newDiv.innerHTML = insertTimeString;
            newDiv.className = "insertTime";
            insertDiv.parentNode.insertBefore(newDiv,insertDiv);

        } else if(data.type === 5){

            displayToHtml("myArticles",[data]);
            let insertDiv = document.getElementById("insert-myArticles"+data.articleId);
            let insertTimeString = `
                <span>${userNickname}&nbsp;发布了文章</span>
            `;
            let newDiv = document.createElement("div");
            newDiv.innerHTML = insertTimeString;
            newDiv.className = "insertTime";
            insertDiv.parentNode.insertBefore(newDiv,insertDiv);

        } else if(data.type === 1){

            displayToHtml("looking-answers",[data]);
            let insertDiv = document.getElementById("insert-looking-answers"+data.answerId);
            let insertTimeString = `
                <span>${userNickname}&nbsp;在看了回答</span>
            `;
            let newDiv = document.createElement("div");
            newDiv.innerHTML = insertTimeString;
            newDiv.className = "insertTime";
            insertDiv.parentNode.insertBefore(newDiv,insertDiv);

        } else if(data.type === 2){

            displayToHtml("looking-articles",[data]);
            let insertDiv = document.getElementById("insert-looking-articles"+data.articleId);
            let insertTimeString = `
                <span>${userNickname}&nbsp;在看了文章</span>
            `;
            let newDiv = document.createElement("div");
            newDiv.innerHTML = insertTimeString;
            newDiv.className = "insertTime";
            insertDiv.parentNode.insertBefore(newDiv,insertDiv);

        } else if((data.type === 6)&&(data.collectionType === 0)){

            displayToHtml("collect-questions",[data]);
            let insertDiv = document.getElementById("insert-collect-questions"+data.questionId);
            let insertTimeString = `
                <span>${userNickname}&nbsp;收藏了问题</span>
            `;
            let newDiv = document.createElement("div");
            newDiv.innerHTML = insertTimeString;
            newDiv.className = "insertTime";
            insertDiv.parentNode.insertBefore(newDiv,insertDiv);

        } else if((data.type === 6)&&(data.collectionType === 1)){

            displayToHtml("collect-answers",[data]);
            let insertDiv = document.getElementById("insert-collect-answers"+data.answerId);
            let insertTimeString = `
                <span>${userNickname}&nbsp;收藏了回答</span>
            `;
            let newDiv = document.createElement("div");
            newDiv.innerHTML = insertTimeString;
            newDiv.className = "insertTime";
            insertDiv.parentNode.insertBefore(newDiv,insertDiv);

        } else if((data.type === 6)&&(data.collectionType === 2)){

            displayToHtml("collect-articles",[data]);
            let insertDiv = document.getElementById("insert-collect-articles"+data.articleId);
            let insertTimeString = `
                <span>${userNickname}&nbsp;收藏了文章</span>
            `;
            let newDiv = document.createElement("div");
            newDiv.innerHTML = insertTimeString;
            newDiv.className = "insertTime";
            insertDiv.parentNode.insertBefore(newDiv,insertDiv);

        }
    })
}

function changeButtonStyle(type) {

    if(type === 'dynamic'){
        document.getElementById("looking-divide").style.display = "none";
        document.getElementById("collect-divide").style.display = "none";
        document.getElementById("dynamic").className = "personalInfo-button-active";
        document.getElementById("questions").className = "personalInfo-button";
        document.getElementById("answers").className = "personalInfo-button";
        document.getElementById("articles").className = "personalInfo-button";
        document.getElementById("looking").className = "personalInfo-button";
        document.getElementById("collect").className = "personalInfo-button";
    } else if(type === 'questions'){
        document.getElementById("looking-divide").style.display = "none";
        document.getElementById("collect-divide").style.display = "none";
        document.getElementById("dynamic").className = "personalInfo-button";
        document.getElementById("questions").className = "personalInfo-button-active";
        document.getElementById("answers").className = "personalInfo-button";
        document.getElementById("articles").className = "personalInfo-button";
        document.getElementById("looking").className = "personalInfo-button";
        document.getElementById("collect").className = "personalInfo-button";
    } else if(type === 'answers'){
        document.getElementById("looking-divide").style.display = "none";
        document.getElementById("collect-divide").style.display = "none";
        document.getElementById("dynamic").className = "personalInfo-button";
        document.getElementById("questions").className = "personalInfo-button";
        document.getElementById("answers").className = "personalInfo-button-active";
        document.getElementById("articles").className = "personalInfo-button";
        document.getElementById("looking").className = "personalInfo-button";
        document.getElementById("collect").className = "personalInfo-button";
    } else if(type === 'articles'){
        document.getElementById("looking-divide").style.display = "none";
        document.getElementById("collect-divide").style.display = "none";
        document.getElementById("dynamic").className = "personalInfo-button";
        document.getElementById("questions").className = "personalInfo-button";
        document.getElementById("answers").className = "personalInfo-button";
        document.getElementById("articles").className = "personalInfo-button-active";
        document.getElementById("looking").className = "personalInfo-button";
        document.getElementById("collect").className = "personalInfo-button";
    } else if(type === 'looking'){
        document.getElementById("dynamic").className = "personalInfo-button";
        document.getElementById("questions").className = "personalInfo-button";
        document.getElementById("answers").className = "personalInfo-button";
        document.getElementById("articles").className = "personalInfo-button";
        document.getElementById("looking").className = "personalInfo-button-active";
        document.getElementById("collect").className = "personalInfo-button";
    } else if(type === 'collect'){
        document.getElementById("dynamic").className = "personalInfo-button";
        document.getElementById("questions").className = "personalInfo-button";
        document.getElementById("answers").className = "personalInfo-button";
        document.getElementById("articles").className = "personalInfo-button";
        document.getElementById("looking").className = "personalInfo-button";
        document.getElementById("collect").className = "personalInfo-button-active";
    } else if (type === "looking-answers"){
        document.getElementById("looking-divide").style.display = "flex";
        document.getElementById("collect-divide").style.display = "none";
        document.getElementById("looking-answers").className = "divide-button-active";
        document.getElementById("looking-articles").className = "divide-button";
    } else if (type === "looking-articles"){
        document.getElementById("looking-answers").className = "divide-button";
        document.getElementById("looking-articles").className = "divide-button-active";
    } else if (type === 'collect-questions'){
        document.getElementById("looking-divide").style.display = "none";
        document.getElementById("collect-divide").style.display = "flex";
        document.getElementById("collect-questions").className = "divide-button-active";
        document.getElementById("collect-answers").className = "divide-button";
        document.getElementById("collect-articles").className = "divide-button";
    } else if (type === 'collect-answers'){
        document.getElementById("collect-questions").className = "divide-button";
        document.getElementById("collect-answers").className = "divide-button-active";
        document.getElementById("collect-articles").className = "divide-button";
    } else if (type === 'collect-articles'){
        document.getElementById("collect-questions").className = "divide-button";
        document.getElementById("collect-answers").className = "divide-button";
        document.getElementById("collect-articles").className = "divide-button-active";
    }
}

function judgeLookingCollectAnswerHeight(){
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

function judgeLookingCollectArticleHeight(){
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

function removePersonalCards() {
    let personalCards = document.querySelectorAll(".page-cards-container");
    if (personalCards.length !== 0){
        for (let i =0; i<personalCards.length ; i++){
            personalCards[i].remove();
        }
        // displayThis("block","pageCardMore");
    }
}

function insertTips(info) {
    //将查看更多推荐插入最后一个card前面
    let insertDiv = document.querySelector(".useToInsert");
    let tips = document.createElement("div");
    tips.className = "page-cards-container";
    let htmlTipsHTML;
    if(info === "dynamic"){

        htmlTipsHTML = `
                <div class="personalInfo-card-tips">
                        <div class="personalInfo-tips">
                            <span>于2019年7月6日加入知否</span>
                        </div>
                </div>
            `;

    } else if(info === "myQuestions"){

        htmlTipsHTML = `
                <div class="personalInfo-card-tips">
                        <div class="personalInfo-tips">
                            <span>暂无提问，快点击右上角提问吧！</span>
                        </div>
                </div>
            `;

    } else if(info === "myAnswers"){

        htmlTipsHTML = `
                <div class="personalInfo-card-tips">
                        <div class="personalInfo-tips">
                            <span>暂无回答</span>
                        </div>
                </div>
            `;

    } else if(info === "myArticles"){

        htmlTipsHTML = `
                <div class="personalInfo-card-tips" onclick="getArticleExtraction('moreLoad')">
                        <div class="personalInfo-tips">
                            <span>暂无文章</span>
                            <a class="looking-answer-title" style="font-size: 15px"
                            onclick="window.open(window.location.origin +'/zhifou/user/writeArticle')">
                                点击创作文章
                            </a>
                        </div>
                </div>
            `;

    } else if(info === "myLooking"){

        htmlTipsHTML = `
                <div class="personalInfo-card-tips" onclick="getArticleExtraction('moreLoad')">
                        <div class="personalInfo-tips">
                            <span>暂无在看</span>
                        </div>
                </div>
            `;

    } else if(info === "myCollection"){

        htmlTipsHTML = `
                <div class="personalInfo-card-tips" onclick="getArticleExtraction('moreLoad')">
                        <div class="personalInfo-tips">
                            <span>暂无收藏</span>
                        </div>
                </div>
            `;

    }
    tips.innerHTML = htmlTipsHTML;
    insertDiv.parentNode.insertBefore(tips,insertDiv.nextSibling);
=======
    
}

function displayInfo(type) {

    if(type === "dynamic"){

    }

>>>>>>> 275b31322d2e32543fd8ba2c46ab16916f5dfc81
}