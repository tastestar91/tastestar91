// 4 구조 패턴
// 객체들이 상호 작용할 수 있는 패턴

// 적응자 Adapter
// 가교 Bridge
// 복합체 Composite
// 장식자 Decorator
// 퍼사드 Facade
// 플라이급
// 프록시

// 1. 적응자 Adapter

//

let ShipAdapter = () => {
  const ShipAdapter = () => {
    this._ship = new Ship();
  };
  ShipAdapter.prototype.TurnLeft = () => {
    this._ship.SetRudderAngleTo(-30);
    this._ship.SetSailAngle(3, 12);
  };
  ShipAdapter.prototype.TurnRight = () => {
    this._ship.SetRudderAngleTo(30);
    this._ship.SetSailAngle(5, -9);
  };
  ShipAdapter.prototype.GoForward = () => {};
  return ShipAdapter;
};

let ship = new ShipAdapter();
ship.GoForward();
ship.TurnLeft();

// 단일 책임 원칙 잘 따르고 있는 지 확인

// 2. 가교 Bridge

// 적응자 패턴을 새로운 수준으로 만듬
// implementation , interface 사이에 위치해 인터페이스에 맞게 수정

let OldGods = (() => {
  function OldGods() {}
  OldGods.prototype.prayTo = (sacrifice) => {
    console.log("we old gods hear");
  };
  return OldGods;
})();
Religion.OldGods = OldGods;

let DrownedGods = (() => {
  function DrownedGods() {}
  DrownedGods.prototype.prayTo = (humanSacrifice) => {
    console.log("we old gods hear");
  };
  return DrownedGods;
})();
Religion.DrownedGods = DrownedGods;

let SevenGods = (() => {
  function SevenGods() {}
  SevenGods.prototype.prayTo = (sacrifice) => {
    console.log("we old gods hear");
  };
  return SevenGods;
})();
Religion.SevenGods = SevenGods;

let OldGodsAdapter = (() => {
  function OldGodsAdapter() {
    this._oldGods = new OldGods();
  }
  OldGodsAdapter.prototype.prayTo = () => {
    let sacrifice = new Sacrifice();
    this._oldGods.prayTo(sacrifice);
  };
  return OldGodsAdapter;
})();
Religion.OldGodsAdapter = OldGodsAdapter;

let DrownedGodsAdapter = (() => {
  function DrownedGodsAdapter() {
    this._drownedGodsAdapter = new DrownedGodsAdapter();
  }
  DrownedGodsAdapter.prototype.prayTo = () => {
    let sacrifice = new HumanSacrifice();
    this._drownedGod.prayTo(sacrifice);
  };
  return DrownedGodsAdapter;
})();
Religion.DrownedGodsAdapter = DrownedGodsAdapter;

let SevenGodsAdapter = (() => {
  function SevenGodsAdapter() {
    this.prayerPurposeProvider = new PrayerPurposeProvider();
    this._sevenGods = new SevenGods();
  }
  SevenGodsAdapter.prototype.prayTo = () => {
    this._sevenGods.prayTo(this.prayerPurposeProvider);
  };
  return SevenGodsAdapter;
})();
Religion.SevenGodsAdapter = SevenGodsAdapter;

let god1 = new Religion.SevenGodsAdapter();

let god2 = new Religion.DrownedGodAdapter();

let god3 = new Religion.OldGodsAdapter();

// 적응자는 여러 객체를 매핑할 수 있음

// 3. 복합체

let simpleIngredient = (() => {
  function simpleIngredient(name, calories, ironContent, vitaminCContent) {
    this.name = name;
    this.calories = calories;
    this.ironContent = ironContent;
    this.vitaminCContent = vitaminCContent;
  }
  simpleIngredient.prototype.GetName = () => {
    return this.name;
  };
  simpleIngredient.prototype.GetCalories = () => {
    return this.calories;
  };
  simpleIngredient.prototype.GetIronContent = () => {
    return this.ironContent;
  };
  simpleIngredient.prototype.GetVitaminCContent = () => {
    return this.vitaminCContent;
  };
  return simpleIngredient;
})();

