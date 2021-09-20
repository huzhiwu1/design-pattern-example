abstract class Dialog{
  public render(){
    const button = this.createButton();
    button.render();
    button.onClick();
  }
  abstract createButton():IButton
}
interface IButton{
  render(): void;
  onClick(): void;
}

class WindowButton implements IButton{
  render(): void {
    console.log('我是window的按钮');
  }
  onClick(): void {
    console.log('window按钮被点击');
  }
  
}

class WindowDialog extends Dialog{
  createButton(): IButton {
    return new WindowButton()
  }
}

class MacButton implements IButton{
  render(): void {
    console.log('我是mac的按钮');
  }
  onClick(): void {
    console.log('mac按钮被点击');
  }
  
}

class MacDialog extends Dialog{
  createButton(): IButton {
    return new MacButton
  }
}

function client(){
  const macDialog = new MacDialog();
  macDialog.render();
  const windowDialog = new WindowDialog();
  windowDialog.render()
}

client();