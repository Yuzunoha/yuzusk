/**
 * 表示されるタイミング
 * divTop    topモード
 * divDisp   閲覧モード
 * divArea   編集モード
 */
const urlAws = 'https://6f7lnalfjbbh2ywq55vydlkgty0isvdg.lambda-url.ap-northeast-1.on.aws/';
const urlLocal = 'http://localhost:3000';

btnEdit.onclick = () => {
  modeSetEdit();
};
btnSend.onclick = () => {
  updateDivDisp();
  modeSetDisp();
  postData(urlLocal, {
    answer: 42,
    message: 'メッセージ',
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch(console.log);
};

const setStyleDisplayBulk = (elements, display) => {
  elements.forEach((element) => (element.style.display = display));
};
const setStyleDisplayBulkBlock = (elements) => setStyleDisplayBulk(elements, 'block');
const setStyleDisplayBulkNone = (elements) => setStyleDisplayBulk(elements, 'none');
const modeSetEdit = () => {
  setStyleDisplayBulkBlock([divArea]);
  setStyleDisplayBulkNone([divDisp, divTop]);
};
const modeSetDisp = () => {
  setStyleDisplayBulkBlock([divDisp]);
  setStyleDisplayBulkNone([divArea, divTop]);
};
const modeSetTop = () => {
  setStyleDisplayBulkBlock([divTop]);
  setStyleDisplayBulkNone([divDisp, divArea]);
};

/**
 * テキストエリアの中身をhtmlとして設定する関数
 */
const updateDivDisp = () => {
  const spaceN = (n) => {
    let s = '';
    for (let i = 0; i < n; i++) {
      s += '&nbsp';
    }
    return s;
  };
  const a = textarea1.value // テキストをHTMLに変換する
    .replace(/\n/g, '<br>') // 改行
    .replace(/ /g, spaceN(1)) // 半角スペース
    .replace(/\t/g, spaceN(8)); // タブ文字
  divDispText.innerHTML = a;
};

document.addEventListener('keydown', (event) => {
  if ('block' === divArea.style.display) {
    /* 編集モード中に */
    if (event.ctrlKey && event.code === 'Enter') {
      /* ctlr+Enter が押された*/
      // 送信ボタン押下と同じ効果を発生させる
      btnSend.onclick();
    }
  }
});

/**
 * POSTメソッドを投げる汎用関数
 */
function postData(url, data) {
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

/**
 * 初期化処理
 */
window.addEventListener('DOMContentLoaded', (event) => {
  // id取得
  const a = location.search.split('=');
  const id = a[a.length - 1].trim();
  /* idが */
  if (id) {
    /* ある */
    // 閲覧ページを表示する
    modeSetDisp();
  } else {
    /* ない */
    // トップページを表示する
    modeSetTop();
  }
});
