export class UtilService {
  /**
   * '2022/08/19 01:06:18 JST'
   */
  getJstStr() {
    const d = new Date(Date.now() + (new Date().getTimezoneOffset() + 9 * 60) * 60 * 1000);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const hours = d.getHours();
    const minutes = d.getMinutes();
    const seconds = d.getSeconds();
    let dateStr = '';
    dateStr += year + '/' + ('0' + month).slice(-2) + '/' + ('0' + day).slice(-2) + ' ';
    dateStr += ('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2);
    dateStr += ' JST';
    return dateStr;
  }
}
