const skapi = new Skapi(
    "7O73nlnQDEAo-68T75-59348420-466b-41ae-9f93-46a6239f3c7d",
    {
        autoLogin: window.localStorage.getItem("remember") === "true",
        eventListener: { onLogin: userCheck },
    },
    { hostDomain: "skapi.app", target_cdn: "d1wrj5ymxrt2ir" }
);

// console.log(skapi);
skapi.version();

let loggedUser = {};

function userCheck(user) {
    if (user) {
        for (let key in user) {
            loggedUser[key] = user[key];
        }
    } else {
        for (let key in loggedUser) {
            delete loggedUser[key];
        }
    }

    // loggedUser 화면 업데이트
    let loggedUserElement = document.getElementById("loggedUser");
    if (loggedUserElement) {
        loggedUserElement.innerText = JSON.stringify(loggedUser, null, 2);
    }

    // 버튼 상태 업데이트 (index.html에 updateAuthButtons 함수가 있는 경우)
    if (typeof updateAuthButtons === "function") {
        updateAuthButtons();
    }
}

// 사용자 접속 정보
skapi.getConnectionInfo().then((info) => {
    let _ip = info.user_ip;
    let loggedUserElement = document.getElementById("loggedUser");

    if (loggedUserElement)
        loggedUserElement.innerText = JSON.stringify(loggedUser, null, 2);

    let serviceNameElement = document.getElementById("serviceName");
    if (serviceNameElement) {
        serviceNameElement.innerText =
            JSON.stringify(info.service_name) || "서비스 이름 없음";
    }
});
