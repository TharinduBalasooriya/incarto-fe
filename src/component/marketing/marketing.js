import React from "react";
import "./marketing.css";

export default function Marketing() {
  return (
    <div className="marketing-container">
      <h1 className="heading mb-5">
        <center>See how inCarto can help</center>
      </h1>

      <div class="container marketing">
        <div class="row">
          <div class="col-lg-3">
            <img
              class="rounded-circle"
              src="https://res.cloudinary.com/iplus/image/upload/v1650394477/new/Group_1_czzlzk.png"
              alt="Generic placeholder image1"
              width="140"
              height="140"
            />
            <h5 className="mt-3 mb-3">Location Insights</h5>
            <p>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula,
              eget lacinia odio sem nec elit. Cras mattis consectetur purus sit
              amet fermentum.
            </p>

            <a className="btn btn-secondary viewdetails mt-1" href="/" role="button">
              View details &raquo;
            </a>
          </div>
          <div class="col-lg-3">
            <img
              class="rounded-circle"
              src="https://res.cloudinary.com/iplus/image/upload/v1650394923/new/Group_2_stml48.png"
              alt="Generic placeholder image2"
              width="140"
              height="140"
            />

            <h5 className="mt-3 mb-3">Price Prediction</h5>
            <p>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula,
              eget lacinia odio sem nec elit. Cras mattis consectetur purus sit
              amet fermentum.
            </p>

            <a class="btn btn-secondary viewdetails mt-1" href="/" role="button">
              View details &raquo;
            </a>
          </div>
          <div class="col-lg-3">
            <img
              class="rounded-circle"
              src="https://res.cloudinary.com/iplus/image/upload/v1650395238/new/Group_4_skmhbr.png"
              alt="Generic placeholder image3"
              width="140"
              height="140"
            />
            <h5 className="mt-3 mb-3">Preference Analysis</h5>
            <p>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula,
              eget lacinia odio sem nec elit. Cras mattis consectetur purus sit
              amet fermentum.
            </p>

            <a class="btn btn-secondary viewdetails mt-1" href="/">
              View details &raquo;
            </a>
          </div>
          <div class="col-lg-3">
            <img
              class="rounded-circle"
              src="https://res.cloudinary.com/iplus/image/upload/v1650395048/new/Group_3_hbe3fp.png"
              alt="Generic placeholder image4"
              width="140"
              height="140"
            />
            <h5 className="mt-3 mb-3">Seller Support</h5>
            <p>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula,
              eget lacinia odio sem nec elit. Cras mattis consectetur purus sit
              amet fermentum.
            </p>

            <a class="btn btn-secondary viewdetails mt-1" href="/" role="button">
              View details &raquo;
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
