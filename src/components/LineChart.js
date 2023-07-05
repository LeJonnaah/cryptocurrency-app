import React from 'react';
import { Col, Row, Typography } from 'antd';
import { Line } from 'react-chartjs-2';

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName, cryptoColor }) => {
    const coinPrice = [];
    const coinTimestamp = [];
    
    for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
        coinPrice.push(coinHistory?.data.history[i].price);
        coinTimestamp.push(new Date(coinHistory?.data?.history[i]?.timestamp * 1000).toLocaleDateString());
    }

    const data = {
        labels: coinTimestamp.reverse(),
        datasets: [
            {
                label: 'Price In USD',
                data: coinPrice.reverse(),
                fill: false,
                backgroundColor: cryptoColor,
                borderColor: cryptoColor,
            },
        ],
    };

const options = {
    elements: {
        point: {
            radius: 0
        }
    },
    scales: {
        x: {
            grid: {
                display: false
            }
        },
        y: {
            grid: {
                display: false
            }
        }
    }
};


    return (
        <>
            <Row className="chart-header">
                <Title level={2} className="chart-title">{coinName} Price Chart </Title>
                <Col className="price-container">
                    <Title level={5} className="price-change">Change: {coinHistory?.data?.change}%</Title>
                    <Title level={5} className="current-price">Current {coinName} Price: $ {currentPrice}</Title>
                </Col>
            </Row>
            <Line data={data} options={options} />
        </>
    );
};

export default LineChart;