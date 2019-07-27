<<<<<<< HEAD
let registerURL = 'http://localhost:8080/zhifou/user';
=======
let registerURL = 'http://localhost:8080/user';
>>>>>>> 275b31322d2e32543fd8ba2c46ab16916f5dfc81

let infoTest = {
    userNameTest: /^[a-zA-Z0-9]{6,12}$/,
    nickNameTest: /^[\u4E00-\u9FA5A-Za-z0-9]{4,16}$/,
    passwordTest: /^[a-zA-Z0-9]{6,16}$/
};

function user_register() {
    let userName = document.getElementById('inputUserName').value;
    let nickName = document.getElementById('inputNickName').value;
    let password = document.getElementById('inputPassword').value;
    let repeatPassword = document.getElementById('inputRepeatPassword').value;

    let register_info = {
        userUserName : userName,
        userNickname : nickName,
        userPassword : password
    };

    console.log(register_info);



    if(userName === ""||nickName === ""||password === ""||repeatPassword===""){
        zhiFouAlert("请输入完整!");
    }else if(!infoTest.nickNameTest.test(userName)) {
        zhiFouAlert("用户名格式有误！");
    }else if(!infoTest.nickNameTest.test(nickName)){
        zhiFouAlert("昵称格式有误！");
    } else if(!infoTest.nickNameTest.test(password)){
        zhiFouAlert("密码格式有误！");
    } else if(password !== repeatPassword) {
        zhiFouAlert("两次输入密码不一致！");
    }else{
        fetch(registerURL+"/register/load",{
            method: 'POST',
            headers:{
                'content-type': 'application/json'
            },
            body:JSON.stringify(register_info)
        }).then(response =>{
            if(response.ok){
                return response.text();
            }
        }).then(data => {
            if(data === "success"){
                zhiFouAlert("注册成功！");
                location.href="register";
            }else if(data === "failed"){
                zhiFouAlert("该用户命已存在！注册失败");
                return false;
            }
        }).catch(function(e){
            zhiFouAlert("error:" + e);
        });
    }
}

function user_login() {
    let userName = document.getElementById("inputUserName_load").value;
    let password = document.getElementById("inputPassword_load").value;

    let login_info = {
        userUserName : userName,
        userPassword : password
    };

    if( userName === "" || password === ""){
        zhiFouAlert("请输入完整!");
        //需要另外对字符串键入匹配
    } else if(!infoTest.nickNameTest.test(userName)){
        zhiFouAlert("用户名格式有误！");
    } else if(!infoTest.nickNameTest.test(password)) {
        zhiFouAlert("密码格式有误！");
    } else{
        fetch(registerURL+"/login",{
            method: 'POST',
            headers:{
                'content-type': 'application/json'
            },
            body:JSON.stringify(login_info)
        }).then(response =>{
            if(response.ok){
                console.log("请求成功");
                return response.json();
            }
<<<<<<< HEAD
        }).then(res => {
            if(res.code === 1){
                setCookie("userUserName",res.data.userUsername);
                setCookie("userPassword",res.data.userPassword);
                setCookie("userNickname",res.data.userNickname);
                setCookie("userDescription",res.data.userDescription);
                setCookie("userImageUrl",res.data.userImageUrl);
                location.href="main";
            }else if(res.code === 0){
=======
        }).then(data => {
            if(data === "success"){
                location.href="main";
            }else if(data === "failed"){
>>>>>>> 275b31322d2e32543fd8ba2c46ab16916f5dfc81
                zhiFouAlert("该用户命不存在或者密码输入错误！");
                return false;
            }
        }).catch(function(e){
            zhiFouAlert("error:" + e);
        });
    }
}


function switch_state() {
    let register_part = document.getElementById("register_state");
    let login_state = document.getElementById("login_state");
    if (register_part.style.display === "block"){
        register_part.style.display = "none";
        login_state.style.display = "block";
    }else{
        register_part.style.display = "block";
        login_state.style.display = "none";
    }
}

function zhiFouAlert(text) {
    document.getElementById("content").innerText = text;
    $('#alertModal').toast('show');
}