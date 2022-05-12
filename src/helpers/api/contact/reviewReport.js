import api, { getAuthConfig } from '..';
const baseURL = '/contact/review/report';

export const getReviewReportList = (limit = 5) =>
  api.get(`${baseURL}?limit=${limit}`, getAuthConfig());

export const updateReportStatus = (reportID, stx = 'S') =>
  api.put(`${baseURL}?report_id=${reportID}`, { status: stx }, getAuthConfig());
