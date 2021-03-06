const main = async () => {
  try {
    const userId = getUserId();
    const userInfo = await fetchUserInfo(userId);
    const view = createView(userInfo);
    displayView(view);
  } catch (error) {
    console.error(`エラーが発生しました ${error}`);
  }
};

// userId取得関数
const getUserId = () => {
  return document.getElementById("userId").value;
};

// http通信関数
const fetchUserInfo = (userId) => {
  return fetch(
    `https://api.github.com/users/${encodeURIComponent(userId)}`
  ).then((res) => {
    console.log(res.status);

    if (res.ok) {
      return res.json().then((userInfo) => {
        return userInfo;
      });
    } else {
      return Promise.reject(new Error(`${res.status} : ${res.statusText}`));
    }
  });
};

// view作成関数
const createView = (userInfo) => {
  return escapeHTML`
              <h4>${userInfo.name} (@${userInfo.login})</h4>
              <img src="${userInfo.avatar_url} alt="${userInfo.login}" height="100" >
              <dl>
                <dt>Location</dt>
                <dd>${userInfo.location}</dd>
                <dt>Repositories</dt>
                <dd>${userInfo.public_repos}</dd>
              </dl>
            `;
};

// view表示関数
const displayView = (view) => {
  const result = document.getElementById("result");
  result.innerHTML = view;
};

// エスケープ関数
const escapeSpecialChars = (str) => {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

const escapeHTML = (strings, ...values) => {
  return strings.reduce((result, str, i) => {
    const value = values[i - 1];
    if (typeof value === "string") {
      return result + escapeSpecialChars(value) + str;
    } else {
      return result + String(value) + str;
    }
  });
};
