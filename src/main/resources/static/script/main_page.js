<<<<<<< HEAD
=======

function insertReadMore() {
    //将查看更多推荐插入最后一个card前面
    let insertDiv = document.querySelector(".useToInsert");
    let readMore = document.createElement("div");
    readMore.className = "page-cards-container";
    let htmlReadMoreHTML;
    htmlReadMoreHTML = `
                <div class="page-card-tips" onclick="getInformation('moreLoad')" style="text-align: center;color: #8590a6;cursor: pointer" id="pageCardMore">
                        <div class="page-card-more">
                            <span>点击查看更多</span>
                            <i class="fa fa-angle-down" aria-hidden="true"></i>
                     </div>
            </div>
            `;
    readMore.innerHTML = htmlReadMoreHTML;
    insertDiv.parentNode.insertBefore(readMore,insertDiv.nextSibling);
    console.log("插入更多推荐成功");
}

>>>>>>> 275b31322d2e32543fd8ba2c46ab16916f5dfc81
function getInformation(type) {

    if (type === "firstLoad"){

<<<<<<< HEAD
        notifyOperation("navBarChange","nav_recommend");

        fetch(
            baseURL+'/answer/extraction'
=======
        //换头像

        notifyOperation("navBarChange","nav_recommend");

        fetch(
            " http://localhost:5050/answer"
            // baseURL+'/answer/extraction'
>>>>>>> 275b31322d2e32543fd8ba2c46ab16916f5dfc81
        ).then(response =>{
            if(response.ok){
                return response.json();
            }
        }).then( res=>{

            //将左侧移除
            function removeCards(){
                let cards = document.querySelectorAll(".page-cards-container");
                if (cards.length !== 0){
                    for (let i =0; i<cards.length ; i++){
                        cards[i].remove();
                    }
                    // displayThis("block","pageCardMore");
                }
            }
            removeCards();

            let questionList;
            questionList = res.data;
            //对显示数量及数据是否为空进行判断限制
            displayQuestionsToHTML(questionList);
<<<<<<< HEAD
            displaySuggestedReading();
=======
>>>>>>> 275b31322d2e32543fd8ba2c46ab16916f5dfc81
            insertReadMore();
            //cards插入完成后，显示右侧栏
            document.getElementById("pageRightPart").style.display = "block";

        }).catch(function(e){
            zhiFouAlert("error:" + e);
        });

    } else if (type === "moreLoad"){
        //点击阅读更多之后
        fetch(baseURL+'/answer/extraction').then(response =>{
            if(response.ok){
                return response.json();
            }
        }).then(res =>{
            let questionList;
            questionList = res.data;
            //对显示数量及数据是否为空进行判断限制
<<<<<<< HEAD

            if (questionList.length !== 0){
                //对显示数量及数据是否为空进行判断限制
                displayQuestionsToHTML(questionList);

            } else if( questionList.length === 0){

                document.getElementById("pageCardMore").innerText = "我已经到底了噢";
                zhiFouAlert("没有更多问题了");

            }

=======
            displayQuestionsToHTML(questionList);
>>>>>>> 275b31322d2e32543fd8ba2c46ab16916f5dfc81
        }).catch(function(e){
            zhiFouAlert("error:" + e);
        });
    }
}

<<<<<<< HEAD
function displayNewQuestionsToHTML(new_questions) {
    let htmlNewQuestionsString = '';

    // 数据结构：标题title，用于首页显示的摘要partText,和在看questionStar
    //完整的text，需要在点击阅读全文之后取得。
    new_questions.forEach(data =>{
        htmlNewQuestionsString += `
                <div class="page-card">
                    <div class="page-card-title" onclick="window.open(window.location.origin+'/zhifou/question/main?questionId='+${data.questionId}+'&&type=default')">
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
                            <div class="page-card-bottom-item" style="display: inline-block" onclick="newQuestionOperation('upStoreQuestion',${data.questionId})" id="upStoreQuestion${data.questionId}">
                                <div class="d-inline-block align-middle">
                                    <span class="iconfont icon-shoucang" style="font-size: 18px;line-height: 22px"></span>
                                </div>
                                <div class="d-inline-block align-middle">
                                    <span>收藏问题</span>
                                </div>
                            </div>
                            <div class="page-card-bottom-item" style="display: none" onclick="newQuestionOperation('downStoreQuestion',${data.questionId})" id="downStoreQuestion${data.questionId}">
                                <div class="d-inline-block align-middle">
                                    <span class="iconfont icon-shoucang" style="font-size: 18px;line-height: 22px"></span>
                                </div>
                                <div class="d-inline-block align-middle">
                                    <span>问题已收藏</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="page-card-bottom-item" style="cursor: default">
                                <div class="d-inline-block align-middle">
                                    <span>${data.questionFollowers}人关注</span>
                                </div>
                            </div>
                            <div class="page-card-bottom-item" style="cursor: default">
                                <div class="d-inline-block align-middle">
                                    <span>${data.questionBrowsers}个浏览</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
    });

    //将cardColumns插入到useToInsert这个div之前
    let insertDiv = document.querySelector(".useToInsert");
    let newQuestionColumns = document.createElement("div");
    newQuestionColumns.className = "page-cards-container";
    newQuestionColumns.innerHTML = htmlNewQuestionsString;
    insertDiv.parentNode.insertBefore(newQuestionColumns,insertDiv);
}

function newQuestionOperation(type,id) {

    if(type === "answerQuestion"){

        window.open(window.location.origin+'/zhifou/question/main?questionId='+id+'&&type=edit');

    }else if(type === "upStoreQuestion"){

            function upStoreQuestion(answerId) {

                //type 问题回答文章；0，1，2
                let upStore = {
                    state: "up",
                    collectionType: 0,
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

    } else if(type === "downStoreQuestion"){

        function downStoreQuestion(answerId) {

            let downStore = {
                state: "down",
                collectionType: 0,
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

=======
>>>>>>> 275b31322d2e32543fd8ba2c46ab16916f5dfc81
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
        }

    } else if(type === "displayNewQuestions"){

        notifyOperation("navBarChange","nav_questions");

<<<<<<< HEAD
        fetch(
            baseURL+"/question/new"
        ).then(response =>{
            if(response.ok){
                return response.json();
=======
        //点击“最新提问” 移除所有其他
        let cards = document.querySelectorAll(".page-cards-container");
        if(cards.length !== 0){
            for (let i =0; i<cards.length; i++){
                cards[i].remove();
>>>>>>> 275b31322d2e32543fd8ba2c46ab16916f5dfc81
            }
        }).then( res=>{

<<<<<<< HEAD
            //点击“最新提问” 移除所有其他
            function removeCards(){
                let cards = document.querySelectorAll(".page-cards-container");
                if (cards.length !== 0){
                    for (let i =0; i<cards.length ; i++){
                        cards[i].remove();
                    }
                    // displayThis("block","pageCardMore");
                }
            }
            removeCards();

            let newQuestionList;
            newQuestionList = res.data;
            //对显示数量及数据是否为空进行判断限制
            displayNewQuestionsToHTML(newQuestionList);
            insertMoreNewQuestion();

        }).catch(function(e){
            zhiFouAlert("error:" + e);
        });
    }
}

function displayMoreNewQuestions() {

    //点击查看更多之后
    fetch(baseURL+"/question/new").then(response =>{
        if(response.ok){
            return response.json();
        }
    }).then(res =>{

        let newQuestionList;
        newQuestionList = res.data;
        //对显示数量及数据是否为空进行判断限制

        if (newQuestionList.length !== 0){
            //对显示数量及数据是否为空进行判断限制
            displayNewQuestionsToHTML(newQuestionList);

        } else if( newQuestionList.length === 0){

            document.getElementById("pageMoreNewQuestion").innerText = "我已经到底了噢";
            zhiFouAlert("没有更多提问了");

        }

    }).catch(function(e){
        zhiFouAlert("error:" + e);
    });

}

function insertMoreNewQuestion() {
    //将查看更多推荐插入最后一个card前面
    let insertDiv = document.querySelector(".useToInsert");
    let readMore = document.createElement("div");
    readMore.className = "page-cards-container";
    let htmlMoreNewQuestionHTML;
    htmlMoreNewQuestionHTML = `
                <div class="page-card-tips" onclick="displayMoreNewQuestions()" style="text-align: center;color: #8590a6;cursor: pointer">
                        <div class="page-card-more" id="pageMoreNewQuestion">
                            <span>点击查看更多</span>
                            <i class="fa fa-angle-down" aria-hidden="true"></i>
                     </div>
            </div>
            `;
    readMore.innerHTML = htmlMoreNewQuestionHTML;
    insertDiv.parentNode.insertBefore(readMore,insertDiv.nextSibling);
}

function insertReadMore() {
    //将查看更多推荐插入最后一个card前面
    let insertDiv = document.querySelector(".useToInsert");
    let readMore = document.createElement("div");
    readMore.className = "page-cards-container";
    let htmlReadMoreHTML;
    htmlReadMoreHTML = `
                <div class="page-card-tips" onclick="getInformation('moreLoad')" style="text-align: center;color: #8590a6;cursor: pointer">
                        <div class="page-card-more" id="pageCardMore">
                            <span>点击查看更多</span>
                            <i class="fa fa-angle-down" aria-hidden="true"></i>
                     </div>
            </div>
            `;
    readMore.innerHTML = htmlReadMoreHTML;
    insertDiv.parentNode.insertBefore(readMore,insertDiv.nextSibling);
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

=======
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

>>>>>>> 275b31322d2e32543fd8ba2c46ab16916f5dfc81
