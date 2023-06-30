import React from 'react'
import { Col, Row, Typography } from 'antd'
import millify from 'millify'
import HTMLReactParser from 'html-react-parser'
import { useGetExchangesQuery } from '../services/cryptoApi'
import Loader from './Loader'

const { Text } = Typography

const Exchanges = () => {
    const { data, isFetching } = useGetExchangesQuery()
    const exchangesList = data?.data?.exchanges

    if (isFetching) return <Loader />

    return (
        <>
            <Row>
                <Col span={6}>Exchanges</Col>
                <Col span={6}>24h Trade Volume</Col>
                <Col span={6}>Markets</Col>
                <Col span={6}>Change</Col>
            </Row>
            {exchangesList.map((exchange) => (
                <Row>
                    <Col span={6}>
                        <Text><strong>{exchange.rank}.</strong></Text>
                        <Text><strong>{exchange.name}</strong></Text>
                    </Col>
                    <Col span={6}>${millify(exchange.volume)}</Col>
                    <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
                    <Col span={6}>{millify(exchange.marketShare)}%</Col>
                </Row>
            ))}
        </>
    )
}

export default Exchanges