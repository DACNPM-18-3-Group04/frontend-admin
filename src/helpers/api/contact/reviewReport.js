import api, { getAuthConfig } from '..';
const baseURL = '/contact/review/report';

export const getReviewReportList = () =>
  api.get(`${baseURL}/all`, getAuthConfig());

export const updateReportStatus = (reportID, stx = 'S') =>
  api.put(`${baseURL}?report_id=${reportID}`, { status: stx }, getAuthConfig());