let CompoundIngredient = (() => {
  function CompoundIngredient(name) {
    this.name = name;
    this.ingredients = new Array();
  }
  CompoundIngredient.prototype.AddIngredient = (ingredients) => {
    this.ingredients.push(ingredients);
  };
  CompoundIngredient.prototype.GetCalories = () => {
    let total = 0;
    for (let i = 0; i < this.ingredients.length; i++) {
      total += this.ingredients[i].GetCalories();
    }
    return total;
  };
  CompoundIngredient.prototype.GetIronContent = () => {
    let total = 0;
    for (let i = 0; i < this.ingredients.length; i++) {
      total += this.ingredients[i].GetIronContent();
    }
    return total;
  };
  CompoundIngredient.prototype.GetVitaminCContent = () => {
    let total = 0;
    for (let i = 0; i < this.ingredients.length; i++) {
      total += this.ingredients[i].GetVitaminCContent();
    }
    return total;
  };
})();

let ricePudding = new CompoundIngredient("RicePudding");
ricePudding.AddIngredient(egg);

// 4. 장식자 decoratir

// 기존 컴포넌트의 서브클래싱의 대안으로 쓰임

let BasicArmor = (() => {
  function BasicArmor() {}
  BasicArmor.prototype.CalculateDamageFromHit = (hit) => {
    return 1;
  };
  BasicArmor.prototype.GetArmorIntegrity = () => {
    return 1;
  };
  return BasicArmor;
})();

let ChainMall = (() => {
  function ChainMall(decoratedArmor) {
    this.decoratedArmor = decoratedArmor;
  }
  ChainMall.prototype.CalculateDamageFromHit = (hit) => {
    hit.Strength = this.Strength * 0.8;
    return this.decoratedArmor.CalculateDamageFromHit(hit);
  };
  ChainMall.prototype.GetArmorIntegrity = () => {
    return 0.9 * this.decoratedArmor.GetArmorIntegrity();
  };
  return ChainMall;
})();
let armor = new ChainMall(new BasicArmor());

// 5. 퍼사드 facade

let Shipm = (() => {
  Shipm.prototype.TurnLeft = () => {};
  Shipm.prototype.TurnRight = () => {};
  Shipm.prototype.GoForward = () => {};
  return Shipm;
})();
Transportation.Shipm = Shipm;

let Admiral = (() => {
  function Admiral() {}
  return Admiral;
})();

Transportation.Admiral = Admiral;

let Fleet = () => {
  // 퍼사드 생성
  function Fleet() {}
  Fleet.prototype.setDestination = (desination) => {};
  Fleet.prototype.resupply = () => {};
  Fleet.prototype.attack = (desination) => {};
  return Fleet;
};

// 6. 플라이급

// 각 인스턴스에서 프로토타입의 다른 값들만 관리함으로, 데이터를 압축할 수 있는 방법 제공

// let Soldier = (() => {
//     function Soldier() {
//         this.Health = 10;
//         this.FlightingAbility =5;
//         this.Hunger = 0;
//     }
//     return Soldier
// })()

let Soldier = (() => {
  function Soldier() {
    Soldier.prototype.Health = 10;
    Soldier.prototype.FightingAbility = 5;
    Soldier.prototype.Hunger = 0;
  }
  return Soldier;
})();

// 7. 프록시

// 고가 객체의 지연 인스턴스 생성
// 비밀 데이터 보호
// 원격 메소드 호출 스터빙
// 메소드 호출 전후에 추가 작업을 삽입

let BarrelCalculator = () => {
  function BarrelCalculator() {}
  BarrelCalculator.prototype.calculateNumberNeeded = (volume) => {
    return Math.ceil(volume / 357);
  };
  return BarrelCalculator;
};

let DragonBarrelCalculator = () => {
  function DragonBarrelCalculator() {}
  DragonBarrelCalculator.prototype.calculateNumberNeeded = (volume) => {
    if ((this._barrelCalculator = null)) this._barrelCalculator = new BarrelCalculator();
    return this._barrelCalculator / calculateNumberNeeded;
  };
  return DragonBarrelCalculator;
};
