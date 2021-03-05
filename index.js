console.log("index.js: loaded");

// http通信関数
const fetchUserInfo = (userId) => {
  fetch(`https://api.github.com/users/${encodeURIComponent(userId)}`)
    .then((res) => {
      console.log(res.status);

      if (res.ok) {
        return res.json().then((userInfo) => {
          console.log(userInfo);
        });
      } else {
        console.error("エラーレスポンス", res);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
