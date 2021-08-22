import React, { FC, useEffect, useState } from "react";
import PageContainer from "../../components/common/pageContainer";
import MessageCard from "../../components/message/messageCard";
import CommentEditor from "../../components/message/commentEditor";
import InfiniteScrollContainer from "../../components/common/InfiniteScrollContainer";
import { queryMessage } from "../../Api/api";
import "./index.less";

const Message: FC = () => {
  const [messageList, setMessageList] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setHasMore(false);
    const res = await queryMessage();
    const parentComments = res.data.filter((r: any) => !r.parent);
    parentComments.forEach((c: any) => {
      return (c.comments = res.data.filter((v: any) => v.parent === c.id));
    });
    // @ts-ignore
    console.log(parentComments, "parentComments");
    res && setMessageList([...messageList, ...parentComments]);
    setHasMore(true);
  };
  // 下拉加载
  const loadMoreData = async () => {
    hasMore && fetchData();
  };
  return (
    <InfiniteScrollContainer loadMore={loadMoreData} hasMore={true}>
      <PageContainer
        pageStyle={{ height: "400px" }}
        content={
          <CommentEditor
            onSuccess={fetchData}
            commentStyle={{
              width: "60%",
              padding: "0 16px",
              backgroundColor: "#fff",
              position: "absolute",
              top: "60%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          />
        }
        imgUrl="http://mamba24.oss-cn-beijing.aliyuncs.com/thread_165428859290905_20190916090047_s_557402_o_w_1778_h_1000_17024.jpg"
      >
        {/* 下拉加载 */}

        <div className="message-max">
          <div className="messageLeft">
            {messageList.map(
              (item, index) =>
                index % 2 === 0 && (
                  <div className="messageAfter" key={index}>
                    <MessageCard comment={item} onFetchData={fetchData} />
                  </div>
                )
            )}
          </div>
          <div className="messageRight">
            {messageList.map(
              (item, index) =>
                index % 2 !== 0 && (
                  <div className="messageAfter" key={index}>
                    <MessageCard comment={item} onFetchData={fetchData} />
                  </div>
                )
            )}
          </div>
        </div>
        <div className="message-min">
          {messageList.map((item, index) => (
            <div className="messageAfter" key={index}>
              <MessageCard comment={item} onFetchData={fetchData} />
            </div>
          ))}
        </div>
      </PageContainer>
    </InfiniteScrollContainer>
  );
};
export default Message;
