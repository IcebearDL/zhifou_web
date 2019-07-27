<<<<<<< HEAD
let UrlQuestionId;
let questionPageType;
=======
let UrlAnswerId;
>>>>>>> 275b31322d2e32543fd8ba2c46ab16916f5dfc81

//将页面URL转化为answerId
function getID(){
    let thisURL = window.location.href;
<<<<<<< HEAD
    let questionIdString = (thisURL.split("?")[1]).split("&&")[0];
    let typeString = (thisURL.split("?")[1]).split("&&")[1];

    UrlQuestionId = questionIdString.split("=")[1];
    questionPageType = typeString.split("=")[1];
}

function createRandomToAuthor() {
    function randomNum(minNum,maxNum){
        switch(arguments.length){
            case 1:
                return parseInt(Math.random()*minNum+1,10);
                break;
            case 2:
                return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
                break;
            default:
                return 0;
                break;
        }
    }
    document.getElementById("author-zhifou-info-num").innerText = randomNum(5,60);
    document.getElementById("author-zhifou-info-article").innerText = randomNum(1,40);
    document.getElementById("author-zhifou-info-fun").innerText = randomNum(100,200000);
}
=======
    UrlAnswerId = (thisURL.split("?")[1]).split("=")[1];
}
getID();
>>>>>>> 275b31322d2e32543fd8ba2c46ab16916f5dfc81

