import React, { FC, useEffect, useState } from "react";
import { List, Avatar, Space, Button, Skeleton } from "antd";
import { MessageOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";
import { queryBlogList } from "../../Api/api";
import { BlogScheme } from "../../types";
import "./content.less";

const IconText = (props: any) => (
  <Space>
    {React.createElement(props.icon)}
    {props.text}
  </Space>
);

const Content: FC = () => {
  const [blogList, setBlogList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    getBlogList();
  }, []);
  const getBlogList = async () => {
    const res = await queryBlogList();
    setBlogList([...blogList, ...res.data]);
    setLoading(false);
  };
  const onLoadMore = () => {
    setLoading(true);
    setBlogList(
      blogList.concat(
        [...new Array(3)].map(() => ({ loading: true, name: {} }))
      )
    );
    getBlogList();
  };
  const loadMore = !loading ? (
    <div
      style={{
        textAlign: "center",
        marginTop: 12,
        height: 32,
        lineHeight: "32px",
      }}
    >
      <Button onClick={onLoadMore}>loading more</Button>
    </div>
  ) : null;
  return (
    <div className="content-list">
      <List
        itemLayout="vertical"
        size="large"
        // loading={loading}
        loadMore={loadMore}
        dataSource={blogList}
        renderItem={(item, index) => (
          <List.Item
            style={index % 2 === 0 ? { flexDirection: "row-reverse" } : {}}
            key={item.id}
            actions={[
              <IconText
                icon={StarOutlined}
                text="156"
                key="list-vertical-star-o"
              />,
              <IconText
                icon={LikeOutlined}
                text="156"
                key="list-vertical-like-o"
              />,
              <IconText
                icon={MessageOutlined}
                text="2"
                key="list-vertical-message"
              />,
            ]}
            extra={
              <div style={{ overflow: "hidden" }}>
                {/* <img src={item.imgUrl} className="blogImg" alt="jpg" /> */}
                <div
                  style={{
                    width: "100%",
                    height: "300px",
                    background: `url(${item.imgUrl}) center center`,
                    backgroundSize: "cover",
                  }}
                  className="blogImg"
                />
              </div>
            }
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                title={<a href={item.imgUrl}>{item.title}</a>}
                description={item.createdAt}
              />
              {item.description}
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  );
};
export default Content;
