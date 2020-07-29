import http from "../http-common";

async function getByPeriod(period) {
  return http.get(`/api/transaction/period/${period}`);
}

export default {
  getByPeriod,
};
