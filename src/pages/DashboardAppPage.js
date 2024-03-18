import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import { Spin } from 'antd';
// sections
import { AppCurrentVisits, AppWebsiteVisits, AppWidgetSummary } from '../sections/@dashboard/app';
import { useRecentBookings } from '../hooks/useRecentBookings';
import { useUsers } from '../hooks/useUsers';
import { useRecentUsers } from '../hooks/useRecentUsers';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { useAppState } from '../context/userContext';
import { useOrders } from '../layouts/orders/useOrders';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const { user } = useAppState();
  const theme = useTheme();
  // const { data: recentOrders, isLoading } = useRecentBookings();
  const { data: users, isLoading: loadingUsers } = useUsers();
  const { orders, isLoading } = useOrders();

  //  Filter data
  const confirmedOrders = orders?.filter((order) => order?.active === true);
  console.log(confirmedOrders?.length);

  // Total Revenue of confirmed ordes
  const totalRevenue = (confirmedOrders?.length / orders?.length) * 100;
  console.log(totalRevenue);

  if (isLoading || loadingUsers)
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Spin />
      </div>
    );

  return (
    <>
      <Helmet>
        <title> Dashboard | PAY A WRITER </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Dashboard
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="All Orders" total={orders?.length} icon={'ant-design:pie-chart-outlined'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="All Users" total={users?.length} color="info" icon={'ant-design:user-outlined'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Confirmed Orders"
              total={confirmedOrders?.length}
              color="warning"
              icon={'ant-design:radar-chart-outlined'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Conversion Rate"
              total={`${totalRevenue.toFixed(1)}%`}
              color="error"
              icon={'ant-design:dollar-outlined'}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Orders & Users"
              subheader="(+43%) than last week"
              chartLabels={[
                '01/01/2024',
                '02/02/2024',
                '03/03/2024',
                '04/04/2024',
                '05/05/2024',
                '06/06/2024',
                '07/07/2024',
                '08/08/2024',
                '09/09/2024',
                '10/10/2024',
                '11/11/2024',
              ]}
              chartData={[
                {
                  name: 'Weekly Orders',
                  type: 'area',
                  fill: 'solid',
                  data: [0, orders?.length],
                },
                {
                  name: 'Onboarded Users',
                  type: 'area',
                  fill: 'gradient',
                  data: [0, users?.length],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Orders Summary"
              chartData={[
                { label: 'Orders', value: orders?.length },
                { label: 'Users', value: users?.length ?? 0 },
                { label: 'Confirmed Orders', value: confirmedOrders?.length ?? 0 },
                { label: 'Conversion Rate', value: totalRevenue ?? 0 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
