import React, { useEffect, useState } from 'react';
import { Table, Spinner, Pagination, PaginationLink, PaginationItem } from 'reactstrap';

import RangeSelector from './RangeSelector';
import { formatTime } from "utils/helperFunctions";

const PaginatedTable = ({ analyticsData, fetchScreensAndPages }) => {
  const recordsPerPage = 10;  // Number of records to show per page
  const [currentPage, setCurrentPage] = useState(1);  // State for current page
  const [currentRecords, setCurrentRecords] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  // Handle Next and Previous buttons
  const nextPage = () => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  const prevPage = () => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  const lastPage = () => setCurrentPage(totalPages);
  const firstPage = () => setCurrentPage(1);

  
  useEffect(() => {
    if (analyticsData && analyticsData.screensAndPages) {
      const tP = Math.ceil(analyticsData.screensAndPages.data.length / recordsPerPage);
      setTotalPages(tP);

      // Calculate the index range of records to show
      const indexOfLastRecord = currentPage * recordsPerPage;
      const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

      setCurrentRecords(analyticsData.screensAndPages.data.slice(indexOfFirstRecord, indexOfLastRecord));
    }
  }, [analyticsData, currentPage]);

  if (!analyticsData || !analyticsData.screensAndPages) {
    return <Spinner />
  }

  return (
    <>
      <Table className="align-items-center table-flush" responsive size="sm">
        <thead className="thead-light">
          <tr>
            <th scope="col">Caminho da página</th>
            <th scope="col">Visualizações</th>
            <th scope="col">Utilizadores</th>
            <th scope="col">Visualizações por utilizador</th>
            <th scope="col">Tempo de interação médio</th>
            <th scope="col">Quantidade de eventos</th>
            <th scope="col">Receita total</th>
          </tr>
          <tr className="font-weight-bold">
            { 
              analyticsData.screensAndPages.totals &&
              <>
                <td/>
                <td>{analyticsData.screensAndPages.totals.screenPageViews}</td>
                <td>{analyticsData.screensAndPages.totals.activeUsers}</td>
                <td>{(analyticsData.screensAndPages.totals.screenPageViews / analyticsData.screensAndPages.totals.activeUsers).toFixed(2)}</td>
                <td>{formatTime(analyticsData.screensAndPages.totals.userEngagementDuration / analyticsData.screensAndPages.totals.activeUsers)}</td>
                <td>{analyticsData.screensAndPages.totals.keyEvents}</td>
                <td>{analyticsData.screensAndPages.totals.totalRevenue}€</td>
              </>
            }
          </tr>
        </thead>
        <tbody>
          {
            currentRecords && 
            currentRecords.map((row, index) => (
              <tr key={index}>
                <td>{row.pagePath}</td>
                <td>{row.screenPageViews}</td>
                <td>{row.activeUsers}</td>
                <td>{(row.screenPageViews / row.activeUsers).toFixed(2)}</td>
                <td>{formatTime(row.userEngagementDuration / row.activeUsers)}</td>
                <td>{row.keyEvents}</td>
                <td>{row.totalRevenue}€</td>
              </tr>
            ))
          }
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={7}>
              <Pagination className="pagination-controls w-100 d-flex justify-content-center text-center">
                <PaginationItem disabled={currentPage === 1}>
                  <PaginationLink
                    onClick={firstPage}
                    first
                  />
                </PaginationItem>
                <PaginationItem disabled={currentPage === 1}>
                  <PaginationLink
                    onClick={prevPage}
                    previous
                  />
                </PaginationItem>
                <span> {currentPage} / {totalPages} </span>
                <PaginationItem disabled={currentPage === totalPages}>
                  <PaginationLink
                    onClick={nextPage}
                    next
                  />
                </PaginationItem>
                <PaginationItem disabled={currentPage === totalPages}>
                  <PaginationLink
                    onClick={lastPage}
                    last
                  />
                </PaginationItem>
              </Pagination>
            </td>
          </tr>
        </tfoot>
        <tfoot>
          <tr>
            <td colSpan={7}> 
              <RangeSelector fetch={fetchScreensAndPages}/>
            </td>
          </tr>
        </tfoot>
      </Table>
    </>
  );
};

export default PaginatedTable;
