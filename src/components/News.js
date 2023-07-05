import React, { useState } from 'react'
import { Select, Typography, Row, Col, Avatar, Card } from 'antd'
import moment from 'moment'
import { Link } from 'react-router-dom'

import { useGetCryptoNewsQuery } from 'services/cryptoNewsApi'
import { useGetCryptosQuery } from 'services/cryptoApi'
import Loader from './Loader'

const { Text, Title } = Typography
const { Option } = Select

export default function News({ simplified }) {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
  const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 12 })
  const { data } = useGetCryptosQuery(100)

  if (!cryptoNews?.value) return <Loader />

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {data?.data?.coins.map((coin) => <Option value={coin.name}>{coin.name}</Option>)}
          </Select>
        </Col>
      )}

      {cryptoNews.value.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <Link to={`/news/${news.url}`}
              target="_blank"
              rel='noreferrer'
            >
              <div className="news-image-container">
                <Title className="news-title" level={4}>{news.name}</Title>
                <img style={{ maxWidth: '200px', maxHeight: '100px' }} src={news?.image?.thumbnail?.contentUrl || 'https://images.unsplash.com/photo-1612837017391-4b6b2b0e2b0f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y3J5cHRvY3VycmVuY3klMjBjb3Jwb3JhdGlvbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'} alt="news" />
              </div>
              <p>{news.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description}</p>
              <div className="provider-container">
                <div>
                  <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || 'https://images.unsplash.com/photo-1612837017391-4b6b2b0e2b0f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y3J5cHRvY3VycmVuY3klMjBjb3Jwb3JhdGlvbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'} alt="news" />
                  <Text className="provider-name">{news.provider[0]?.name}</Text>
                </div>
                <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
              </div>
            </Link>
          </Card>
        </Col>
      ))}
    </Row>
  )
}
