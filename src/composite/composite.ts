abstract class Component{
  parent?: Component;

  setParent(comp: Component){
    this.parent = comp;
  }

  public addComponent(comp: Component){
    throw new Error('需要子类自己实现');
  }

  public remoeComponent(comp: Component){
    throw new Error('需要子类自己实现');
  }

  abstract getSize():number;

  public isComposite():boolean{
    return false;
  }
}

class FileComponent extends Component{
  size:number
  constructor(size: number){
    super();
    this.size = size;
  };
  getSize(): number {
    return this.size;
  }
}

class Folder extends Component{
  children: Component[] = [];

  addComponent(comp: Component){
    this.children.push(comp);
    comp.setParent(this);
  }

  remoeComponent(comp: Component){
    this.children = this.children.filter(child => child!==comp);
  }

  isComposite(){
    return true;
  }

  getSize(): number {
    return this.children.reduce((pre,cur)=>{
      return pre + cur.getSize();
    },0)
  }
  
}

export function client(){
  const file1 = new FileComponent(12);
  const file2 = new FileComponent(2);
  const file3 = new FileComponent(7);
  const folder1 = new Folder();
  folder1.addComponent(file1);
  folder1.addComponent(file2);
  folder1.addComponent(file3)
  const folder2 = new Folder();
  const file4 = new FileComponent(7);
  const file5 = new FileComponent(9);
  const file6 = new FileComponent(3);
  folder2.addComponent(file4);
  folder2.addComponent(file5);
  folder2.addComponent(file6);
  folder2.addComponent(folder1);
  console.log(`folder2的大小：${folder2.getSize()}`)
}
client();