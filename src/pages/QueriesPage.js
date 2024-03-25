import { Helmet } from 'react-helmet-async';
import { Stack, Container, Typography } from '@mui/material';
import { Table, Button } from 'antd';
import { useContacts } from '../hooks/queries/useContacts';
import { useDeleteQuery } from '../hooks/queries/useDeleteQueries';

function QueriesPage() {
  const { queries, isLoading } = useContacts();
  const { deleteQueryAPI, deletingQuery } = useDeleteQuery();

  const dataSource = queries?.map((query) => ({
    id: query?._id,
    key: query?._id,
    name: query?.name,
    email: query?.email,
    phone: query?.phoneNumber,
    message: query?.message,
  }));

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
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      render: (id) => (
        <Button danger style={{ color: 'red' }} onClick={() => deleteQueryAPI(id)} disabled={deletingQuery}>
          Delete
        </Button>
      ),
    },
  ];

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
