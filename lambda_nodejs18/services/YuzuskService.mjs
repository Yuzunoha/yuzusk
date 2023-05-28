export class YuzuskService {
  constructor({ ddbDocClient, UpdateCommand, utilService }) {
    this.tableName = 'yuzusk';
    this.pertitionKey = 'yuzuskkey';
    this.ddbDocClient = ddbDocClient;
    this.UpdateCommand = UpdateCommand;
    this.utilService = utilService;
  }
  async update({ yuzuskkey, memo }) {
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
        ':jst': this.utilService.getJstStr(),
        ':memo': memo,
      },
      UpdateExpression: 'set #jst = :jst, #memo = :memo',
      // ConditionExpression: '#attr1 <> :value1',
    };
    await this.ddbDocClient.send(new this.UpdateCommand(params));
  }
}
