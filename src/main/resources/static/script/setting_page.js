function settingsOperation(type) {
<<<<<<< HEAD
=======
    
    let personalInfo;
    personalInfo = getUserInfo();
>>>>>>> 275b31322d2e32543fd8ba2c46ab16916f5dfc81

    let infoTest = {
        nickNameTest: /^[\u4E00-\u9FA5A-Za-z0-9]{4,16}$/,
        passwordTest: /^[a-zA-Z0-9]{6,16}$/
    };
    
    if(type === 'get'){
<<<<<<< HEAD

        changePersonalImage();
        
        document.getElementById("setting-user-name").innerText = getCookie("userUserName");
        document.getElementById("setting-nickname").value = getCookie("userNickname");
        if ((getCookie("userDescription") !== '')&&(getCookie("userDescription")!== null)&&(getCookie("userDescription")!== 'null')){
            document.getElementById("setting-description").value = getCookie("userDescription");
        }
        if ((getCookie("userImageUrl") !== '')&&(getCookie("userImageUrl")!== null)&&(getCookie("userImageUrl")!== 'null')){
            document.getElementById("picture-content").src = getCookie("userImageUrl");
=======
        
        document.getElementById("setting-user-name").innerText = personalInfo.userUserName;
        document.getElementById("setting-nickname").value = personalInfo.userNickname;
        if (personalInfo.userDescription !== ''){
            document.getElementById("setting-description").value = personalInfo.userDescription;
        }
        if (personalInfo.userImageUrl !== ''){
            document.getElementById("personal-picture").src = personalInfo.userImageUrl;
>>>>>>> 275b31322d2e32543fd8ba2c46ab16916f5dfc81
        }
        
    } else if (type === 'setInfo'){
        
        if (document.getElementById("setting-nickname").value === ''){
            zhiFouAlert("昵称输入不能为空");
        } else if(!infoTest.nickNameTest.test(document.getElementById("setting-nickname").value)){
            zhiFouAlert("昵称格式有误！昵称(4-16位大小写字母、数字或汉字)");
<<<<<<< HEAD
        } else if((document.getElementById("setting-nickname").value === getCookie("userNickname"))
                &&(document.getElementById("setting-description").value === getCookie("userDescription"))){
            zhiFouAlert("没有做出修改！");
=======
>>>>>>> 275b31322d2e32543fd8ba2c46ab16916f5dfc81
        } else {

            let userPersonalInfo = {
                userNickname:document.getElementById("setting-nickname").value,
<<<<<<< HEAD
                userPassword:getCookie("userPassword"),
=======
                userPassword:personalInfo.userPassword,
>>>>>>> 275b31322d2e32543fd8ba2c46ab16916f5dfc81
                userDescription:document.getElementById("setting-description").value,
            };

            fetch( baseURL +"/user/modify",{
                method: 'POST',
                headers:{
                    'content-type': 'application/json'
                },
                body:JSON.stringify(userPersonalInfo)
            }).then(response =>{
                if(response.ok){
                    return response.json();
                }
            }).then(res =>{
                if(res.code === 1){
                    zhiFouAlert("保存成功！");
<<<<<<< HEAD
                    setCookie("userNickname",userPersonalInfo.userNickname);
                    setCookie("userDescription",userPersonalInfo.userDescription);
=======
>>>>>>> 275b31322d2e32543fd8ba2c46ab16916f5dfc81
                    setTimeout(function () {
                        window.location.reload();
                    },1000);
                } else {
                    zhiFouAlert("保存失败！");
                }
            }).catch(function(e){
                zhiFouAlert("error:" + e);
            });

        }
        
    } else if (type === 'setPassword') {

        if ((document.getElementById("setting-password-original").value === '')||
            (document.getElementById("setting-password").value === '')||
            (document.getElementById("setting-password-again").value === '')){
            zhiFouAlert("密码输入不能为空!");
        } else if( !infoTest.passwordTest.test(document.getElementById("setting-password-original").value)&&
            !infoTest.passwordTest.test(document.getElementById("setting-password").value)&&
            !infoTest.passwordTest.test(document.getElementById("setting-password-again").value)){
            zhiFouAlert("密码输入格式有误！");
        } else if(document.getElementById("setting-password").value !== document.getElementById("setting-password-again").value){
            zhiFouAlert("密码两次输入不一致！")
<<<<<<< HEAD
        } else if(document.getElementById("setting-password-original").value !== getCookie("userPassword")){
            zhiFouAlert("原始密码输入错误！")
        } else {

            let userPersonalInfo = {
                userNickname:getCookie("userNickname"),
                userPassword:document.getElementById("setting-password").value,
                userDescription:getCookie("userDescription"),
=======
        } else {

            let userPersonalInfo = {
                userNickname:personalInfo.userNickname,
                userPassword:document.getElementById("setting-password").value,
                userDescription:personalInfo.userDescription,
>>>>>>> 275b31322d2e32543fd8ba2c46ab16916f5dfc81
            };

            fetch( baseURL +"/user/modify",{
                method: 'POST',
                headers:{
                    'content-type': 'application/json'
                },
                body:JSON.stringify(userPersonalInfo)
            }).then(response =>{
                if(response.ok){
                    return response.json();
                }
            }).then(res =>{
                if(res.code === 1){
                    zhiFouAlert("密码修改成功！");
<<<<<<< HEAD
                    setCookie("userPassword",userPersonalInfo.userPassword);
=======
>>>>>>> 275b31322d2e32543fd8ba2c46ab16916f5dfc81
                    setTimeout(function () {
                        window.location.reload();
                    },1000);
                } else {
                    zhiFouAlert("密码修改失败！");
                    setTimeout(function () {
                        window.location.reload();
                    },1000);
                }
            }).catch(function(e){
                zhiFouAlert("error:" + e);
            });

        }
    }
}

function readImgFile() {
    let imgElement = document.getElementById("personal-img");
    let imgs = imgElement.files;
    if((imgs[0].size/1024)>2000){
        zhiFouAlert("上传的图片需小于2M！" + imgs[0].name);
        delete imgs[0];
    }else {

        // let reader = new FileReader();
        // reader.readAsDataURL(imgs[0]);
        // reader.onload = function () {
        //     //这里把图片转化位base64的格式
        //     let newUrl = this.result;

            //这里取巧 用已知的绝对url代替没有服务器的图片上传方式
            let newUrl = "../static/img/" + imgs[0].name;

            let pictureInfo = {
                userImageUrl:newUrl
            };

            fetch(baseURL+"/user/modify/imageUrl",{
                method:'post',
                headers: {
                    'content-type': 'application/json'
                },
                body:JSON.stringify(pictureInfo)
            }).then(response=>{
                if (response.ok){
                    return response.json();
                }
            }).then(res=>{
                if (res.code === 1){
                   zhiFouAlert("上传头像成功！");
                    document.getElementById("picture-content").src = newUrl;

                    if (document.getElementById("yonghu-picture").src === ""){
                        document.getElementById("yonghu-picture").src = newUrl;
                        document.getElementById("yonghu-picture").style.display = "block";
<<<<<<< HEAD
                        document.getElementById("yonghu-icon").style.display = "none";
                    } else {
                        document.getElementById("yonghu-picture").src = newUrl;
                    }

                    setCookie("userImageUrl",pictureInfo.userImageUrl);
=======
                    } else {
                        document.getElementById("yonghu-picture").src = newUrl;
                    }
                   //还要修改cookies
>>>>>>> 275b31322d2e32543fd8ba2c46ab16916f5dfc81

                } else {
                    zhiFouAlert("上传头像失败！");
                }
            }).catch(function(e){
                alert("error:" + e);
            });

        delete imgs[0];

    }
    // }
}