/*  判断数据类型
------------------------------------------------ */
class JudgeDataType {
  private types = [
    'Null',
    'Undefined',
    'Object',
    'Array',
    'String',
    'Number',
    'Boolean',
    'Function',
    'RegExp'
  ] as const;
  private getType(o: any) {
    const str = Object.prototype.toString.call(o);
    return str.match(/\[object (.*?)\]/)![1].toLocaleLowerCase();
  }
  public judgeType(o: any, type: typeof this.types[number]) {
    return type.toLowerCase() === this.getType(o);
  }
}

export default JudgeDataType;
