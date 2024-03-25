import { Helmet } from 'react-helmet-async';
import { Stack, Container, Typography } from '@mui/material';
import { Table } from 'antd';

const dataSource = [
  {
    key: '1',
    name: 'Mike',
    email: 'maina@gmail.com',
    phone: '0712345678',
    message: 'Hola hola hola',
  },
  {
    key: '1',
    name: 'Mike',
    email: 'maina@gmail.com',
    phone: '0712345678',
    message: 'Hola hola hola',
  },
  {
    key: '1',
    name: 'Mike',
    email: 'maina@gmail.com',
    phone: '0712345678',
    message: 'Hola hola hola',
  },
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Phone Number',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Message',
    dataIndex: 'message',
    key: 'message',
    render: (message) => (
      <p style={{ width: '150px' }} color="success">
        {message}
      </p>
    ),
  },
];

function QueriesPage() {
  return (
    <>
      <Helmet>
        <title>Queries | PAY A WRITER</title>
      </Helmet>

      <Container>
        <Stack>
          <Typography variant="h4" gutterBottom>
            Queries
          </Typography>
        </Stack>
        <div style={{ marginTop: '3rem' }} />
        <Table dataSource={dataSource} columns={columns} />;
      </Container>
    </>
  );
}

export default QueriesPage;
