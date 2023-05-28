/**
 * 表示されるタイミング
 * divTop    topモード
 * divDisp   閲覧モード
 * divArea   編集モード
 */
const urlAws = 'https://6f7lnalfjbbh2ywq55vydlkgty0isvdg.lambda-url.ap-northeast-1.on.aws/';
const urlLocal = 'http://localhost:3000';
const url = urlAws;
const p = console.log;

/**
 * urlからidを取得する関数
 */
const getIdByUrl = () => {
  const a = location.search.split('=');
  return a[a.length - 1].trim();
};

/**
 * POSTメソッドを投げる汎用関数
 */
const postData = (url, data) => {
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
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

btnEdit.onclick = () => {
  modeSetEdit();
};

btnSend.onclick = () => {
  const id = getIdByUrl();
  const memo = textarea1.value;
  updateDivDisp();
  modeSetDisp();
  postData(url, { id, memo }).then(p).catch(p);
};

btnSetup.onclick = () => {
  // リダイレクト
  const id = inputId.value;
  if (id) {
    location.href = '?id=' + id;
  }
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
 * 初期化処理
 */
window.addEventListener('DOMContentLoaded', (event) => {
  /* idが */
  const id = getIdByUrl();
  if (id) {
    /* ある */
    // textareaを更新する
    // { yuzuskkey: 'a', memo: 'ご自由にお使いください。', jst: '2023/05/29 01:06:58 JST' }
    fetch(url + '?id=' + id)
      .then((response) => response.json())
      .then(({ memo, jst }) => {
        // 表示を更新する
        textarea1.value = memo;
        divDate.innerHTML = jst;
        updateDivDisp();
        // 閲覧ページを表示する
        modeSetDisp();
      })
      .catch(p);
  } else {
    /* ない */
    // トップページを表示する
    modeSetTop();
  }
});
