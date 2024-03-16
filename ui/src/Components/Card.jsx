import React from "react";
import Button from "@mui/material/Button";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Checkbox from "@mui/material/Checkbox";

const Card = ({ data }) => {
  const styles = {
    fontFamily: "'Proxima Nova', Arial, sans-serif",
    fontSize: "14px",
    // letterSpacing: "1.2941335439682007px",
    textAlign: "center",
    borderRadius: 47,
    backgroundColor: "#5CA4A9",
  };

  const calculateDateDifference = (date) => {
    const currentDate = new Date();
    const [year, month, day] = date.split("/");
    const postedDate = new Date(`${year}-${month}-${day}`);
    const differenceInTime = currentDate.getTime() - postedDate.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays;
  };
  return (
    <div className="card mt-1">
      <div className="card-body row">
        {/* Image */}
        <div className="col-2">
          <img
            src={
              data.companyName == "Apple Incorporations"
                ? "https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8ed3d547-94ff-48e1-9f20-8c14a7030a02_2000x2000.jpeg"
                : data.companyName == "Amazon"
                ? "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Amazon_icon.svg/2500px-Amazon_icon.svg.png"
                : data.companyName == "BMW"
                ? "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/2048px-BMW.svg.png"
                : data.companyName == "Incresco"
                ? "https://media.licdn.com/dms/image/C4D0BAQFPUkfxDey_mg/company-logo_200_200/0/1652773034406/incresco_technology_logo?e=2147483647&v=beta&t=77iUGqOs7dP6gPurHc3P5hR6SIFj_P2MIVqOCacI3Sg"
                : ""
            }
            alt={data.companyName}
            style={{ width: "100%", height: "100%", borderRadius: "18.91px" }}
          />
        </div>
        {/* Data */}
        <div className="col-7">
          <div>
            <h5 className="card-title">{data.jobName}</h5>
            <p className="card-text">
              {data.location == "Bengaluru"
                ? `${data.location}, Karnataka, India`
                : data.location == "Chennai"
                ? `${data.location}, Tamilnadu, India`
                : data.location == "Coimbatore"
                ? `${data.location}, Tamilnadu, India`
                : data.location == "Mumbai"
                ? `${data.location}, Maharashtra, India`
                : data.location}
            </p>
            <p className="card-text">{data.companyName}</p>
          </div>
        </div>
        <div className="col-3">
          <div className="skills">
            <p>Skills match</p>
          </div>
        </div>
      </div>
      <div className="card-footer row" style={{ color: "white" }}>
        <div className=" col-6">
          <p>
            Posted {calculateDateDifference(data.postedOn)} day ago .{" "}
            {data.applicants} applicants
          </p>
        </div>
        <div className="col-6 d-flex justify-content-end">
          <Button variant="contained" style={styles}>
            Apply Now
          </Button>

          <Checkbox
            icon={<BookmarkBorderIcon />}
            checkedIcon={<BookmarkIcon />}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
