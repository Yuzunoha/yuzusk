let isInsertMode = false;

disp.onmouseup = () => {
  if (isInsertMode) {
    isInsertMode = false;
    return;
  }
  if ('none' === area.style.display) {
    area.style.display = 'block';
    disp.style.display = 'none';
  }
};
