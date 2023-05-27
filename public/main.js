let isInsertMode = false;

divDisp.onmouseup = () => {
  if (isInsertMode) {
    isInsertMode = false;
    return;
  }
  if ('none' === divArea.style.display) {
    divArea.style.display = 'block';
    divDisp.style.display = 'none';
  }
};
