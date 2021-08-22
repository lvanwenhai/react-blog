import React, { Component } from "react";
import Masonry from "masonry-layout"; //实现瀑布流
import imagesloaded from "imagesloaded"; //监听图片加载
import InfiniteScrollContainer from "../../components/common/InfiniteScrollContainer"; //下拉加载
import PageContainer from "../../components/common/pageContainer";

import { queryBlogList } from "../../Api/api";
import { EyeOutlined } from "@ant-design/icons";
import "./index.less";
interface BlogListProps {
  history?: any;
}
interface BlogListState {
  data: any[];
  hasMore: boolean;
}

export default class BlogList extends Component<BlogListProps, BlogListState> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
      hasMore: true, // 是否开启下拉加载
    };
  }
  componentDidMount() {
    this.fetchData();
    this.imagesOnload();
  }
  //图片懒加载
  imagesOnload = () => {
    const elLoad = imagesloaded(".pages_hoc"); //获取下拉加载里面的第一个盒子
    //always 图片已全部加载，或被确认加载失败
    elLoad.on("always", () => {
      // 调用瀑布流
      this.advanceWidth();
    });
  };

  //瀑布流
  advanceWidth = () => {
    var elem = document.querySelector(".pages_hoc");
    // @ts-ignore

    new Masonry(elem, {
      itemSelector: ".imgBox", //要布局的网格元素
      columnWidth: ".imgBox", //自适应
      fitWidth: true, // 设置网格容器宽度等于网格宽度
      gutter: 20,
    });
  };
  fetchData = () => {
    this.setState(
      {
        hasMore: false,
      },
      async () => {
        const { data } = this.state;
        const res = await queryBlogList();
        console.log(res);
        this.setState(
          {
            hasMore: true,
            data: [...data, ...res.data], //拼接每次加载的数据 arr是我自定义的数据
          },
          () => {
            this.imagesOnload(); // 每次获取完数据 触发
          }
        );
      }
    );
  };
  // 下拉加载
  loadMoreData = async () => {
    const { hasMore } = this.state;
    hasMore && this.fetchData();
  };

  render() {
    const { data, hasMore } = this.state;

    return (
      <InfiniteScrollContainer loadMore={this.loadMoreData} hasMore={true}>
        <PageContainer imgUrl="http://mamba24.oss-cn-beijing.aliyuncs.com/thread_165428859290905_20190916090047_s_557402_o_w_1778_h_1000_17024.jpg">
          <div className="pages_hoc">
            {data.map((item: any, index) => (
              <div
                key={index}
                className="imgBox"
                onClick={() => this.props.history.push(`/blogs/${item.id}`)}
              >
                <img src={item.imgUrl} alt="error" />
                <div style={{ backgroundColor: "#fff", padding: "15px" }}>
                  <h3 style={{ textAlign: "center" }}>{item.title}</h3>
                  <div style={{ textIndent: "2em", color: "#989898" }}>
                    {item.description}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>{item.createdAt.substr(0, 10)}</div>
                    <div>
                      <EyeOutlined />
                      {100}
                      <EyeOutlined />
                      {100}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </PageContainer>
      </InfiniteScrollContainer>
    );
  }
}
