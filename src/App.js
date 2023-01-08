import { useState, useEffect} from 'react';

import logo from './assets/images/logo_2023WC.png';
import img from './assets/images/img_calendar.png';
import logoMWN from './assets/images/logo_MWN.png';
import logoJA from './assets/images/logo_JA.png';
import './App.css';

function Step({num,content,isReached}){
  const style = isReached?"active":""
  return(
    <div className="step">
      <p4 className={style}>{num}本</p4>
      <p5 className={style}>{content}</p5>
      <span className={`rectangle ${style}`}></span>
    </div>
  )
}

function Bar({soldNum,start,end,halfWidth}){
  let wrapperClass;
  if(halfWidth===true){
    wrapperClass = "width50"
  }else{
    wrapperClass = "width100"
  }

  if(soldNum>start){
      const barLength = Math.floor((soldNum-start)/(end-start)*100)
      if(soldNum>=end){
        return(
          <div className={`bar-wrapper ${wrapperClass}`}>
            <span className="bar-bg"></span>
            <span 
              className="bar-completed" 
              style={{width:'100%'}}
            >
            </span>
          </div>
        )
      }
    return(
      <div className={`bar-wrapper ${wrapperClass}`}>
        <span className="bar-bg"></span>
        <span 
          className="bar-completed" 
          style={{width:`${barLength}%`}}
        >
        </span>
      </div>
    )
  }else{
    return(  
      <div className={`bar-wrapper ${wrapperClass}`}>
        <span className="bar-bg"></span>
      </div>
    )
  }
}

function useCountdown(targetDate){
  const countDownDate = new Date(targetDate).getTime();

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return getReturnValues(countDown);
};

function getReturnValues(countDown){
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [days, hours, minutes, seconds];
};

function CountdownTimer({ targetDate }){   
  const [days, hours, minutes, seconds] = useCountdown(targetDate)
  const displayData = (data) => {
    let result = data
    if(data.toString().length<2){
      result = '0'+ data
    }
    return result
  }
    return (
      <>
        <div className="time">
          <p8>{displayData(days)}</p8>
          <p className="label">DAYS</p>
        </div>
        <p8>:</p8>
        <div className="time">
          <p8>{displayData(hours)}</p8>
          <p className="label">HOURS</p>
        </div>
        <p8>:</p8>
        <div className="time">
          <p8>{displayData(minutes)}</p8>
          <p className="label">MINS</p>
        </div>
        <p8>:</p8>
        <div className="time">
          <p8>{displayData(seconds)}</p8>
          <p className="label">SECS</p>
        </div>
      </>
    );
};




function App() {
  const [soldNum, setSoldNum] = useState(0)
  const soldData = 15000
  const countdownData = (7 * 24 * 60 * 60 * 1000 )-1000;
  const dateTimeAfterCountdown = countdownData + new Date().getTime()
  
    if(soldNum-40 <= soldData){
      setTimeout(() => {
        if(soldNum<soldData-1000){
          setSoldNum(soldNum+Math.floor(Math.random()*1000))
        }else if(soldNum<soldData-400){
          setSoldNum(soldNum+Math.floor(Math.random()*150));
        }else if(soldNum<soldData-40){
          setSoldNum(soldNum+Math.floor(Math.random()*30));
        }else if(soldNum<soldData-15){
          setSoldNum(soldNum+Math.floor(Math.random()*7));
        }else if(soldNum < soldData){
           setSoldNum(soldNum+1);
           if(soldNum === soldData)return
        }
      }, 100);
    }
    
  const donateNum = Math.floor(soldNum/50)

  

  return (
    <div className="App">
      
      <header className="App-header">
        <div className="link"></div>
        <img src={logo} className="App-logo" alt="logo"></img>
        <div className="link"></div>
      </header>
      <body>
        <div className="img-container">
          <img src={img} className="img-calendar" alt="calendar"></img>
        </div>
        <div className="title">
          <h1>一天一曆</h1>
          <h1>給你<span className="title-marker">後疫情時代</span>的</h1>
          <h1>超強免疫曆</h1>
        </div>
        <div className="link-all"></div>
        <div className="content-container">
          <div className="content-wrapper">
            <div className="content" id="st">
              <p1>已售出</p1>
              <p2>{soldNum}</p2>
              <p1>本國際觀察曆</p1>
            </div>
            <div className="content" id="nd">
              <p1>已經公益捐贈</p1>
              <p2 id="clr-y">{donateNum}</p2>
              <p1>本國際觀察曆</p1>
            </div>
          </div>
          <div className="co-branding-container">
            <div className="co-branding-logo">
              <img src={logoMWN} className="MWN-logo" alt="logo"></img>
              <div className="co-branding">X</div>
              <img src={logoJA} className="JA-logo" alt="logo"></img>
            </div>
            <div className="co-branding-introduce">
              <p3>敏迪選讀™ 攜手 均一平台教育基金會 關注偏鄉失學的問題！每售出 50 本國際觀察曆，我們就捐出 1 本贈予偏鄉師生，一起點亮孩子的知識黑夜。</p3>
            </div>
          </div>
        </div>
        <div className="link-all"></div>
        <div className="steps">
          <div class="steps-container">
            
            {/* <div className="step">
              <p4 id="active">10,000本</p4>
              <p5 id="active">解鎖 2 部經典電影 10,000 組 Giloo 體驗序號</p5>
              <span className="rectangle"></span>
            </div> */}
            <Step
              num={10000}
              content="解鎖 2 部經典電影 10,000 組 Giloo 體驗序號"
              isReached={soldNum>=10000}
            />
            {/* <div className="step">
              <p4>15,000本</p4>
              <p5>解鎖 4 部經典電影 15,000 組 Giloo 體驗序號</p5>
              <span className="rectangle"></span>
            </div> */}
            <Step
              num={15000}
              content="解鎖 4 部經典電影 15,000 組 Giloo 體驗序號"
              isReached={soldNum>=15000}
            />
            
            {/* <div className="step">
              <p4>20,000本</p4>
              <p5>解鎖 6 部經典電影 20,000 組 Giloo 體驗序號</p5>
              <span className="rectangle"></span>
            </div>  */}
            <Step
              num={20000}
              content="解鎖 6 部經典電影 20,000 組 Giloo 體驗序號"
              isReached={soldNum>=20000}
            />
            
          </div>
          <div className="bars-container">
            <Bar
              soldNum={soldNum}
              start={0}
              end={10000}
              halfWidth={true}
            />
            <Bar
              soldNum={soldNum}
              start={10000}
              end={15000}
              halfWidth={false}
            />
            <Bar
              soldNum={soldNum}
              start={15000}
              end={20000}
              halfWidth={false}
            />
            <Bar
              soldNum={soldNum}
              start={20000}
              end={30000}
              halfWidth={true}
            />
          </div>
        </div>
        
        <div className="slogan-container">
          <div className="slogan-left">
            <p7>Super<span id="label">超早鳥</span></p7>
            <p7>Early Bird</p7>
          </div>
          <div className="slogan-link"></div>
          <div className="slogan-right">
            <p1 className="slogan-title">集資預購計畫倒數中</p1>
            <p3 className="slogan-content">現在預購 12 月前出貨，準時展開你的 2023 國際探索。</p3>
          </div>
        </div>
        <div className="timer-container">
          <div className="timer">
            <CountdownTimer targetDate={dateTimeAfterCountdown}/>
          </div>
        </div>
      </body >
    </div>
  );
}

export default App;