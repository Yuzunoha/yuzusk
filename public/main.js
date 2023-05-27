btnEdit.onclick = () => {
  modeSetEdit();
};
btnSend.onclick = () => {
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
