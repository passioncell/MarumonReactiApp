
const hostURL = "http://marumon.cafe24app.com/";
const getReviewList = (pageNumber: number = 1) => {
  return hostURL + 'review/mobile/list?pageNumber='+pageNumber
};

const getPostEstimateUrl = () => {
  return hostURL + 'estimate/m_consult.do';
};

const getReviewDetailPage = (id: number) => {
  return hostURL + 'review/mobile/detail?id='+id;
};

export {hostURL, getReviewList, getPostEstimateUrl, getReviewDetailPage}