function displayAnswers(answers){

    let htmlAnswersString = '';
    answers.forEach(data =>{
        htmlAnswersString += `
<<<<<<< HEAD
                <div class="answer-card">
=======
            <div class="answer-card">
>>>>>>> 275b31322d2e32543fd8ba2c46ab16916f5dfc81
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
                    <div class="answer-star">${data.answerStar} 人在看</div>
                    <hr>
                    <div class="answer-description" id="answer-description${data.answerId}" style="height: auto">
                        <div class="description-content" id="content${data.answerId}">${data.answerDescription}</div>
                        <div class="answer-shadow" style="display: none" id="answer-shadow${data.answerId}">
                            <div class="answer-shadow-text" onclick="answerOpeartion('displayFullAnswer',${data.answerId})">
                                <span>点击展开全文</span><span class="iconfont icon-xia"></span>
                            </div>
                        </div>
                    </div>
<<<<<<< HEAD
                    <div class="answer-time">${transfromTimeTag(data.updateTime)}</div>
                    <div class="question-card-bottom" style="position: relative;bottom: 0" id="question-card-bottom${data.answerId}">
                        <div class="answer-card-bottom-reader" style="display: inline-block" onclick="cardOperation('upQuestionLooking',${data.answerId})" id="upQuestionLooking${data.answerId}">
=======
                    <div class="answer-time">${data.updateTime}</div>
                    <div class="question-card-bottom" style="position: relative;bottom: 0" id="question-card-bottom${data.answerId}">
                        <div class="page-card-bottom-reader" style="display: inline-block" onclick="cardOperation('upQuestionLooking',${data.answerId})" id="upQuestionLooking${data.answerId}">
>>>>>>> 275b31322d2e32543fd8ba2c46ab16916f5dfc81
                            <div class="d-inline-block align-middle">
                                <span class="iconfont icon-reading" style="font-size: 18px;line-height: 22px"></span>
                            </div>
                            <div class="d-inline-block align-middle">
                                <span>在看&nbsp</span><span id="isLooking${data.answerId}">${data.answerStar}</span>
                            </div>
                        </div>
<<<<<<< HEAD
                        <div class="answer-card-bottom-reader-already" style="display: none" onclick="cardOperation('downQuestionLooking',${data.answerId})" id="downQuestionLooking${data.answerId}">
=======
                        <div class="page-card-bottom-reader-already" style="display: none" onclick="cardOperation('downQuestionLooking',${data.answerId})" id="downQuestionLooking${data.answerId}">
>>>>>>> 275b31322d2e32543fd8ba2c46ab16916f5dfc81
                            <div class="d-inline-block align-middle">
                                <span class="iconfont icon-reading" style="font-size: 18px;line-height: 22px"></span>
                            </div>
                            <div class="d-inline-block align-middle">
<<<<<<< HEAD
                                <span>已在看</span><span id="haveLooked${data.answerId}"></span>
                            </div>
                        </div>
                        <div class="answer-card-bottom-item" onclick="cardOperation('displayComment',${data.answerId})" data-toggle="modal" data-target="#displayComment">
=======
                                <span>已在看</span><span id="haveLooked${data.answerId}">${data.answerStar}</span>
                            </div>
                        </div>
                        <div class="page-card-bottom-item" onclick="cardOperation('displayComment',${data.answerId})" data-toggle="modal" data-target="#displayComment">
>>>>>>> 275b31322d2e32543fd8ba2c46ab16916f5dfc81
                            <div class="d-inline-block align-middle">
                                <span class="iconfont icon-pinglun" style="line-height: 22px"></span>
                            </div>
                            <div class="d-inline-block align-middle">
                                <span>${data.commentNumber} 条评论</span>
                            </div>
                        </div>
<<<<<<< HEAD
                        <div class="answer-card-bottom-item" style="display: inline-block" onclick="answerCardOperation('upStoreAnswer',${data.answerId})" id="upStoreAnswer${data.answerId}">
                            <div class="d-inline-block align-middle">
                                <span class="iconfont icon-shoucang" style="font-size: 18px;line-height: 22px"></span>
                            </div>
                            <div class="d-inline-block align-middle">
                                <span>收藏</span>
                            </div>
                        </div>
                        <div class="answer-card-bottom-item" style="display: none" onclick="answerCardOperation('downStoreAnswer',${data.answerId})" id="downStoreAnswer${data.answerId}">
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
=======
                                <span style="display: inline-block" id="storeQuestion${data.answerId}">收藏</span>
                                <span style="display: none" id="haveStored${data.answerId}">已收藏</span>
>>>>>>> 275b31322d2e32543fd8ba2c46ab16916f5dfc81
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

    //将question cards插入到answerInsert这个div之前
<<<<<<< HEAD
    let insertDiv = document.querySelector(".useToInsert");
    let answerCards = document.createElement("div");
    answerCards.className = "page-cards-container";
=======
    let insertDiv = document.getElementById("answerInsert");
    let answerCards = document.createElement("div");
    answerCards.className = "answer-card-container";
>>>>>>> 275b31322d2e32543fd8ba2c46ab16916f5dfc81
    answerCards.innerHTML = htmlAnswersString;
    insertDiv.parentNode.insertBefore(answerCards,insertDiv);
}

<<<<<<< HEAD
function answerCardOperation(type,id) {

    if (type === "upStoreAnswer"){

        function upStoreAnswer(answerId) {

            if(typeof (answerId) === "string"){
                answerId = parseInt(answerId);
            }

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
                displayThis("i-block","upStoreAnswer"+answerId);
                displayThis("i-block","downStoreAnswer"+answerId);
            }).catch(function(e){
                zhiFouAlert("error:" + e);
            });
        }
        upStoreAnswer(id);

    } else if(type === "downStoreAnswer"){

        function downStoreAnswer(answerId) {

            if(typeof (answerId) === "string"){
                answerId = parseInt(answerId);
            }

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
                displayThis("i-block", "upStoreAnswer" + answerId);
                displayThis("i-block", "downStoreAnswer" + answerId);
            }).catch(function (e) {
                zhiFouAlert("error:" + e);
            });
        }

        downStoreAnswer(id);
}
}

function checkUserAnswer() {

    let checkInfo = {
        questionId : UrlQuestionId
    };

    //用于查询此问题有无作者回答的问题，有则显示在最上方
    fetch(baseURL+"/answer/check",{
        method:'post',
        headers: {
            'content-type': 'application/json'
        },
        body:JSON.stringify(checkInfo)
    }).then(response=>{
        if (response.ok){
            return response.json();
        }
    }).then(res=>{

        if ((res.data !== '')&&(res.data !== null)){

            //插入自己提交的回答
            let myAnswer = `
                    <div class="answer-card">
                    <a class="answer-top"></a>
                    <div class="answer-card-author">
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
                    <div class="answer-star">
                        <span>${res.data.answerStar}</span>
                        <span>人在看</span>
                    </div>
                    <hr>
                    <div class="answer-description" id="answer-description${res.data.answerId}" style="height: auto">
                        <div class="description-content" id="description-content${res.data.answerId}">${res.data.answerDescription}</div>
                        <div class="answer-shadow" style="display: none" id="answer-shadow${res.data.answerId}">
                            <div class="answer-shadow-text" onclick="answerOpeartion('displayFullAnswer',${res.data.answerId})">
                                <span>点击展开全文</span><span class="iconfont icon-xia"></span>
                            </div>
                        </div>
                    </div>
                    <div class="answer-time"><span>编辑于${res.data.updateTime}</span></div>
                    <div class="myquestion-card-bottom" style="position: relative;bottom: 0" id="question-card-bottom${res.data.answerId}">
                        <div>
                            <div class="answer-card-bottom-reader" style="display: inline-block">
                                <div class="d-inline-block align-middle">
                                    <span class="iconfont icon-reading" style="font-size: 18px;line-height: 22px"></span>
                                </div>
                                <div class="d-inline-block align-middle">
                                    <span>在看&nbsp</span><span id="isLooking">${res.data.answerStar}</span>
                                </div>
                            </div>
                            <div class="answer-card-bottom-item">
                                <div class="d-inline-block align-middle">
                                    <span class="iconfont icon-pinglun" style="line-height: 22px"></span>
                                </div>
                                <div class="d-inline-block align-middle">
                                    <span>${res.data.commentNumber}</span>
                                    <span>人评论</span>
                                </div>
                                <div class="page-card-bottom-pickup-answer" style="display: none" onclick="answerOpeartion('pickUpAnswer',${res.data.answerId})" id="pickUp-answer${res.data.answerId}">
                                    <div>
                                        <a href="#answer-top${res.data.answerId}"><span>收起全文 </span><span class="iconfont icon-shang"></span></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="answer-card-bottom-reader" onclick="createAnswerOperation('edit')">
                                <span>再次编辑</span>
                            </div>
                            <div class="answer-card-bottom-reader" onclick="createAnswerOperation('delete')">
                                <span>删除回答</span>
                            </div>
                        </div>
                    </div>
                    </div>`;

            document.getElementById("answer-question").style.display = "none";
            document.getElementById("answer-edit").style.display = "inline-block";

            let insertDiv = document.getElementById("useToInsertMyAnswer");
            let answerCard = document.createElement("div");
            answerCard.innerHTML = myAnswer;
            insertDiv.parentNode.insertBefore(answerCard,insertDiv);

            //判断自己回答的高度
            if (document.getElementById("description-content"+res.data.answerId).clientHeight > 450){
                //大于450的内容将div设置为450px高
                document.getElementById("answer-description"+res.data.answerId).style.height = "450px";
                document.getElementById("answer-shadow"+res.data.answerId).style.display = "block";
            }

        }

    }).catch(function(e){
        zhiFouAlert("error:" + e);
    });


}

function judgeAnswerHeight(answerList){

    //插入之后对question_description长度进行判断
    answerList.forEach(des=>{
        if (des.clientHeight > 450){
            //大于450的内容将div设置为450px高
            let answerId = des.id.substring(7);
            document.getElementById("answer-description"+answerId).style.height = "450px";
            document.getElementById("answer-shadow"+answerId).style.display = "block";
        }
    });
}

function getAnswers(type) {

    if(type === "firstLoad"){

        getID();

        let firstRequest = {
            questionId : UrlQuestionId,
=======
function getAnswers(type) {

    function judgeAnswerHeight(answerList){

        //插入之后对question_description长度进行判断
        answerList.forEach(des=>{
            if (des.clientHeight > 450){
                //大于450的内容将div设置为450px高
                let answerId = des.id.substring(7);
                document.getElementById("answer-description"+answerId).style.height = "450px";
                document.getElementById("answer-shadow"+answerId).style.display = "block";
            }
        });

    }

    if(type === "firstLoad"){

        let firstRequest = {
            answerId : UrlAnswerId,
>>>>>>> 275b31322d2e32543fd8ba2c46ab16916f5dfc81
            count : 0
        };

        //获取当前id answer的question 和answer 信息
        fetch(
            // baseURL+"/content",
            baseURL+"/question/full",
            {
            method:'post',
            headers: {
                'content-type': 'application/json'
            },
            body:JSON.stringify(firstRequest)

        }
        ).then(response=>{
            if (response.ok){
                return response.json();
            }
        }).then(res=>{

            //写入问题头 和右侧的 作者information
            document.getElementById("question-title").innerText = res.data.questionTitle;
            document.getElementById("question-description").innerText = res.data.questionDescription;
            document.getElementById("question-followers").innerText = res.data.questionFollowers;
            document.getElementById("question-browser").innerText = res.data.questionBrowsers;
            document.getElementById("question-container").style.display = "block";

<<<<<<< HEAD
            let answerList;
            answerList = res.data.answerInfoList;
            //对显示数量及数据是否为空进行判断限制
            if(answerList.length !== 0){

                document.getElementById("about-author-img").src = res.data.answerInfoList[0].userImageUrl;
                document.getElementById("about-author-name").innerText = res.data.answerInfoList[0].userNickname;
                document.getElementById("about-author-description").innerText = res.data.answerInfoList[0].userDescription;

                displayAnswers(answerList);
                //display之后对answerDescription的长度进行判断

                //插入更多问题
                insertMoreAnswer();
                //cards插入完成后，显示导航栏下方右侧部分
                createRandomToAuthor();
                document.getElementById("right-columns").style.display = "block";
                return true;

            } else {
                insertMoreAnswer();
                document.getElementById("answer-card-more").innerText = "暂时没有回答，快点击上方写回答吧！";
            }

            checkUserAnswer();
            //判断是否是从最新问题的写回答页面点进来的//
            if (questionPageType === "edit"){
                displayEditor();
            }

        }).then(response=>{
            if(response){
                //将querySelectorAll选择出的nodelist转化为数组
                let contents = Array.prototype.slice.call(document.querySelectorAll(".description-content"));
                judgeAnswerHeight(contents);
            }
=======
            document.getElementById("about-author-img").src = res.data.answerInfoList[0].userImageUrl;
            document.getElementById("about-author-name").innerText = res.data.answerInfoList[0].userNickname;
            document.getElementById("about-author-description").innerText = res.data.answerInfoList[0].userDescription;


            let answerList;
            answerList = res.data.answerInfoList;
            //对显示数量及数据是否为空进行判断限制
            displayAnswers(answerList);
            //display之后对answerDescription的长度进行判断

            //插入更多问题
            insertMoreAnswer();
            //cards插入完成后，显示导航栏下方右侧部分
            document.getElementById("right-columns").style.display = "block";

        }).then(()=>{

            //将querySelectorAll选择出的nodelist转化为数组
            let contents = Array.prototype.slice.call(document.querySelectorAll(".description-content"));
            judgeAnswerHeight(contents);

>>>>>>> 275b31322d2e32543fd8ba2c46ab16916f5dfc81
        }).catch(function(e){
            zhiFouAlert("error:" + e);
        });

    }else if (type === "moreLoad"){

        let answerNum = document.querySelectorAll(".answer-card").length;

        let moreRequest = {
<<<<<<< HEAD
            questionId : UrlQuestionId,
=======
            answerId : UrlAnswerId,
>>>>>>> 275b31322d2e32543fd8ba2c46ab16916f5dfc81
            count : answerNum
        };

        //获取当前id answer的question 和answer 信息
        fetch(baseURL+"/question/full",{
            method:'post',
            headers: {
                'content-type': 'application/json'
            },
            body:JSON.stringify(moreRequest)
        }).then(response=>{
            if (response.ok){
                return response.json();
            }
        }).then(res=>{

            let answerList = res.data.answerInfoList;
            let newCocntentNum = answerList.length;
            if (newCocntentNum !== 0){
                //对显示数量及数据是否为空进行判断限制
                displayAnswers(answerList);

            } else if( newCocntentNum === 0){

                document.getElementById("answer-card-more").innerText = "我已经到底了噢";
                zhiFouAlert("没有更多回答了");

            }
            return newCocntentNum;

        }).then(num=>{

            //将querySelectorAll选择出的nodelist转化为数组; 在刷出来之后判断；
            let moreContents = Array.prototype.slice.call(document.querySelectorAll(".description-content"),-num);
            judgeAnswerHeight(moreContents);

        }).catch(function(e){
            zhiFouAlert("error:" + e);
        });
    }
}

<<<<<<< HEAD
function displayEditor() {

    let answerHtml = `
             <div class="answer-card">
                <div class="answer-card-author">
                    <div style="padding-bottom: 10px">
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
                    <div class="answer-content">
                        <div id="answer-editor" class="answer-edit-content">
                            <p>写回答...</p>
                        </div>
                        <div class="answer-submit" onclick="createAnswerOperation('submit')">提交</div>
                    </div>
                </div>
            </div>
    `;

    let insertDiv = document.getElementById("useToInsertMyAnswer");
    let answerCard = document.createElement("div");
    answerCard.id = "answer-card-content";
    answerCard.style.display = "block";
    answerCard.innerHTML = answerHtml;
    insertDiv.parentNode.insertBefore(answerCard,insertDiv);

    //配置富文本编辑框
    wangeditor3Config();
}

function createAnswerOperation(type) {
    if(type === "write"){

        if(!document.getElementById("answer-card-content")){
            displayEditor();
        } else if(document.getElementById("answer-card-content").style.display === "block"){
            document.getElementById("answer-card-content").style.display = "none";
        } else if(document.getElementById("answer-card-content").style.display === "none"){
            document.getElementById("answer-card-content").style.display = "block";
        }

    } else if(type === "submit"){

        if(editor.txt.text().length === ''){
            zhiFouAlert("提交不能没有文字！")
        } else if(editor.txt.text().length < 17){
            zhiFouAlert("回答字数太少！");
        } else {

            let answer = {
                questionId :UrlQuestionId,
                answerDescription : editor.txt.html()
            };

            fetch(baseURL+"/user/create/answer",{
                method:'post',
                headers: {
                    'content-type': 'application/json'
                },
                body:JSON.stringify(answer)
            }).then(response=>{
                if (response.ok){
                    return response.json();
                }
            }).then(res=>{
                if(res.code === 1){
                    zhiFouAlert("提交成功！");
                    document.getElementById("answer-card-content").remove();
                    document.getElementById("answer-question").style.display = "none";
                    document.getElementById("answer-edit").style.display = "inline-block";

                    //插入自己提交的回答
                    let myAnswer = `
                    <div class="answer-card">
                    <a class="answer-top" id="answer-top${res.data.answerId}"></a>
                    <div class="answer-card-author">
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
                    <div class="answer-star">0人在看</div>
                    <hr>
                    <div class="answer-description" id="answer-description${res.data.answerId}" style="height: auto">
                        <div class="description-content" id="description-content${res.data.answerId}">${editor.txt.html()}</div>
                        <div class="answer-shadow" style="display: none" id="answer-shadow${res.data.answerId}">
                            <div class="answer-shadow-text" onclick="answerOpeartion('displayFullAnswer',${res.data.answerId})">
                                <span>点击展开全文</span><span class="iconfont icon-xia"></span>
                            </div>
                        </div>
                    </div>
                    <div class="answer-time"><span>编辑于刚刚</span></div>
                    <div class="question-card-bottom" style="position: relative;bottom: 0" id="question-card-bottom${res.data.answerId}">
                        <div class="answer-card-bottom-reader" style="display: inline-block">
                            <div class="d-inline-block align-middle">
                                <span class="iconfont icon-reading" style="font-size: 18px;line-height: 22px"></span>
                            </div>
                            <div class="d-inline-block align-middle">
                                <span>在看&nbsp</span><span id="isLooking">0</span>
                            </div>
                        </div>
                        <div class="answer-card-bottom-item">
                            <div class="d-inline-block align-middle">
                                <span class="iconfont icon-pinglun" style="line-height: 22px"></span>
                            </div>
                            <div class="d-inline-block align-middle">
                                <span>暂无评论</span>
                            </div>
                        </div>
                        <div class="page-card-bottom-pickup-answer" style="display: none" onclick="answerOpeartion('pickUpAnswer',${res.data.answerId})" id="pickUp-answer${res.data.answerId}">
                            <div>
                                <a href="#answer-top${res.data.answerId}"><span>收起全文 </span><span class="iconfont icon-shang"></span></a>
                            </div>
                        </div>
                        <div class="answer-card-bottom-item" onclick="createAnswerOperation('edit')">
                            <div>再次编辑</div>
                        </div>
                        <div class="answer-card-bottom-item" onclick="createAnswerOperation('delete')">
                            <div>删除回答</div>
                        </div>
                    </div>
                    </div>`;

                    let insertDiv = document.getElementById("useToInsertMyAnswer");
                    let answerCard = document.createElement("div");
                    answerCard.innerHTML = myAnswer;
                    insertDiv.parentNode.insertBefore(answerCard,insertDiv);
                }

                return res.data.answerId;
            }).then(id=>{

                //判断自己回答的高度
                if (document.getElementById("description-content"+id).clientHeight > 450){
                    //大于450的内容将div设置为450px高
                    document.getElementById("answer-description"+id).style.height = "450px";
                    document.getElementById("answer-shadow"+id).style.display = "block";
                }

            }).catch(function(e){
                zhiFouAlert("error:" + e);
            });
        }
    } else if (type === "edit"){
        //获取当前的问题的value，
        zhiFouAlert("功能待完善！");
    } else if (type === "delete"){
        //获取当前的问题的value，
        zhiFouAlert("功能待完善！");
    }
}

function questionStore(type) {

    if(type === "upStoreQuestion"){

        function upStoreQuestion(questionId) {

            if(typeof (questionId) === "string"){
                questionId = parseInt(questionId);
            }

            //type 问题回答文章；0，1，2
            let upStore = {
                state: "up",
                collectionType: 0,
                collectionTypeId: questionId,
            };

            fetch(baseURL+"/user/collect",{
                method:'post',
                headers: {
                    'content-type': 'application/json'
                },
                body:JSON.stringify(upStore)
            }).then(response=>{
                if (response.ok){
                    zhiFouAlert("收藏问题成功");
                    return response.json();
                }
            }).then(()=>{
                displayThis("i-block","up-store-question");
                displayThis("i-block","down-store-question");
            }).catch(function(e){
                zhiFouAlert("error:" + e);
            });
        }
        upStoreQuestion(UrlQuestionId);

    } else if(type === "downStoreQuestion"){

        function downStoreQuestion(questionId) {

            if(typeof (questionId) === "string"){
                questionId = parseInt(questionId);
            }

            let downStore = {
                state: "down",
                collectionType: 0,
                collectionTypeId: questionId,
            };

            fetch(baseURL + "/user/collect", {
                method: 'post',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(downStore)
            }).then(response => {
                if (response.ok) {
                    zhiFouAlert("取消收藏问题成功！");
                    return response.json();
                }
            }).then(() => {
                displayThis("i-block", "up-store-question");
                displayThis("i-block", "down-store-question");
            }).catch(function (e) {
                zhiFouAlert("error:" + e);
            });
        }
        downStoreQuestion(UrlQuestionId);

    }

}

=======
>>>>>>> 275b31322d2e32543fd8ba2c46ab16916f5dfc81
function answerOpeartion(type,answerId) {
    if (type === "displayFullAnswer") {
        document.getElementById("answer-shadow"+answerId).style.display = "none";
        document.getElementById("answer-description"+answerId).style.height = "auto";
        document.getElementById("pickUp-answer"+answerId).style.display = "inline-block";

        document.getElementById("question-card-bottom"+answerId).style.position = "sticky";
    } else if (type === "pickUpAnswer") {
        document.getElementById("pickUp-answer"+answerId).style.display = "none";
        document.getElementById("answer-description"+answerId).style.height = "450px";
        document.getElementById("answer-shadow"+answerId).style.display = "block";

        document.getElementById("question-card-bottom"+answerId).style.position = "relative";
    }
}

function insertMoreAnswer() {
    //将查看更多推荐插入最后一个card前面
<<<<<<< HEAD
    let insertDiv = document.querySelector(".useToInsert");
    let moreAnswer = document.createElement("div");
    moreAnswer.className = "page-cards-container";
=======
    let insertDiv = document.getElementById("answerInsert");
    let moreAnswer = document.createElement("div");
    moreAnswer.className = "answer-card-container";
>>>>>>> 275b31322d2e32543fd8ba2c46ab16916f5dfc81
    let htmlReadMoreHTML;
    htmlReadMoreHTML = `
                <div class="question-card-tips" onclick="getAnswers('moreLoad')" id="pageCardMore">
                        <div class="answer-card-more" id="answer-card-more">
                            <span>点击查看更多回答</span>
                            <i class="fa fa-angle-down" aria-hidden="true"></i>
                        </div>
                </div>
            `;
    moreAnswer.innerHTML = htmlReadMoreHTML;
    insertDiv.parentNode.insertBefore(moreAnswer,insertDiv.nextSibling);
<<<<<<< HEAD
}

//全局设置editor
var editor;
function wangeditor3Config() {
    var E = window.wangEditor;
    editor = new E( document.getElementById("answer-editor") );
    // 编辑区域和菜单的z-index会同时生效
    editor.customConfig.zIndex = 100;
    editor.customConfig.menus = [
        'head',  // 标题
        'bold',  // 粗体
        'fontSize',  // 字号
        'italic',  // 斜体
        'underline',  // 下划线
        'strikeThrough',  // 删除线
        'list',  // 列表
        'justify',  // 对齐方式
        'link',  // 插入链接
        'image',  // 插入图片
        'video',  // 插入视频
        'code',  // 插入代码
        'undo',  // 撤销
        'redo'  // 重复
    ];
    editor.customConfig.linkImgCheck = function (src) {
        console.log(src); // 图片的链接

        return true // 返回 true 表示校验成功
        // return '验证失败' // 返回字符串，即校验失败的提示信息
    };
    editor.customConfig.linkCheck = function (text, link) {
        console.log(text); // 插入的文字
        console.log(link); // 插入的链接

        return true // 返回 true 表示校验成功
        // return '验证失败' // 返回字符串，即校验失败的提示信息
    };
    editor.create()
=======
>>>>>>> 275b31322d2e32543fd8ba2c46ab16916f5dfc81
}