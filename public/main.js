btnEdit.onclick = () => {
  modeSetEdit();
};
btnSend.onclick = () => {
  updateDivDisp();
  modeSetDisp();
};

const setStyleDisplayBulk = (elements, display) => {
  elements.forEach((element) => (element.style.display = display));
};
const setStyleDisplayBulkBlock = (elements) => setStyleDisplayBulk(elements, 'block');
const setStyleDisplayBulkNone = (elements) => setStyleDisplayBulk(elements, 'none');
const modeSetEdit = () => {
  setStyleDisplayBulkBlock([divArea, btnSend]);
  setStyleDisplayBulkNone([divDisp, btnEdit]);
};
const modeSetDisp = () => {
  setStyleDisplayBulkBlock([divDisp, btnEdit]);
  setStyleDisplayBulkNone([divArea, btnSend]);
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
  divDisp.innerHTML = a;
};

document.addEventListener('keydown', (event) => {
  if ('block' === btnSend.style.display) {
    /* 編集モード中に */
    if (event.ctrlKey && event.code === 'Enter') {
      /* ctlr+Enter が押された*/
      // 送信ボタン押下と同じ効果を発生させる
      btnSend.onclick();
    }
  }
});
