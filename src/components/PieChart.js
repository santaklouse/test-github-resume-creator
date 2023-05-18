import React, { Component } from "react";
import Chart from 'react-apexcharts'
import { map, chain } from 'lodash';
import Container from "react-bootstrap/Container";
import "./PieChart.css";

class PieChart extends Component {
    constructor(props) {
        super(props);

        this.width = props.width || 380;
        const items = chain(props.data)
            .toPairs()
            .orderBy(i => i[1], 'desc')
            .map(i => ({label: i[0], value: i[1]}))
            .value()

        const labels = map(items, 'label') || [];
        this.series = map(items, 'value') || [];
        this.options = {
            labels: labels,
            legend: {
                width: 160,
                position: 'left',
                formatter: item => `${item}: ${props.data[item]}%`
            },
            responsive: [{
                options: {
                    chart: {
                        width: 200,
                        height: 300,
                    },
                    legend: {
                        show: true,
                    }
                }
            }]
        }
    }

    render() {
        return (
            <Container>
                <Chart
                    className="chart-container"
                    type="pie"
                    width={this.width}
                    series={this.series}
                    options={this.options}
                />
            </Container>
        );
    }
}

export default PieChart;

