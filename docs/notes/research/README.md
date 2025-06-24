---
title: README
createTime: 2025/01/08 22:57:20
permalink: /research/
author: Jack
categories:
 - 调研
---


## 关于

模块输入接口的基本要求，请根据实际情况灵活扩充

```typescript

type RichOptions = string;  //富文本模块的静j配置信息， JSON.stringify(Record<string, any>),
type MDXExpressionType = string;  //MDX表达式类型
type QueryItemID = string;  //查询id类型

type CubeNodeType = {
    uniqueName: string;     //唯一标识
    [key:string]: any;     //回显数据
} 

type MeasureNodeType = {
    uniqueName: string;     //唯一标识
    format?: string;        //格式化字符串
    aggregation?: string;   //聚合方式
    [key:string]: any;     //回显数据
};    
   
type FilterNodeType = {
    uniqueName: string;  //唯一标识，指标或者level
    expression: string;  //过滤表达式, MDX表达
    [key:string]: any;     //回显数据
}; 

type QueryItemType = {
    timestamp: number;          //如果有查询更新时间戳，报表工具将比对这个值，决定是否需要重新查数据
    id: QueryItemID;                 //唯一标识，用于区分不同查询单位。
    cube: CubeNodeType;         // 选择的Cube节点
    measure: MeasureNodeType;   // 选择的度量节点
    filters?: Array<{
        uniqueName: string;             //唯一标识，指标或者level
        type: 'measure'|'level';        //类型
        expression: MDXExpressionType;  //过滤表达式, MDX表达式
    }>; 
    [key:string]: any;     //回显数据
} 

interface RichTextInputProps{

    //富文本模块的静j配置信息
    rich: RichOptions;   

    //富文本模块的内的查询配置
    items: Array<QueryItemType>;  

    //查询配置发生变化事件。模块内修改了数据查询相关配置，请立即触发该事件。外部将根据items重新装配queryModel发起查询请求。
    onQueryChange: (items: Array<QueryItemType>) => void;  

    //富文本模块的静态配置信息发生变化事件。外部将根据rich重新渲染富文本。
    onRichChange: (rich: RichOptions) => void;   

    //查询结果数
    data: Array<{
        id: QueryItemID;   
        raw: number|string;
        formatted: string;
    }>;

}

```
