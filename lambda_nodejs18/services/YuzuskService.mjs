export class YuzuskService {
  constructor({ ddbDocClient, UpdateCommand, QueryCommand, utilService }) {
    this.tableName = 'yuzusk';
    this.pertitionKey = 'yuzuskkey';
    this.ddbDocClient = ddbDocClient;
    this.UpdateCommand = UpdateCommand;
    this.QueryCommand = QueryCommand;
    this.utilService = utilService;
  }

  /**
   * 上書きする
   */
  async update({ yuzuskkey, memo }) {
    const jst = this.utilService.getJstStr();
    const params = {
      TableName: this.tableName,
      Key: {
        [this.pertitionKey]: yuzuskkey,
      },
      ExpressionAttributeNames: {
        '#jst': 'jst',
        '#memo': 'memo',
      },
      ExpressionAttributeValues: {
        ':jst': jst,
        ':memo': memo,
      },
      UpdateExpression: 'set #jst = :jst, #memo = :memo',
    };
    await this.ddbDocClient.send(new this.UpdateCommand(params));
    return { jst };
  }

  /**
   * @returns {
   *   yuzuskkey: 'パーティションキー1',
   *   memo: 'メモ1です。',
   *   jst: '2023/05/28 19:38:50 JST'
   * }
   */
  async selectItem({ yuzuskkey }) {
    const params = {
      TableName: this.tableName,
      ExpressionAttributeNames: {
        '#yuzuskkey': 'yuzuskkey',
      },
      ExpressionAttributeValues: {
        ':yuzuskkey': yuzuskkey,
      },
      KeyConditionExpression: '#yuzuskkey = :yuzuskkey',
    };
    const ret = await this.ddbDocClient.send(new this.QueryCommand(params));
    return ret.Items[0];
  }
}
