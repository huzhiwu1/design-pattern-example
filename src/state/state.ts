interface ICloudDocumentState{
  render(): void;
  write(text: string): void;
  accessPermission(): void;
}


class CloudDocument{
  state: ICloudDocumentState
  private text: string;

  constructor(text: string){
    this.text = text;
    this.state = new NotAllowView(this);
  }
  getText(){
    return this.text;
  }

  setText(text:string){
    this.text = text;
  }

  render(){
    this.state.render();
  }

  write(text: string){
    this.state.write(text);
  }

  changeState(state: ICloudDocumentState){
    this.state = state;
  }

  accessPermission() {
    this.state.accessPermission();
  }
}

class NotAllowView implements ICloudDocumentState{
  document: CloudDocument;

  constructor(doc: CloudDocument){
    this.document = doc;
  }

  accessPermission(): void {
    console.log('获取阅读权限');
    this.document.changeState(new AllowView(this.document))
  }
  
  render(): void {
    console.log('当前没有查看权限');
  }
  write(text: string): void {
    console.log('当前没有编辑权限');
  }

  
}

class AllowView implements ICloudDocumentState{
  document: CloudDocument;

  constructor(doc: CloudDocument){
    this.document = doc;
  }
  render(): void {
    console.log(`渲染文档: ${this.document.getText()}`)
  }
  write(text: string): void {
    console.log('当前没有编辑权限');
  }
  accessPermission(): void {
    console.log('获取编辑权限');
    this.document.changeState(new AllowEdit(this.document));
  }
  
}

class AllowEdit implements ICloudDocumentState{
  document: CloudDocument;
  constructor(doc: CloudDocument){
    this.document = doc;
  }

  render(): void {
    console.log(`渲染文档: ${this.document.getText()}`);
  }
  write(text: string): void {
   this.document.setText(text);
  }
  accessPermission(): void {
    console.log('已经是最高权限，无需获取权限');
  }
  
}

export function client(){
  const doc = new CloudDocument('测试文档a');
  doc.render();
  doc.write('abc');
  doc.accessPermission();
  doc.render();
  doc.write('123');
  doc.accessPermission();
  doc.render();
  doc.accessPermission();
  /**
   * 当前没有查看权限
   * 当前没有编辑权限 
   * 获取阅读权限
   * 渲染文档: 测试文档a
   * 当前没有编辑权限
   * 获取编辑权限
   * 渲染文档: 测试文档a
   * 已经是最高权限，无需获取权限
   */
}

client();