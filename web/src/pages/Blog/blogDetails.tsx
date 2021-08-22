import React, { useEffect, useState } from "react";
import PageContainer from "../../components/common/pageContainer";
import { queryBlogDetail } from "../../Api/api";
import marked from "marked";
import toc from "markdown-toc-unlazy";
import ReactMarkdown from "react-markdown";
console.log(
  toc,
  "markdown-toc",
  toc("# One\n\n# Two"),
  marked("# One\n\n# Two")
);
function BlogDetails(props: any) {
  const [tocMenu, setTocMenu] = useState<any>([]);
  const [blogDetail, setBlogDetail] = useState<any>({});
  useEffect(() => {
    getBlogDetail();
  }, []);
  const getBlogDetail = async () => {
    const res = await queryBlogDetail({ id: props.match.params.id });
    setBlogDetail(res.data);
    console.log(toc(res.data.content));
    setTocMenu(toc(res.data.content).json);
  };
  return (
    <PageContainer imgUrl="http://mamba24.oss-cn-beijing.aliyuncs.com/thread_165428859290905_20190916090047_s_557402_o_w_1778_h_1000_17024.jpg">
      <div className="blog-content">
        {/* <div className='article-content'><ReactMarkdown >{blogDetail.content}</ReactMarkdown></div> */}
        <article
          className="article-content"
          dangerouslySetInnerHTML={{ __html: marked(blogDetail.content || "") }}
        />
        <div className="article-menu">
          {tocMenu.map((item: any) => (
            <div
              className="menu-item"
              title={item.content}
              style={{ textIndent: (item.lvl - 2) * 14 }}
              key={item.i}
            >
              <a href={`#${item.slug}`}>{item.content}</a>
            </div>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}

export default BlogDetails;
