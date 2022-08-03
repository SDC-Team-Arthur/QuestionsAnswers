import http from 'k6/http';
import { sleep, check } from 'k6';
import { Counter } from 'k6/metrics';

export const requests = new Counter('http_reqs');

export const options = {

  // stages: [
  //   { target: 1, duration: '30s' },
  //   { target: 10, duration: '0s' },
  //   { target: 10, duration: '30s' },
  //   { target: 100, duration: '0s' },
  //   { target: 100, duration: '30s' },
  //   { target: 1000, duration: '0s' },
  //   { target: 1000, duration: '30s' },
  // ],
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 1000,
      timeUnit: '1s',
      duration: '50s',
      preAllocatedVUS: 1000,
      maxVUs: 2000
    }
  },
  thresholds: {
    http_req_duration: ['avg<50'],
  },

};

export default function productIdStressTest() {
  const res = http.get('http://localhost:3000/qa/questions?product_id=5')
  sleep(1);

  const checkRes = check(res, {
    '/qa/questions - status is 200': (r) => r.status === 200,
  });
}