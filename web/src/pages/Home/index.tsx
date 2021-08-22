import React, { FC, useState, useRef, useEffect } from "react";
// import logo from './logo.svg';
// import { Button } from 'antd';
import { PlayCircleOutlined, PauseCircleOutlined } from "@ant-design/icons";
// import enUS from 'antd/es/locale/en_US';
// import zhCN from 'antd/es/locale/zh_CN';
import Content from "../../components/home/content";

const Home: FC = (props) => {
  const videoRef = useRef<any>();
  const [isShow, setIsShow] = useState(false);
  const [isPlay, setIsPlay] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", scrollListener);
    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);
  const scrollListener = () => {
    let scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    setIsScrolling(scrollTop > 0);
  };
  const playVideo = (play: boolean) => {
    setIsShow(true);
    setIsPlay(play);
    console.log(videoRef, videoRef.current);
    videoRef.current && play
      ? videoRef.current.play()
      : videoRef.current.pause();
  };
  return (
    <div>
      <div>
        <div className="App">
          <div className="bg-img">
            <div className="gezi"></div>
          </div>
          <video
            className={isShow ? "showVideo" : "hideVideo"}
            // @ts-ignore
            ref={videoRef}
            // @ts-ignore
            // autoplay
            loop
            src="https://ugcws.video.gtimg.com/uwMROfz2r55kIaQXGdGnCmdeB3BXjdkX__DO7b4-Q6c0ZjWr/szg_29033208_50001_9a356c0f36724f02832bf0068c2266a6.f632.mp4?sdtfrom=v1010&guid=f9f7c020548fcf918546154ecb3e7ac1&vkey=212BE687684D6D033CE8FC78E4D3B59136518CF175A83671EBF62777FA01D8BB48AC15954FCADDD785BA358B514E65C1589E48501CEDB5D71D56A959ABF8006C2BAAF29C049E60381B919ECEE179E2FD62DCE924971279CE58A7273C63EF8E60B4EE2F2A6CAB63F0CD3FFFF236E34B15FFA3EEB1D7BF3D6A25B18A7D63B02FDADC6F8187EF64E6C9"
          ></video>
        </div>
        {/* <audio
        id="music"
        src="http://coco727.oss-cn-hongkong.aliyuncs.com/9dc2eeeabfa1faba5f865a43d3896288.mp3"
        loop
      ></audio> */}
        <div
          className="cd-top faa-float animated"
          style={{ top: isScrolling ? "-243px" : "-900px" }}
        />
        {isPlay ? (
          <PauseCircleOutlined
            onClick={() => playVideo(false)}
            className="playIcon"
          />
        ) : (
          <PlayCircleOutlined
            onClick={() => playVideo(true)}
            className="playIcon"
          />
        )}
      </div>
      <Content />
    </div>
  );
};

export default Home;
