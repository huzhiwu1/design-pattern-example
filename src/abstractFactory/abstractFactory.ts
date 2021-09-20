abstract class FurnitureFactory{
  abstract createChair(): IChair;
  abstract createCoffeeTable(): ICoffeeTable;
  abstract createSofa(): ISofa;
}

interface IChair{
  render(): void,
  sitOn(): void
}

interface ICoffeeTable{
  render(): void;
  place(): void;
}

interface ISofa{
  render(): void;
  lieOn(): void;
}

class ModernChair implements IChair{
  render(): void {
    console.log('我是现代装修风格的椅子');
  }
  sitOn(): void {
    console.log('坐在现代装修风格的椅子上');
  }
  
}

class ModernCoffeeTable implements ICoffeeTable{
  render(): void {
    console.log('我是现代装修风格的咖啡桌');
  }
  place(): void {
    console.log('放咖啡机在现代装修风格的咖啡桌子上');
  }

}

class ModernSofa implements ISofa{
  render(): void {
    console.log('我是现代装修风格的沙发');
  }
  lieOn(): void {
    console.log('躺在现代装修风格的沙发上');
  }
  
}
class ModernFurniture extends FurnitureFactory{
  createSofa(): ISofa {
    return new ModernSofa();
  }
  createChair(): IChair {
    return new ModernChair();
  }
  createCoffeeTable(): ICoffeeTable {
    return new ModernCoffeeTable();
  }
  
}

class VictorianChair implements IChair{
  render(): void {
    console.log('我是维多利亚风格的椅子');
  }
  sitOn(): void {
    console.log('坐在维多利亚风格的椅子上');
  }
  
}

class VictorianCoffeeTable implements ICoffeeTable{
  render(): void {
    console.log('我是维多利亚风格的咖啡桌');
  }
  place(): void {
    console.log('放咖啡机在维多利亚风格的咖啡桌子上');
  }

}

class VictorianSofa implements ISofa{
  render(): void {
    console.log('我是维多利亚风格的沙发');
  }
  lieOn(): void {
    console.log('躺在维多利亚风格的沙发上');
  }
  
}

class VictorianFurniture extends FurnitureFactory{
  createChair(): IChair {
    return new VictorianChair();
  }
  createCoffeeTable(): ICoffeeTable {
    return new VictorianCoffeeTable();
  }
  createSofa(): ISofa {
    return new VictorianSofa();
  }
  
}

export function client(){
  const victorianFurniture = new VictorianFurniture();
  const chair = victorianFurniture.createChair();
  chair.render();
  chair.sitOn();

}

client();