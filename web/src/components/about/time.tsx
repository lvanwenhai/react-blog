import React from "react";
import "./time.less";

function Time() {
  return (
    <>
      <div className="timeContainer">
        <div className="timeContent time-box">
          <div className="timeItem">
            <div className="timeNum">121</div>天
          </div>
          <div className="timeItem">
            <div className="timeNum">12</div>时
          </div>
          <div className="timeItem">
            <div className="timeNum">12</div>分
          </div>
          <div className="timeItem">
            <div className="timeNum">12</div>秒
          </div>
        </div>
      </div>
      <p className="text-center">从2020年3月5日00:00开始</p>
    </>
  );
}

export default Time;
