import React from "react";
interface PageContainerProps {
  imgUrl: string;
  content?: React.ReactNode;
  children: React.ReactNode;
  pageStyle?: React.CSSProperties;
}
function PageContainer(props: PageContainerProps) {
  const { imgUrl, content, children, pageStyle } = props;
  return (
    <div>
      <div
        style={{
          width: "100%",
          height: "300px",
          background: `url(${imgUrl}) 50% 30%`,
          backgroundSize: "cover",
          position: "relative",
          ...pageStyle,
        }}
      >
        {content}
      </div>
      <div style={{ backgroundColor: "#efefee", padding: "30px" }}>
        {children}
      </div>
    </div>
  );
}

export default PageContainer;
