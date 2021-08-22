import React from "react";
import { Typography } from "antd";
import PageContainer from "../../components/common/pageContainer";

const { Paragraph } = Typography;
function AboutParagraph(props: any) {
  return (
    <Paragraph
      ellipsis={
        {
          // rows: props.rows,
          // expandable: props.expandable,
        }
      }
      style={{
        overflow: "hidden",
        width: "300px",
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: 3,
        textOverflow: "ellipsis",
      }}
    >
      {props.content}
    </Paragraph>
  );
}
function AboutBlog() {
  return (
    <div>
      <PageContainer imgUrl="http://mamba24.oss-cn-beijing.aliyuncs.com/thread_165428859290905_20190916090047_s_557402_o_w_1778_h_1000_17024.jpg">
        <AboutParagraph
          rows={2}
          expandable
          content="To be, or not to be, that is a question: Whether it is nobler in the mind to suffer. The slings and arrows of outrageous fortune Or to take arms against a sea of troubles, And by opposing end them? To die: to sleep; No more; and by a sleep to say we end The heart-ache and the thousand natural shocks That flesh is heir to, 'tis a consummation Devoutly to be wish'd. To die, to sleep To sleep- perchance to dream: ay, there's the rub! For in that sleep of death what dreams may come When we have shuffled off this mortal coil, Must give us pause. There 's the respect That makes calamity of so long life'"
        />
      </PageContainer>
    </div>
  );
}

export default AboutBlog;
