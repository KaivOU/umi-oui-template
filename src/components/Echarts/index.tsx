import React, { FC } from 'react';
import ReactEcharts from 'echarts-for-react';
import 'echarts-wordcloud'; // 添加字符云扩展
interface EchartProps {
    dataZoom: boolean;
    option: {
        [keyword: string]: any;
    };
}
const Index: FC<EchartProps> = (props: EchartProps) => {
    const getOptions = (props: EchartProps) => {
        const { option, dataZoom } = props;

        const optionCustom = {
            color: [
                '#1890FF',
                '#2FC25B',
                '#FACC14',
                '#8543E0',
                '#13C2C2',
                '#19B2FF',
                '#FFB22B',
                '#41D96F',
                '#FC4B6C',
                '#25D9D9',
                '#9966FF',
                '#E65CE6',
                '#5975FF'
            ],
            grid: {
                containLabel: true,
                top: '15%',
                left: '5%',
                right: '8%',
                bottom: '10%'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'line'
                }
            },
            dataZoom: dataZoom && [
                {
                    type: 'slider',
                    show: true,
                    xAxisIndex: [0],
                    start: 0,
                    end: 100
                },
                {
                    type: 'slider',
                    show: true,
                    yAxisIndex: [0], // Y轴缩放控制左右Y轴
                    left: '0%',
                    start: 0, // 百分比
                    end: 100
                },
                {
                    type: 'inside',
                    xAxisIndex: [0],
                    start: 0,
                    end: 100
                },
                {
                    type: 'inside',
                    yAxisIndex: [0],
                    start: 0,
                    end: 100
                }
            ],
            ...option
        };

        return {
            ...props,
            optionCustom
        };
    };

    return <ReactEcharts notMerge {...getOptions(props)} />;
};

export default Index;
