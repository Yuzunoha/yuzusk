disp.onmouseup = () => {
  if (flg == '1') {
    flg = '0';
  } else {
    if (document.getElementById('area').style.display == 'none') {
      document.getElementById('area').style.display = 'block';
      document.getElementById('disp').style.display = 'none';
    }
  }
};

var flg = '0';
imobile_pid = '21522';
imobile_asid = '1078121';
imobile_width = 468;
imobile_height = 60;
function rep() {
  var txt = document.getElementById('disp').innerHTML;
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
