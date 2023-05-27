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
