const _ = require("lodash");
const jobsData = require("../../data/jobs.json");
const getJob = async (req, res) => {
  let query = req.query;
  let result = [];
  if (_.isEmpty(req.query)) result = jobsData;
  if (query.search && query.companyName && query.salary && query.location) {
    console.log(query.companyName);
    result = jobsData.filter(
      (job) =>
        query.companyName.includes(job.companyName) &&
        job.jobName.toLowerCase().includes(query.search.toLowerCase()) &&
        job.salary >= query.salary &&
        query.location.includes(job.location)
    );
  }
  if (!query.search && !query.salary && query.companyName) {
    result = jobsData.filter((job) =>
      job.companyName.toLowerCase().includes(query.companyName.toLowerCase())
    );
  }
  res.status(200).json(result);
};

module.exports = getJob;
