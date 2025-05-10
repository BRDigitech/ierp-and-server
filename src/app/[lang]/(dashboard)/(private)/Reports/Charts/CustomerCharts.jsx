import React from 'react';
import { Grid2 as Grid, Card, CardContent, Typography } from '@mui/material';
import ApexDonutChart from './../../../../../../views/charts/apex/ApexDonutChart'
import ApexLineChart from './../../../../../../views/charts/apex/ApexLineChart'
import ApexPolarAreaChart from '@/views/charts/apex/ApexPolarArea';
import ApexBarChart from '@/views/charts/apex/ApexBarChart';
import ApexRadialBarChart from './../../../../../../views/charts/apex/ApexRadialBarChart'
import ApexHeatmapChart from './../../../../../../views/charts/apex/ApexHeatmapChart'
const pastelColors = [
  '#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF',
  '#D7BAFF', '#FFCBA4', '#A4FFCB', '#FFE3BA', '#BAFFD9'
];
const CustomerCharts = ({ data }) => {
  // Prepare data for each chart
  // // 1. Customer Type Distribution
  const clientTypeCounts = data.reduce((acc, cur) => {
    acc[cur.CLIENT_TYPE_CODE] = (acc[cur.CLIENT_TYPE_CODE] || 0) + 1;
    return acc;
  }, {});

  const clientTypeSeries = Object.values(clientTypeCounts);

  // 2. Customer Growth Over Time
  const growthByMonth = data.reduce((acc, cur) => {
    const month = cur.ACC_OPEN_DATE?.slice(0, 7); // YYYY-MM
    if (month) acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  // 3. Email vs. Phone Availability
  const contactStats = {
    Email: data.filter(d => d.EMAIL).length,
    Telephone: data.filter(d => d.TEL_NO).length,
    Mobile: data.filter(d => d.MOBILE).length,
    Fax: data.filter(d => d.FAX).length,
  };
  const contactOptions = {
    labels: Object.keys(contactStats),
    chart: {
      type: 'polarArea',
      animations: {
        enabled: true,
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      }
    },
    colors: pastelColors.slice(0, Object.keys(contactStats).length),
    fill: { opacity: 0.8 },
    stroke: { colors: ['#fff'] },
    legend: { position: 'bottom' },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };
  const contactSeries = Object.values(contactStats);
  // const contactSeries = [{ name: 'Available', data: Object.values(contactStats) }];

  // 4. Introduced By
  const introducers = data.reduce((acc, cur) => {
    if (cur.INTRODUCED_BY) {
      acc[cur.INTRODUCED_BY] = (acc[cur.INTRODUCED_BY] || 0) + 1;
    }
    return acc;
  }, {});
  const introSeries = [{ name: 'Referrals', data: Object.values(introducers) }];

  // 5. Missing Data Analysis
  // Step 1: Get all keys from the first object (assumes uniform structure)
  const fieldKeys = Object.keys(data[0] || {});

  // Step 2: Build dynamic fields array
  const fields = fieldKeys.map(key => ({
    key,
    label: key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) // Optional: prettify label
  }));
  // Step 3: Count missing entries per field
  const missingStats = fields.map(f => {
    const missingCount = data.filter(d => !d[f.key] || d[f.key].toString().trim() === '').length;
    return { key: f.key, label: f.label, count: missingCount };
  });

  const sortedStats = [...missingStats].sort((a, b) => b.count - a.count);
  const heatmapData = sortedStats.map(field => ({
    name: field.label,  // e.g., "Email", "Mobile"
    data: [field.count] // Apex heatmap expects `data` as an array, even for one value
  }));

  const totalMissing = sortedStats.reduce((sum, field) => sum + field.count, 0);
  // const fields = [
  //   { key: 'EMAIL', label: 'Email' },
  //   { key: 'TEL_NO', label: 'Telephone' },
  //   { key: 'MOBILE', label: 'Mobile' },
  //   { key: 'FAX', label: 'Fax' },
  //   { key: 'NIC_NO', label: 'NIC Number' },
  //   { key: 'CLIENT_TYPE_CODE', label: 'Client Type' },
  //   { key: 'CUST_NO', label: 'Customer #' },
  //   { key: 'NAME', label: 'Name' },
  //   { key: 'ACC_OPEN_DATE', label: 'Opened Date' },
  //   { key: 'INTRODUCED_BY', label: 'Introduced By' }
  // ];
  const missingCounts = fields.map(f =>
    data.filter(d => !d[f.key] || d[f.key].toString().trim() === '').length
  );

  return (
    <>
      <Card>
        <ApexDonutChart title="Customer Type Distribution" clientTypeCounts={clientTypeCounts} clientTypeSeries={clientTypeSeries} />
      </Card>
    <Card>
        <ApexLineChart title="Customer Growth Over Time" yAxisLabel="Customer" growthByMonth={growthByMonth} />
      </Card>
     <Card>
        <ApexPolarAreaChart title="Contact Information Availability" series={contactSeries} options={contactOptions} />
      </Card>
      <Card>
        <ApexBarChart title='Top Referrers' introducers={introducers} series={introSeries} />
      </Card>
     <Card>
        <ApexHeatmapChart label='Total Missing' heatmapData={heatmapData} />
      </Card>
    </>
  );
};

export default CustomerCharts;
