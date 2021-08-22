import React, { useEffect } from "react";
import * as echarts from "echarts/core";
import PageContainer from "../../components/common/pageContainer";
import { queryStatistics } from "../../Api/api";

import {
  BarChart,
  // 系列类型的定义后缀都为 SeriesOption
  BarSeriesOption,
  LineChart,
  LineSeriesOption,
} from "echarts/charts";
import {
  TitleComponent,
  // 组件类型的定义后缀都为 ComponentOption
  TitleComponentOption,
  GridComponent,
  GridComponentOption,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import Time from "../../components/about/time";
// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | GridComponentOption
>;

// 注册必须的组件
echarts.use([
  TitleComponent,
  GridComponent,
  LineChart,
  BarChart,
  CanvasRenderer,
]);

var option: ECOption = {};
function Statistics() {
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const res = await queryStatistics({});
  };
  return (
    <PageContainer imgUrl="http://mamba24.oss-cn-beijing.aliyuncs.com/thread_165428859290905_20190916090047_s_557402_o_w_1778_h_1000_17024.jpg">
      Statistics
      <Time />
    </PageContainer>
  );
}

export default Statistics;
