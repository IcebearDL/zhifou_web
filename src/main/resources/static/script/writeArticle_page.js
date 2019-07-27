function writeArticleOnload() {

    let articleTipsHtml = `
        <div style="display: flex;justify-content: space-between">
            <div style="line-height: 34px">
                <div class="edit-word-num"><span id="edit-word-num">0</span><span>&nbsp;字</span></div>
            </div>
            <div style="display: flex;align-items: center">
                <button type="button" class="article-submit-button" onclick="writeArticleOpeartion('save')">保存</button>
                <button type="button" class="article-submit-button" onclick="writeArticleOpeartion('publish')">发布文章</button>
            </div>
        </div>
    `;

    //将cardColumns插入到useToInsert这个div之前
    let insertDiv = document.getElementsByClassName("w-e-menu")[13];
    let articleTips = document.createElement("div");
    articleTips.className = "article-tips";
    articleTips.innerHTML = articleTipsHtml;
    insertDiv.parentNode.insertBefore(articleTips,insertDiv.nextSibling);
}

function writeArticleOpeartion(type) {

    if(type === "publish"){

        if(document.getElementById("article-title-input").value.length < 5){
            zhiFouAlert("标题字数太少了！");
        } else if(editor.txt.text().length < 160){
            zhiFouAlert("文章字数要大于160字！");
        } else {

            let articleInfo = {
                articleTitle : document.getElementById("article-title-input").value,
                articleDescription : editor.txt.html()
            };

            fetch(baseURL+"/user/create/article",{
                method:'post',
                headers: {
                    'content-type': 'application/json'
                },
                body:JSON.stringify(articleInfo)
            }).then(response=>{
                if (response.ok){
                    return response.json();
                }
            }).then(res=>{
                if(res.code === 1){

                    zhiFouAlert("文章发布成功");
                    setTimeout(function () {
                        window.location.href = window.location.origin +'/zhifou/user/personalPage?type=dynamic';
                    },1000)

                }
            }).catch(function(e){
                zhiFouAlert("error:" + e);
            });

        }

    } else if(type === "save"){

        zhiFouAlert("功能待完善！");

    }


}