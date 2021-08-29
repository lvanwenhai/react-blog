import React, { FC, useState, useRef, useEffect } from "react";
import {
  GithubOutlined,
  ZhihuOutlined,
  WeiboCircleOutlined,
  WechatOutlined,
  QqOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  DownOutlined,
  DoubleRightOutlined
} from "@ant-design/icons";
import Content from "../../components/home/content";
import BlogList from "../Blog/blogList";
import "./index.less";

const Home: FC = (props) => {
  const videoRef = useRef<any>();
  const [isShow, setIsShow] = useState(false);
  const [isPlay, setIsPlay] = useState(false);

  const playVideo = (play: boolean) => {
    setIsShow(true);
    setIsPlay(play);
    console.log(videoRef, videoRef.current);
    videoRef.current && play
      ? videoRef.current.play()
      : videoRef.current.pause();
  };
  const downPage = () => {
    // @ts-ignore
    $("html,body").animate({ scrollTop: $("#header").outerHeight() - 60 }, 500);
  };
  return (
    <div>
      <div id="header">
        <div className="bg-img">
          <video
            className={isShow ? "showVideo" : "hideVideo"}
            // @ts-ignore
            ref={videoRef}
            // @ts-ignore
            // autoplay
            loop
            src="https://mamba24.oss-cn-beijing.aliyuncs.com/szg_29033208_50001_9a356c0f36724f02832bf0068c2266a6.f632.mp4"
          ></video>
          <div className="App dot"></div>
        </div>
        {!isPlay && <div className="hello-slamdunk">
          <strong>Hello! SlamDunk</strong>
          <div className="contact-me">
            <GithubOutlined />
            <ZhihuOutlined />
            <WeiboCircleOutlined />
            <WechatOutlined />
            <QqOutlined />
          </div>
        </div>}
        <span className="arrow-down">
          <DoubleRightOutlined  className="double-right" onClick={downPage} />
        </span>
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
      <div className="content">
        <Content />
      </div>
      <div className="blogList">
        <BlogList />
      </div>
    </div>
  );
};

export default Home;
