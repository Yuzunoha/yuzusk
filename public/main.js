disp.onmouseup = () => {
  if (flg == '1') {
    flg = '0';
  } else {
    if (area.style.display == 'none') {
      area.style.display = 'block';
      disp.style.display = 'none';
    }
  }
};

let flg = '0';
function rep() {
  let txt = document.getElementById('disp').innerHTML;
  txt = txt.replace(
    /(http:\/\/[\x21-\x7e]+)/gi,
    '<a href="http://rd.nan7.net/$1" onmousedown="flg=' + "'1'" + ';" target="_blank">$1</a>'
  );
  txt = txt.replace(
    /(https:\/\/[\x21-\x7e]+)/gi,
    '<a href="http://rd.nan7.net/$1" onmousedown="flg=' + "'1'" + ';" target="_blank">$1</a>'
  );
  document.getElementById('disp').innerHTML = txt;
}
rep();
