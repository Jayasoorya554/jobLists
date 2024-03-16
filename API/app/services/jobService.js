const _ = require("lodash");
const moment = require("moment");

const getJob = async (req, res) => {
  let result = [];
  let data = [];
  try {
    let jobsData = require("../../data/jobs.json");
    if (_.isEmpty(req.query)) result = [...jobsData];
    let queryData = {};
    Object.keys(req.query).map((key) => {
      return (queryData[key] = JSON.parse(req.query[key]));
    });
    // let queryData = {
    //   companyName: ["Divavu", "Toyato", "BlogXS"],
    //   location: ["Bondoboghila"],
    //   // salary: ["1000-10000", "200000"],
    //   jobName: ["Teacher", "Research Associate"],
    //   // education: ["PhD"],
    //   // experience: ["0-2", "8"],
    //   // postedOn: ["7days", "lastmonth"],
    // };
    console.log(queryData);

    jobsData = jobsData?.filter((val) =>
      queryData?.companyName
        ? queryData?.companyName?.includes(val["companyName"])
        : true
    );

    jobsData = jobsData?.filter((val) =>
      queryData?.skills ? queryData?.skills?.includes(val["skills"]) : true
    );

    jobsData = jobsData?.filter((val) =>
      queryData?.jobName ? queryData?.jobName.includes(val["jobName"]) : true
    );
    jobsData = jobsData?.filter((val) =>
      queryData?.education
        ? queryData?.education.includes(val["education"])
        : true
    );

    jobsData = jobsData?.filter((val) =>
      queryData?.location ? queryData?.location.includes(val["location"]) : true
    );
    if (queryData?.experience) {
      for (let timePeriod of queryData.experience) {
        data.push(
          ...jobsData.filter((val) => {
            if (
              timePeriod.split("-")[0] <= val["experience"] &&
              (timePeriod.split("-")[1]
                ? timePeriod.split("-")[1] >= val["experience"]
                : true)
            )
              return val;
          })
        );
      }
      jobsData = data;
    }

    if (queryData?.salary) {
      data = [];
      for (let salary of queryData.salary) {
        data.push(
          ...jobsData.filter((val) => {
            if (
              Number(salary.split("-")[0]) <= val["salary"] &&
              (salary.split("-")[1]
                ? Number(salary.split("-")[1]) >= val["salary"]
                : true)
            )
              return val;
          })
        );
      }

      //   console.log(data);
      jobsData = data;
    }

    if (queryData?.postedOn) {
      data = [];
      for (let postedOn of queryData.postedOn) {
        let timePeriod = postedOn.split(/(\d+)/).filter(Boolean);
        if (timePeriod.length > 1) {
          data.push(
            ...jobsData.filter(
              (val) =>
                moment(val.postedOn, "YYYY-MM-DD").isSame(
                  moment()
                    .subtract(timePeriod[0], timePeriod[1])
                    .format("YYYY-MM-DD")
                ) ||
                moment(val.postedOn, "YYYY-MM-DD").isBetween(
                  moment()
                    .subtract(timePeriod[0], timePeriod[1])
                    .format("YYYY-MM-DD"),
                  moment().format("YYYY-MM-DD")
                ) ||
                moment(val.postedOn, "YYYY-MM-DD").isSame(
                  moment().format("YYYY-MM-DD")
                )
            )
          );
        } else {
          data.push(
            ...jobsData.filter(
              (val) =>
                moment(val.postedOn, "YYYY-MM-DD").isSame(
                  moment()
                    .subtract(1, "month")
                    .startOf("month")
                    .format("YYYY-MM-DD")
                ) ||
                moment(val.postedOn, "YYYY-MM-DD").isBetween(
                  moment()
                    .subtract(1, "month")
                    .startOf("month")
                    .format("YYYY-MM-DD"),
                  moment()
                    .subtract(1, "month")
                    .endOf("month")
                    .format("YYYY-MM-DD")
                ) ||
                moment(val.postedOn, "YYYY-MM-DD").isSame(
                  moment().format("YYYY-MM-DD")
                )
            )
          );
        }
      }
      jobsData = data;
    }
    res.status(200).json(jobsData);
  } catch (error) {
    console.log(error);
    res.status(500).json("Something went worng");
  } finally {
    result.length = 0;
    data.length = 0;
  }
};

module.exports = getJob;
