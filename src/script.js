const keySfxs = {
  0: "../public/audio/FX_piano01.mp3",
};

const getCode = (index)=>{
      const codes = ['c','d','e','f','g','a','b'];
      switch(index){
            case 0: return 'c';
            case 1: return 'd';
            case 2: return 'e';
            case 3: return 'f';
            case 4: return 'g';
            case 5: return 'a';
            case 6: return 'b';
      }
      return -1;
}

const GetKeyboardManager = () => {
  const sfxBaseSrc = `../public/audio/`;
  // a~l 키보드 개수만큼 음을 넣쟈.
  const sfxs = [
    "FX_piano01.mp3",
    "FX_piano02.mp3",
    "FX_piano03.mp3",
    "FX_piano04.mp3",
    "FX_piano05.mp3",
    "FX_piano06.mp3",
    "FX_piano07.mp3",
    "FX_piano08.mp3",
    "FX_piano09.mp3",
    "FX_piano10.mp3",
    "FX_piano11.mp3",
    "FX_piano12.mp3",
    "FX_piano13.mp3",
  ];

 
  const getSfxPath = (idx) => sfxBaseSrc.concat(sfxs[idx]);
  // 이벤트를 기록하자.
  const events = [];

  let isRecord = false;

  // initialize start time
  let startTime = new Date();
  startTime.setHours(0, 0, 0, 0);

  const keyEventSample = {
    keyIndex: 0,
    time: 0,
  };

  const playKeyboardSfx = (index) => {
    //sound play
    const audio = new Audio(getSfxPath(index));
    audio.play();
    if (isRecord) {
      const current = new Date();
      keyEventSample = [
        ...keyEventSample,
        {
          keyIndex: index,
          time: current - startTime,
        },
      ];
    }
  };
  const stopRecord = () => {
    isRecord = false;
    startTime.setHours(0, 0, 0, 0);
    const newEvents = [...events];
    clearRecord();
    return newEvents;
  };

  const startRecord = () => {
    isRecord = true;
    startTime = new Date();
  };
  const clearRecord = () => {
    events = [];
  };

  return {
    //피아노 재생
    playKeyboardSfx: playKeyboardSfx,
    // 녹음시작
    startRecord,
    // 녹음종료
    stopRecord,
    // 녹음초기화
    clearRecord,
  };
};

const keyboardManager = GetKeyboardManager();
const keys = document.querySelectorAll(".key");
const keyWrap = document.querySelector(".keyWrap");
const blackKeyWrap = document.querySelector(".black-key-wrap");

const initialize = () => {
  const onClickKey = (e, i) => {
    e.stopPropagation();
    console.log("handle");
    keyboardManager.playKeyboardSfx(i);
  };
  const createBlackNote = () => {
    const key = document.createElement("div");
    key.className = "black-key";
    blackKeyWrap.appendChild(key);
    key.addEventListener("click", (e) => onClickKey(e, i));
  };

  const createOpacitySpace = () => {
    const emptyObject = document.createElement("div");
    emptyObject.className = "opacity-space";
    blackKeyWrap.appendChild(emptyObject);
  };

  let state = 0;
  let sum = 0; 
  for (let i = 0; i < 14; i++) {  
    const currentCodeIndex = i % 7 == 0 ? 0 : i % 7;  
    const key = document.createElement("div");
    const code = getCode(i);
    key.className = "key";
    keyWrap.appendChild(key);

    key.addEventListener("click", (e) => onClickKey(e, i)); 
    if (currentCodeIndex === 0 || currentCodeIndex === 1) { 
      createBlackNote(); 
      continue;
    }
    else if (currentCodeIndex === 2) {
      createOpacitySpace(); 
      continue;
    }
    else if (currentCodeIndex === 3 || currentCodeIndex === 4 || currentCodeIndex === 5) {
      createBlackNote();   
    }
    else if (currentCodeIndex === 6){
      createOpacitySpace();  
       continue;
    }
  }

  console.log("initialized");
};

initialize();
