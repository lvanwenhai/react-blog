import React from "react";
import InfiniteScroll from "react-infinite-scroller"; // 下拉加载
import { LoadingOutlined } from "@ant-design/icons";
import "./index.less";

interface InfiniteScrollProps {
  initialLoad?: boolean;
  pageStart?: number;
  useWindow?: boolean;
  threshold?: number;
  hasMore: boolean;
  loadMore: () => void;
  loader?: React.ReactNode;
  children: React.ReactNode;
}

function InfiniteScrollContainer(props: InfiniteScrollProps) {
  const {
    children,
    initialLoad = false,
    pageStart = 1,
    threshold = 10,
    useWindow = true,
    hasMore = false,
    loadMore,
    loader = (
      <div className="loader" key={0}>
        <LoadingOutlined />
        <div>Loading ...</div>
      </div>
    ),
  } = props;
  return (
    // <div className="infinite-scroll">
    <InfiniteScroll
      initialLoad={initialLoad} // 不让它进入直接加载
      pageStart={pageStart} // 设置初始化请求的页数
      useWindow={useWindow} // 不监听 window 滚动条
      threshold={threshold}
      hasMore={hasMore} // 是否继续监听滚动事件 true 监听 | false 不再监听
      loadMore={loadMore} // 监听的ajax请求
      loader={loader}
    >
      {children}
    </InfiniteScroll>
    // </div>
  );
}

export default InfiniteScrollContainer;
