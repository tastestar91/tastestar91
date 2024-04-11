// 5. 행동 패턴

// 책임 연쇄
// 명령
// 해석자
// 반복자
// 중재자
// 메멘토
// 감시자
// 상태
// 전략
// 템플릿 메소드
// 방문자

// (1) 책임 연쇄

// 메세지가 클래스에서 다른 클래스로 전달되는 접근 방식 기술
// export interface ComplaintListener{
//   IsAbleToResolveComplaint(complaint : Complaint) : Boolean;
//   ListenToComplaint (complaint : Complaint) : String;
// }

let Complaint = () => {
  function Complaint() {
    this.ComplainingParty = "";
    this.ComplaintAbout = "";
    this.Complaint = "";
  }
  return Complaint;
};

let ClerkOfTheCourt = (() => {
  function ClerkOfTheCourt() {}
  ClerkOfTheCourt.prototype.IsAbleToResolveComplaint = (complaint) => {
    return false;
  };
  ClerkOfTheCourt.prototype.ListenToComplaint = (complaint) => {
    return "";
  };
  return ClerkOfTheCourt;
})();

let King = (() => {
  function King() {}
  King.prototype.IsAbleToResolveComplaint = (complaint) => {
    return true;
  };
  King.prototype.ListenToComplaint = (complaint) => {
    return "";
  };
  return King;
})();

JudicialSystem.King = King;

let ComplaintResolve = (() => {
  function ComplaintResolve() {
    this.ComplaintListeners = new Array();
    this.ComplaintListeners.push(new ClerkOfTheCourt());
    this.ComplaintListeners.push(new King());
  }
  ComplaintResolve.prototype.ResolveComplaint = (complaint) => {
    for (let i = 0; i < this.ComplaintListeners.length; i++) {
      if (this.ComplaintListeners[i].IsAbleToResolveComplaint(complaint)) {
        return this.ComplaintListeners[i].ListenToComplaint(complaint);
      }
    }
  };
  return ComplaintResolve;
})();

// (2) 명령

//메소드의 매개변수와 객체의 현재 상태 모두를 캡슐화하고 메소드를 호출하는 방법

//먼저 명령을 실행하고 어떤 코드가 명령을 실행할지를 나중에 결정할 때까지 기다릴 수 있음

let BringTroopsCommand = () => {
  function BringTroopsCommand(location, numberOfTroops, when) {
    this._location = location;
    this._numberOfTroops = numberOfTroops;
    this._when = when;
  }
  BringTroopsCommand.prototype.Execute = () => {
    let receiver = new LordInstructions();
    receiver.BringTroops(this._location, this._numberOfTroops, this._when);
  };
  return BringTroopsCommand;
};

// A. 호출자
// 명령 패턴의 일부로 명령의 실행을 지시

// B. 수신자

// 클라이언트는 명령을 생성하고 호출자를 전달, 호출자는 명령을 지연시키거나 바로 실행하고, 명령은 수신자에서 실행됨

// (3) 해석자 Interpreter
// 자신만의 고유한 언어를 생성할 수 있게 해주는 재밌는 패턴
// 구현

let Parser = () => {
  function Parser(battleText) {
    this.battleText = battleText;
    this.currentIndex = 0;
    this.battleList = battleText.split("\n");
  }
  Parser.prototype.nextBattle = () => {
    if (!this.battleList[0]) {
      return null;
    }
    let segments = this.battleList[0];
  };
  return Parser;
};

// (4) 반복자

let KingSuccession = () => {
  function KingSuccession(inLineForThrone) {
    this.inLineForThrone = inLineForThrone;
    this.pointer = 0;
  }
  KingSuccession.prototype.next = () => {
    return this.inLineForThrone[this.pointer++];
  };
};
let king = new KingSuccession(["1", "2"]);

// 피보나치 수열 같은 무한 집합의 구성원을 순차 생성할 수 있음

// (5) 중재자

// 다양한 컴포넌트 중간에 위치하여 메세지의 경로 변경이 이루어지는 유일한 장소로 동작
// 코드를 유지하는데 필요한 복잡한 작업을 단순화

let Karstark = () => {
  function Karstark(greatLord) {
    this.greatLord = greatLord;
  }
  Karstark.prototype.receiveMessage = function (message) {};
  Karstark.prototype.sendMessage = function (message) {
    this.greatLord.routeMessage(message);
  };
  return Karstark;
};

let HouseStark = () => {
  function HouseStark() {
    this.karstark = new Karstark(this);
    this.bolton = new Bolton(this);
    this.umber = new Umber(this);
  }
  HouseStark.prototype.routeMessage = function (message) {};
  return HouseStark;
};

// (6) 메멘토

// 이전 상태로 객체의 상태를 복원할 수 있는 방법을 제공
// 변수의 이전 값에 대한 기록을 유지하고 복원하는 기능 제공

// 발신자 : 상태정보를 유지하고 새로운 메멘토를 생성하는 인터페이스 제공
// 관리자 : 패턴의 클라이언트, 새로운 메멘토를 요청하고 복원돼야하는 경우 이를 관리
// 메멘토 : 발신자의 저장된 상태의 표현, 롤백을 위해 스토리지에 저장해야하는 값

