import { useState, useEffect } from "react";

const ACTIONS = ["View", "Reply"];

const formatAsCurrency = (int) => {
  // TODO
  if (typeof int === "number") {
    return `$${int.toLocaleString()}`;
  }
  return int;
};

const Listing = (car) => {
  // TODO
  // This should be the component which renders an individual listing to the page
  return (
    <div key={car.title} className="listing__item">
      <div className="listing__item-title">{car.title}</div>
      <div className="listing__item-details">
        <span className="listing__item-price">
          {formatAsCurrency(car.price)}
        </span>
        <span className="listing__item-location">{car.location}</span>
      </div>
      {car.imgUrl && (
        <img
          alt={car.title}
          className="listing__item-img"
          src={`http://localhost:3000${car.imgUrl}`}
        />
      )}
      <div className="listing__item-description">{car.description}</div>
      <div className="listing__item-buttons-group">
        <button
          className="listing__item-button"
          onClick={() => console.log(`${ACTIONS[0]}: ${car.title}`)}
        >
          View
        </button>
        <button
          className="listing__item-button"
          onClick={() => console.log(`${ACTIONS[1]}: ${car.title}`)}
        >
          Reply
        </button>
      </div>
    </div>
  );
};

const renderResponse = ({ cars, requestError }) => {
  if (requestError) {
    return <div className="response__error">{requestError}</div>;
  }

  if (!cars) {
    return <div className="response__placeholder">Loading...</div>;
  }

  if (cars.length === 0) {
    return <div className="response__placeholder">No result</div>;
  }

  return cars.map((car) => Listing(car));
};

const Listings = (props) => {
  // TODO
  // This component should make a request to the api endpoint (props.dataEndpoint)
  // then render the result as set of listings as per the design mocks
  // check props passed in from parent for other values that you may need to use

  const { dataEndpoint, keyword, location } = props;
  const [cars, setCars] = useState(undefined);
  const [requestError, setRequestError] = useState(undefined);

  useEffect(() => {
    fetch(`http://localhost:3000${dataEndpoint}`)
      .then((response) => response.json())
      .then((data) => {
        setCars(data);
      })
      .catch(() =>
        setRequestError("Request failed, please refresh this page again")
      );
  }, []);

  return (
    <div>
      <div className="listings__header">
        <div className="listings__header_title">Search Results</div>
        <div className="listings__header_summary">
          <span className="listings__header_highlight">
            {cars ? cars.length : 0} results&nbsp;
          </span>
          for
          <span className="listings__header_highlight">
            &nbsp;{keyword}&nbsp;
          </span>
          in
          <span className="listings__header_highlight">&nbsp;{location}</span>
        </div>
      </div>
      <div className="listings__grid">
        {renderResponse({ cars, requestError })}
      </div>
    </div>
  );
};

export default Listings;
