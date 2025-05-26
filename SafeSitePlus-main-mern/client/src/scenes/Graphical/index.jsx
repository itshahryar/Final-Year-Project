import React, { useRef } from 'react';
import { Container, Grid, Paper, Typography, Box, Card } from '@mui/material';
import { Pie, Bar, Line } from 'react-chartjs-2';
import 'chart.js/auto';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Graphical = () => {
  const reportRef = useRef();

  // Sample Data
  const riskLevelData = {
    labels: ['Low', 'Medium', 'High'],
    datasets: [{
      label: 'Risk Level',
      data: [4, 2, 1],
      backgroundColor: ['#66BB6A', '#FFEB3B', '#EF5350'],
    }]
  };

  const weatherSeverityData = {
    labels: ['Site A (Storm)', 'Site B (Rain)', 'Site C (Heat)'],
    datasets: [{
      label: 'Severity',
      data: [3, 1, 2],
      backgroundColor: ['#3f51b5', '#2196f3', '#ff9800'],
    }]
  };

  const anomaliesData = {
    labels: ['Site A', 'Site B', 'Site C'],
    datasets: [
      {
        label: 'Total Anomalies',
        data: [5, 1, 0],
        borderColor: '#42A5F5',
        backgroundColor: '#BBDEFB',
        tension: 0.3
      },
      {
        label: 'Recent Anomalies',
        data: [2, 1, 0],
        borderColor: '#66BB6A',
        backgroundColor: '#C8E6C9',
        tension: 0.3
      }
    ]
  };

  const anomalyBreakdown = {
    labels: ['Site A', 'Site B', 'Site C'],
    datasets: [
      {
        label: 'Fire',
        data: [2, 0, 0],
        backgroundColor: '#f44336'
      },
      {
        label: 'Intrusion',
        data: [1, 1, 0],
        backgroundColor: '#2196f3'
      },
      {
        label: 'Flood',
        data: [2, 0, 0],
        backgroundColor: '#4caf50'
      },
    ]
  };

  const incidentStatus = {
    labels: ['Resolved', 'Unresolved', 'In Progress'],
    datasets: [{
      label: 'Incident Status',
      data: [3, 2, 1],
      backgroundColor: ['#66BB6A', '#EF5350', '#FFCA28'],
    }]
  };

  const heatmapData = [
    { site: 'Site A', weather: 'Storm', severity: 3, risk: 'Low' },
    { site: 'Site B', weather: 'Heat', severity: 2, risk: 'Medium' },
    { site: 'Site C', weather: 'Rain', severity: 1, risk: 'High' }
  ];

  const recommendations = [
    { site: 'Site A', advice: 'Pause outdoor work due to storm.' },
    { site: 'Site C', advice: 'Use protective gear due to high-risk level.' },
  ];

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  // Export PNG
  const exportAsImage = () => {
    html2canvas(reportRef.current).then(canvas => {
      const link = document.createElement('a');
      link.download = 'site-report.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  // Export PDF
  const exportAsPDF = () => {
    html2canvas(reportRef.current).then(canvas => {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('site-report.pdf');
    });
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h4" fontWeight="bold" fontFamily="Poppins">
          Site Monitoring Dashboard 📍
        </Typography>
        <Typography variant="h6" fontFamily="Dancing Script" color="text.secondary" mb={2}>
          Real-time visualization of risks, incidents & environmental anomalies
        </Typography>

        {/* Filters and Export Buttons */}
        <Box display="flex" justifyContent="center" alignItems="center" gap={2} flexWrap="wrap">
          <Box>
            <Typography variant="body2" fontWeight="bold">Filter by Date:</Typography>
            <input type="date" />
            &nbsp;to&nbsp;
            <input type="date" />
          </Box>

          <Box>
            <Typography variant="body2" fontWeight="bold">Export:</Typography>
            <button onClick={exportAsPDF} style={{ marginRight: '10px', padding: '6px 12px', backgroundColor: '#1976d2', color: '#fff', border: 'none', borderRadius: '4px' }}>
              Export PDF
            </button>
            <button onClick={exportAsImage} style={{ padding: '6px 12px', backgroundColor: '#43a047', color: '#fff', border: 'none', borderRadius: '4px' }}>
              Export PNG
            </button>
          </Box>
        </Box>
      </Box>

      {/* Main Report */}
      <div ref={reportRef}>
        <Grid container spacing={3}>
          {/* 1. Risk Level */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: 400 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>1. Risk Level Distribution</Typography>
              <Typography variant="body2" sx={{ mb: 2 }} color="text.secondary">
                Represents the distribution of safety risks reported across all sites.
              </Typography>
              <div style={{ height: 'calc(100% - 64px)' }}>
                <Pie data={riskLevelData} options={chartOptions} />
              </div>
            </Paper>
          </Grid>

          {/* 2. Weather Severity */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: 400 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>2. Weather Severity by Site</Typography>
              <Typography variant="body2" sx={{ mb: 2 }} color="text.secondary">
                Displays the severity of weather conditions across construction sites.
              </Typography>
              <div style={{ height: 'calc(100% - 64px)' }}>
                <Bar data={weatherSeverityData} options={chartOptions} />
              </div>
            </Paper>
          </Grid>

          {/* 3. Anomalies Over Time */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3, height: 400, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" sx={{ mb: 1 }}>3. Anomalies Over Time</Typography>
              <Typography variant="body2" sx={{ mb: 2 }} color="text.secondary">
                Shows how anomalies have changed over time across sites.
              </Typography>
              <Box sx={{ flexGrow: 1 }}>
                <Line data={anomaliesData} options={chartOptions} />
              </Box>
            </Paper>
          </Grid>

          {/* 4. Anomaly Breakdown */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3, height: 400, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" sx={{ mb: 1 }}>4. Anomaly Breakdown</Typography>
              <Typography variant="body2" sx={{ mb: 2 }} color="text.secondary">
                Classification of different types of anomalies detected per site.
              </Typography>
              <Box sx={{ flexGrow: 1 }}>
                <Bar data={anomalyBreakdown} options={chartOptions} />
              </Box>
            </Paper>
          </Grid>

          {/* 5. Incident Status */}
          <Grid item xs={12} md={6} mt={4}>
            <Paper sx={{ p: 3, height: 400 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>5. Incident Status</Typography>
              <Typography variant="body2" sx={{ mb: 2 }} color="text.secondary">
                Shows resolved, unresolved, and in-progress incidents.
              </Typography>
              <div style={{ height: 'calc(100% - 64px)' }}>
                <Pie data={incidentStatus} options={chartOptions} />
              </div>
            </Paper>
          </Grid>

          {/* 6. Heatmap */}
          <Grid item xs={12} md={6} mt={4}>
            <Paper sx={{ p: 3, height: 400 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>6. Weather & Risk Heatmap</Typography>
              <Typography variant="body2" sx={{ mb: 2 }} color="text.secondary">
                Overview of weather type, severity, and risk at each site.
              </Typography>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {['Site', 'Weather', 'Severity', 'Risk'].map((header, i) => (
                      <th key={i} style={{ borderBottom: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {heatmapData.map((site, i) => (
                    <tr key={i}>
                      <td style={{ padding: '8px' }}>{site.site}</td>
                      <td style={{ padding: '8px' }}>{site.weather}</td>
                      <td style={{ padding: '8px' }}>{site.severity}</td>
                      <td style={{
                        padding: '8px',
                        backgroundColor:
                          site.risk === 'High' ? '#ffcdd2' :
                            site.risk === 'Medium' ? '#fff9c4' : '#c8e6c9'
                      }}>
                        {site.risk}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Paper>
          </Grid>

          {/* 7. Recommendations */}
          <Grid item xs={12} mb={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>7. Recommendations</Typography>
              <Typography variant="body2" sx={{ mb: 2 }} color="text.secondary">
                Safety tips based on current risks and weather.
              </Typography>
              {recommendations.map((r, i) => (
                <Card key={i} sx={{ p: 2, mb: 2, backgroundColor: '#f5f5f5' }}>
                  <Typography sx={{ color: 'black' }}>
                    <strong>{r.site}:</strong> {r.advice}
                  </Typography>
                </Card>
              ))}
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default Graphical;