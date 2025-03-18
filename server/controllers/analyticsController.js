const { response } = require('express');
const pool = require('../config/database');
const analyticsDataClient = require('../config/oauth');

function rearrangeReportData(data) {
    const result = {};
  
    data.rows.forEach(row => {
        const device = row.dimensionValues[0].value;
        const users = parseInt(row.metricValues[0].value);
    
        if (!result[device]) {
            result[device] = 0;
        }
    
        result[device] += users;
    });
  
    return result;
}

const getDateRanges = (range) => {
  let today = new Date();
  let startDate, endDate, previousStartDate, previousEndDate;

  const formatDate = (date) => date.toISOString().split('T')[0]; // Assuming you want to format as YYYY-MM-DD

  switch (range) {
      case 'today':
          startDate = formatDate(today);
          endDate = startDate;
          previousStartDate = formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
          previousEndDate = previousStartDate;
          break;

      case 'yesterday':
          startDate = formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
          endDate = startDate;
          previousStartDate = formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1));
          previousEndDate = previousStartDate;
          break;

      case 'last7days':
          startDate = formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6));
          endDate = formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
          previousStartDate = formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 13));
          previousEndDate = formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7));
          break;

      case 'last14days':
          startDate = formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 13));
          endDate = formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
          previousStartDate = formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 27));
          previousEndDate = formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 14));
          break;

      case 'last28days':
          startDate = formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 27));
          endDate = formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
          previousStartDate = formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 55));
          previousEndDate = formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 28));
          break;

      case 'last30days':
          startDate = formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 29));
          endDate = formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
          previousStartDate = formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 59));
          previousEndDate = formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30));
          break;

      case 'last60days':
          startDate = formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 59));
          endDate = formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
          previousStartDate = formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 119));
          previousEndDate = formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 60));
          break;

      case 'last90days':
          startDate = formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 89));
          endDate = formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
          previousStartDate = formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 179));
          previousEndDate = formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 90));
          break;

      case 'trimester':
          startDate = formatDate(new Date(today.getFullYear(), today.getMonth() - 3, today.getDate()));
          endDate = formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
          previousStartDate = formatDate(new Date(today.getFullYear(), today.getMonth() - 6, today.getDate()));
          previousEndDate = formatDate(new Date(today.getFullYear(), today.getMonth() - 3, today.getDate()));
          break;

      case '12months':
          startDate = formatDate(new Date(today.getFullYear() - 1, today.getMonth(), today.getDate()));
          endDate = formatDate(today);
          previousStartDate = formatDate(new Date(today.getFullYear() - 2, today.getMonth(), today.getDate()));
          previousEndDate = formatDate(new Date(today.getFullYear() - 1, today.getMonth(), today.getDate()));
          break;

      case 'year':
          startDate = formatDate(new Date(today.getFullYear(), 0, 1));
          endDate = formatDate(today);
          previousStartDate = formatDate(new Date(today.getFullYear() - 1, 0, 1));
          previousEndDate = formatDate(new Date(today.getFullYear() - 1, 11, 31));
          break;

      case 'lastyear':
          startDate = formatDate(new Date(today.getFullYear() - 1, 0, 1));
          endDate = formatDate(new Date(today.getFullYear() - 1, 11, 31));
          previousStartDate = formatDate(new Date(today.getFullYear() - 2, 0, 1));
          previousEndDate = formatDate(new Date(today.getFullYear() - 2, 11, 31));
          break;

      default:
          throw new Error('Invalid date range');
  }

  return {
      currentRange: {
          startDate,
          endDate,
      },
      previousRange: {
          startDate: previousStartDate,
          endDate: previousEndDate,
      },
  };
};