let WorldState = () => {
  function WorldState(numberOfKings, currentKinginKingLanding, season) {
    this.numberOfKings = numberOfKings;
    this.currentKinginKingLanding = currentKinginKingLanding;
    this.season = season;
  }
  return WorldState;
};
// 동일한 상태정보를 제공하고 메멘토의 생성 및 복구르르 가능하게 하는 클래스

let WorldStateProvider = () => {
  function WorldStateProvider() {}
  WorldStateProvider.prototype.saveMemento = () => {
    return new WorldState(this.numberOfKings, this.currentKinginKingLanding, this.season);
  };
  WorldStateProvider.prototype.restoreMemento = function (memento) {
    (this.numberOfKings = momento.numberOfKings), (this.currentKinginKingLanding = momento.currentKinginKingLanding);
    this.season = momento.season;
  };
  return WorldStateProvider;
};

let Soothsayer = () => {
  function Soothsayer() {
    this.startingPoints = [];
    this.currentState = new WorldStateProvider();
  }
  Soothsayer.prototype.setInitialConditions = function (numberOfKings, currentKinginKingLanding, season) {
    this.currentState.numberOfKings = numberOfKings;
    this.currentState.currentKinginKingLanding = currentKinginKingLanding;
    this.currentState.season = season;
  };
};
// 실행 취소 패턴

// (7) 감시자

// 가장 널리 사용되는 패턴 중 하나,

let GetterSetter = () => {
  function GetterSetter() {}
  GetterSetter.prototype.GetProperty = () => {
    return this._property;
  };
  GetterSetter.prototype.SetProperty = (value) => {
    let temp = this._property;
    this._property = value;
    this._listener.Event(value, temp);
    return (this._property = value);
  };
  return GetterSetter;
};

// settter 함수는 속성이 변경됐음을 리스너에게 통보, 이전값과 새로운 값이 모두 포함돼있음

let Spy = () => {
  function Spy() {
    this._partiesToNotify = [];
  }
  Spy.prototype.Subscribe = (subscriber) => {
    this._partiesToNotify.push(subscriber);
  };
  Spy.prototype.Unsubscribe = (subscriber) => {
    this._partiesToNotify.remove(subscriber);
  };
  Spy.prototype.SetPainKillers = (painKillers) => {
    this._painKillers = painKillers;
    for (let i = 0; i < this._partiesToNotify.length; i++) {
      this._partiesToNotify[i](painKillers);
    }
  };
  return Spy;
};

// (8) 상태

// if 문 블록 대신에 상태 패턴을 사용

let BankAccountManager = () => {
  function BankAccountManager() {
    this.currentState = new GoodStandingState(this);
  }
  BankAccountManager.prototype.Deposit = (amount) => {
    this.currentState.Deposit(amount);
  };
  BankAccountManager.prototype.Withdraw = (amount) => {
    this.currentState.Withdraw(amount);
  };

  BankAccountManager.prototype.AddToBalance = (amount) => {
    this.currentState.AddToBalance(amount);
  };

  BankAccountManager.prototype.getBalance = () => {
    return this.balance;
  };

  BankAccountManager.prototype.moveToState = (newState) => {
    this.currentState = newState;
  };
  return BankAccountManager;
};

// (9) 전략

// gps 칩, 휴대전화 삼각 측량, 인근 와이파이 포인트

let travelResult = () => {
  function travelResult(durationInDays, probabilityOfDeath, cost) {
    this.durationInDays = durationInDays;
    this.probabilityOfDeath = probabilityOfDeath;
    this.cost = cost;
  }
  return travelResult;
};
// 전략 선택 자동화할 수 있도록 위험 요소 예측하는 메소드 추가

let SeaGoingVessel = (() => {
  function SeaGoingVessel() {}
  SeaGoingVessel.prototype.Travel = (source, destination) => {
    return new travelResult(15, 0.25, 500);
  };
  return SeaGoingVessel;
})();

// (10) 템플릿 메소드

// 알고리즘 일부는 공유하고 일부분만 다른 방법으로 구현한느 접근 방식

let BasicBeer = () => {
  function BasicBeer() {}
  BasicBeer.prototype.Create = () => {
    this.AddIngredients();
    this.Stir();
    this.Ferment();
    this.Test();
    if (this.TestingPassed()) {
      this.Distribute();
    }
  };

  BasicBeer.prototype.AddIngredients = () => {
    throw "Add Ingredients";
  };

  BasicBeer.prototype.Stir = () => {};

  BasicBeer.prototype.Ferment = () => {};

  BasicBeer.prototype.Test = () => {};

  BasicBeer.prototype.AddIngredients = () => {
    throw "Add Ingredients";
  };
  return BasicBeer;
};

// (11) 방문자 패턴

// 알고리즘 객체의 구조와 분리하는 방법을 제공
// let Knight = (() => {
//   function Knight() {}
//   Knight.prototype.printName = () => {}
//   return Knight
// })

let Knight = (() => {
  function Knight() {
    this._type = "Knight";
  }
  Knight.prototype.printName = () => {};
  Knight.prototype.visit = (visitor) => {
    visitor.visit(this);
  };
  return Knight;
})();

let SelectiveNameVisitor = () => {
  function SelectiveNameVisitor() {}
  SelectiveNameVisitor.prototype.Visit = (memberOfArmy) => {};
  SelectiveNamePrinterVisitor.prototype.VisitKnight = (memberOfArmy) => {
    memberOfArmy.printName();
  };
};
