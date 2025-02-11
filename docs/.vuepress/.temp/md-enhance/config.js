import ChartJS from "C:/Users/Administrator/Desktop/workspace/note/node_modules/vuepress-plugin-md-enhance/lib/client/components/ChartJS.js";
import CodeDemo from "C:/Users/Administrator/Desktop/workspace/note/node_modules/vuepress-plugin-md-enhance/lib/client/components/CodeDemo.js";
import MdDemo from "C:/Users/Administrator/Desktop/workspace/note/node_modules/vuepress-plugin-md-enhance/lib/client/components/MdDemo.js";
import ECharts from "C:/Users/Administrator/Desktop/workspace/note/node_modules/vuepress-plugin-md-enhance/lib/client/components/ECharts.js";
import FlowChart from "C:/Users/Administrator/Desktop/workspace/note/node_modules/vuepress-plugin-md-enhance/lib/client/components/FlowChart.js";
import Mermaid from "C:/Users/Administrator/Desktop/workspace/note/node_modules/vuepress-plugin-md-enhance/lib/client/components/Mermaid.js";

export default {
  enhance: ({ app }) => {
    app.component("ChartJS", ChartJS)
    app.component("CodeDemo", CodeDemo);
    app.component("MdDemo", MdDemo);
    app.component("ECharts", ECharts);
    app.component("FlowChart", FlowChart);
    app.component("Mermaid", Mermaid);
  },
};