const analyticsController = {
    // ? users
    
    activeUsersPerMonth: async (req, res) => {
        try {
            const monthsAgo = req.params.Months || 2;

            const startDate = new Date(
              new Date().getFullYear(), 
              new Date().getMonth() - monthsAgo, 
              1+1
            );

            const [response] = await analyticsDataClient.runReport({
                property: `properties/${process.env.PROPERTY_ID}`,
                "dimensions":[{"name":"month"}],
                "metrics":[{"name":"activeUsers"}],
                "dateRanges":[{"startDate":`${startDate.toISOString().split('T')[0]}`,"endDate":"today"}],
                "orderBys":[{"dimension":{"orderType":"NUMERIC","dimensionName":"month"},"desc":true}]
            });
            
            if (response && response.rows && response.rowCount > 0) {
              const aggregatedData = response.rows.map((row) => {
                return {
                  month: row.dimensionValues[0].value,
                  activeUsers: row.metricValues[0].value 
                };
              });

              return res.status(200).send(aggregatedData);
            } else {
              return res.status(500).send('No data');
            }
        } catch (error) {
            console.error('Error fetching page views:', error.message);
            return res.status(500).send('Internal Server Error');
        }
    },
    
    usersPerDay: async (req, res) => {
      try {
          const daysAgo = req.params.Days || 90;

          const [response] = await analyticsDataClient.runReport({
            "property": `properties/${process.env.PROPERTY_ID}`,
            "dimensions":[{"name":"day"},{"name":"month"}],
            "metrics":[{"name":"activeUsers"},{"name":"newUsers"}],
            "dateRanges":[{"startDate":`${daysAgo}daysAgo`,"endDate":"today"}],
            "orderBys":[
              {"dimension":{"orderType":"NUMERIC","dimensionName":"month"},"desc":true},
              {"dimension":{"orderType":"NUMERIC","dimensionName":"day"},"desc":true}],
          });

          if (response && response.rows && response.rowCount > 0) {
            const aggregatedData = response.rows.map((row) => {
              return {
                [response.dimensionHeaders[0].name]: row.dimensionValues[0].value,  
                [response.dimensionHeaders[1]?.name]: row.dimensionValues[1]?.value,  
                [response.metricHeaders[0].name]: row.metricValues[0].value,  
                [response.metricHeaders[1]?.name]: row.metricValues[1]?.value 
              };
            });
          
            return res.status(200).send(aggregatedData);
          } else {
            return res.status(500).send('No data');
          }          
      } catch (error) {
          console.error('Error fetching page views:', error.message);
          return res.status(500).send('Internal Server Error');
      }
    },

    usersPerMonth: async (req, res) => {
      try {
          const monthsAgo = req.params.Months || 2;

          const startDate = new Date(
            new Date().getFullYear(), 
            new Date().getMonth() - monthsAgo, 
            1+1
          );

          const [response] = await analyticsDataClient.runReport({
            "property": `properties/${process.env.PROPERTY_ID}`,
            "dimensions":[{"name":"month"}],
            "metrics":[{"name":"activeUsers"},{"name":"newUsers"}],
            "dateRanges":[{"startDate":`${startDate.toISOString().split('T')[0]}`,"endDate":"today"}],
            "orderBys":[
              {"dimension":{"orderType":"NUMERIC","dimensionName":"month"},"desc":true}],
          });

          if (response && response.rows && response.rowCount > 0) {
            const aggregatedData = response.rows.map((row) => {
              return {
                [response.dimensionHeaders[0].name]: row.dimensionValues[0].value,  
                [response.dimensionHeaders[1]?.name]: row.dimensionValues[1]?.value,  
                [response.metricHeaders[0].name]: row.metricValues[0].value,  
                [response.metricHeaders[1]?.name]: row.metricValues[1]?.value 
              };
            });
          
            return res.status(200).send(aggregatedData);
          } else {
            return res.status(500).send('No data');
          }          
      } catch (error) {
          console.error('Error fetching sessions:', error.message);
          return res.status(500).send('Internal Server Error');
      }
    },
    
    newUsersPerMonth: async (req, res) => {
      try {
          const monthsAgo = req.params.Months || 2;

          const startDate = new Date(
            new Date().getFullYear(), 
            new Date().getMonth() - monthsAgo, 
            1+1
          );

          const [response] = await analyticsDataClient.runReport({
              property: `properties/${process.env.PROPERTY_ID}`,
              "dimensions":[{"name":"month"}],
              "metrics":[{"name":"newUsers"}],
              "dateRanges":[{"startDate":`${startDate.toISOString().split('T')[0]}`,"endDate":"today"}],
              "orderBys":[{"dimension":{"orderType":"NUMERIC","dimensionName":"month"},"desc":true}]
            });

            if (response && response.rows && response.rowCount > 0) {
              const aggregatedData = response.rows.map((row) => {
                return {
                  month: row.dimensionValues[0].value,
                  newUsers: row.metricValues[0].value 
                };
              });

              return res.status(200).send(aggregatedData);
            } else {
              return res.status(500).send('No data');
            }
      } catch (error) {
          console.error('Error fetching page views:', error.message);
          return res.status(500).send('Internal Server Error');
      }
    },

    sessions: async (req, res) => {
      try {
          const range = req.params.Range || 'last7days';
          const { currentRange, previousRange } = getDateRanges(range);

          const [response] = await analyticsDataClient.runReport({
            "property": `properties/${process.env.PROPERTY_ID}`,
            "dimensions":[{"name":"sessionSource"}],
            "metrics":[{"name":"sessions"}],
            "dateRanges": [
                { startDate: currentRange.startDate, endDate: currentRange.endDate },
                { startDate: previousRange.startDate, endDate: previousRange.endDate }
            ],
            "orderBys":[{"metric":{"metricName":"sessions"},"desc":true}]
          });
          
          if (response && response.rows && response.rowCount > 0) {
            const aggregatedData = response.rows
                .filter((row) => row.dimensionValues[1].value !== 'date_range_1') // Filter out date_range_1
                .map((row) => {
                    // Find the corresponding data from date_range_1
                    const data_range_1_value = response.rows
                        .filter(
                            (filterRow) =>
                                filterRow.dimensionValues[1].value === 'date_range_1' &&
                                filterRow.dimensionValues[0].value === row.dimensionValues[0].value
                        )
                        .map((mapRow) => {
                            const currentValue = parseFloat(row.metricValues[0].value);
                            const previousValue = parseFloat(mapRow.metricValues[0].value);
        
                            if (previousValue === 0) {
                                // Avoid division by zero, consider this as a 100% increase if previous value was 0
                                return currentValue > 0 ? 100 : 0;
                            }
        
                            const diff = ((currentValue - previousValue) / previousValue) * 100;
        
                            // Return the actual difference, positive or negative
                            return diff.toFixed(2); 
                        });
        
                    return {
                        [response.dimensionHeaders[0].name]: row.dimensionValues[0].value,   
                        [response.metricHeaders[0].name]: row.metricValues[0].value, 
                        percentage: data_range_1_value[0] || 0 // Default to 0 if no matching previous range value found
                    };
                });
        
            return res.status(200).send(aggregatedData);
        } else {
            return res.status(500).send('No data');
        }
            
      } catch (error) {
          console.error('Error fetching sessions:', error.message);
          return res.status(500).send('Internal Server Error');
      }
    },

    firstUserPrimaryGroupChannel: async (req, res) => {
      try {
        const range = req.params.Range || 'last7days';
        const { currentRange } = getDateRanges(range);

        const [response] = await analyticsDataClient.runReport({
          "property": `properties/${process.env.PROPERTY_ID}`,
          "dimensions":[{"name":"firstUserPrimaryChannelGroup"}],
          "metrics":[{"name":"newUsers"}],
          "dateRanges":[{"startDate":currentRange.startDate,"endDate":currentRange.endDate}]
        });
        
        if (response && response.rows && response.rowCount > 0) {
          const aggregatedData = response.rows.map((row) => {
            return {
              [response.dimensionHeaders[0].name]: row.dimensionValues[0].value,  
              [response.dimensionHeaders[1]?.name]: row.dimensionValues[1]?.value,  
              [response.metricHeaders[0].name]: row.metricValues[0].value,  
              [response.metricHeaders[1]?.name]: row.metricValues[1]?.value 
            };
          });
        
          return res.status(200).send(aggregatedData);
        } else {
          return res.status(500).send('No data');
        }     
      } catch (error) {
          console.error('Error fetching fUPC:', error.message);
          return res.status(500).send('Internal Server Error');
      }
    },

    screensAndPages: async (req, res) => {
      try {
        const range = req.params.Range || 'last7days';
        const { currentRange } = getDateRanges(range);

        const [response] = await analyticsDataClient.runReport({
          "property": `properties/${process.env.PROPERTY_ID}`,
          "dimensions":[{"name":"pagePath"}],
          "metrics":[
            {"name":"activeUsers"},
            {"name":"eventCount"},
            {"name":"userEngagementDuration"},
            {"name":"keyEvents"},
            {"name":"screenPageViews"},
            {"name":"screenPageViewsPerUser"},
            {"name":"totalRevenue"}
          ],
          "dateRanges":[{"startDate":currentRange.startDate,"endDate":currentRange.endDate}],
          "metricAggregations":["TOTAL"]}
        );
        
        if (response && response.rows && response.rowCount > 0) {
          const aggregatedData = response.rows.map((row) => {
            const aggregatedRow = {};
        
            response.dimensionHeaders.forEach((header, index) => {
              aggregatedRow[header.name] = row.dimensionValues[index]?.value || null;
            });
        
            response.metricHeaders.forEach((header, index) => {
              aggregatedRow[header.name] = row.metricValues[index]?.value || null;
            });
        
            return aggregatedRow;
          });
        
          const aggregatedRow = {};
          const aggregatedTotals = response.totals[0].metricValues.map((total, index) => {

            aggregatedRow[response.metricHeaders[index].name] = total.value;

            return aggregatedRow;
          });

          return res.status(200).send({
            data: aggregatedData,
            totals: aggregatedRow
          });
        } else {
          return res.status(500).send('No data');
        } 
      } catch (error) {
          console.error('Error fetching Screens And Pages:', error.message);
          return res.status(500).send('Internal Server Error');
      }
    },

    pageViews: async (req,res) => {
      try {
        const range = req.params.Range || 'last7days';
        const { currentRange } = getDateRanges(range);

        const [response] = await analyticsDataClient.runReport({
          "property": `properties/${process.env.PROPERTY_ID}`,
          "dimensions":[{"name":"date"}],
          "metrics":[{"name":"screenPageViews"}],
          "dateRanges":[{"startDate":currentRange.startDate,"endDate":currentRange.endDate}],
          "orderBys":[{"dimension":{"orderType":"ALPHANUMERIC","dimensionName":"date"},"desc":true}],
          "metricAggregations":["TOTAL"]
        });
          
        if (response && response.rows && response.rowCount > 0) {
          const aggregatedData = response.rows.map((row) => {
            const aggregatedRow = {};
        
            response.dimensionHeaders.forEach((header, index) => {
              aggregatedRow[header.name] = row.dimensionValues[index]?.value || null;
            });
        
            response.metricHeaders.forEach((header, index) => {
              aggregatedRow[header.name] = row.metricValues[index]?.value || null;
            });
        
            return aggregatedRow;
          });
        
          const aggregatedRow = {};
          const aggregatedTotals = response.totals[0].metricValues.map((total, index) => {

            aggregatedRow[response.metricHeaders[index].name] = total.value;

            return aggregatedRow;
          });

          return res.status(200).send({
            data: aggregatedData,
            totals: aggregatedRow
          });
        } else {
          return res.status(500).send('No data');
        } 
      } catch (error) {
          console.error('Error fetching Page Views:', error.message);
          return res.status(500).send('Internal Server Error');
      }
    },

    userActivity: async (req,res) => {
      try {
        const range = req.params.Range || 'last7days';
        const { currentRange } = getDateRanges(range);

        const [response] = await analyticsDataClient.runReport({
          "property": `properties/${process.env.PROPERTY_ID}`,
          "dimensions":[{"name":"date"}],
          "metrics":[
            {"name":"active1DayUsers"},
            {"name":"active28DayUsers"},
            {"name":"active7DayUsers"}
          ],
          "dateRanges":[{"startDate":currentRange.startDate,"endDate":currentRange.endDate}],
          "orderBys":[{"dimension":{"orderType":"ALPHANUMERIC","dimensionName":"date"},"desc":true}]
        });
          
        if (response && response.rows && response.rowCount > 0) {
          const aggregatedData = response.rows.map((row) => {
            const aggregatedRow = {};
        
            response.dimensionHeaders.forEach((header, index) => {
              aggregatedRow[header.name] = row.dimensionValues[index]?.value || null;
            });
        
            response.metricHeaders.forEach((header, index) => {
              aggregatedRow[header.name] = row.metricValues[index]?.value || null;
            });
        
            return aggregatedRow;
          });

          return res.status(200).send(aggregatedData);
        } else {
          return res.status(500).send('No data');
        } 
      } catch (error) {
          console.error('Error fetching Page Views:', error.message);
          return res.status(500).send('Internal Server Error');
      }
    },

    device: async (req, res) => {
        try {
            const daysAgo = req.params.Days || 30;

            const [response] = await analyticsDataClient.runReport({
                property: `properties/${process.env.PROPERTY_ID}`,
                dateRanges: [
                    {
                        startDate: `${daysAgo}daysAgo`,
                        endDate: 'today',
                    },
                ],
                metrics: [
                    {
                        name: 'totalUsers',
                    },
                ],
                dimensions: [
                    {
                        name: 'deviceCategory',
                    },
                ],
                keepEmptyRows: true,
            });

            return res.status(200).send(rearrangeReportData(response));
        } catch (error) {
            console.error('Error fetching page views:', error.message);
            return res.status(500).send('Internal Server Error');
        }
    },
};

module.exports = analyticsController;
