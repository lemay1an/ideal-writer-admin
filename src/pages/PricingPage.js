import { Helmet } from 'react-helmet-async';
import { Stack, Container, Typography, Button } from '@mui/material';
import { Card, Space, Col, Divider, Row } from 'antd';

const style = {
  background: '#0092ff',
  padding: '8px 0',
};

function PricingPage() {
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
          <Col className="gutter-row" span={7} style={{ marginBottom: '2rem' }}>
            <Card title="Default size card" extra={<button>Delete</button>} style={{ width: 300 }}>
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default PricingPage;
