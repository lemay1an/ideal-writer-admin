/* eslint-disable react/button-has-type */
import { Helmet } from 'react-helmet-async';
import { Stack, Container, Typography, Button } from '@mui/material';
import { Card, Space, Col, Divider, Row } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { usePricing } from '../hooks/usePricing';
import { useDeletePricing } from '../hooks/useDeletePricing';

function PricingPage() {
  const { pricings } = usePricing();
  const { deletePriceAPI, isDeleting } = useDeletePricing();

  return (
    <>
      <Helmet>
        <title> Pricing | PAY A WRITER </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Pricing
          </Typography>

          <Button>Add Pricing</Button>
        </Stack>
        <Row gutter={16}>
          {pricings?.map((pricing, i) => (
            <Col className="gutter-row" span={7} style={{ marginBottom: '2rem' }} key={i}>
              <Card
                title={pricing?.title}
                extra={
                  <button
                    disabled={isDeleting}
                    style={{
                      backgroundColor: 'transparent',
                      outline: 'none',
                      border: '0px solid transparent',
                      cursor: 'pointer',
                      color: 'red',
                    }}
                    onClick={() => deletePriceAPI(pricing?._id)}
                  >
                    Delete
                  </button>
                }
                style={{ width: 300 }}
              >
                {pricing?.description.map((description, i) => (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }} key={i}>
                    <CheckCircleOutlined color="#168BF2" />
                    <p key={i}>{description}</p>
                  </div>
                ))}
                {
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <h3>Pricing</h3>
                    <p>{pricing?.amount}</p>
                  </div>
                }
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default PricingPage;
