// import puppeteer from "puppeteer";
import api from 'api';

const sdk = api('@lokalise-devhub/v1.0#4jrla2jld4mbb1b');

(async () => {
    sdk.auth('df861ae74823c4aa02576f02f2adf0632361d23f');
    sdk.downloadFiles({project_id: '042a2a6c160abd7b644d1d329540c24e8212', branch: 'master'})
    .then(({ data }) => console.log(data))
    .catch(err => console.error(err));
}) ()