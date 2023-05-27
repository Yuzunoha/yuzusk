btnEdit.onclick = () => {
  modeSetEdit();
};
btnSend.onclick = () => {
  modeSetDisp();
};

const modeSetEdit = () => {
  divArea.style.display = 'block';
  divDisp.style.display = 'none';
};
const modeSetDisp = () => {
  divArea.style.display = 'none';
  divDisp.style.display = 'block';
};
