import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import { getPriceQueryParams } from '../helpers/helpers';
import { PRODUCT_CATEGORIES } from '../../constants/categories';
import StarRatings from "react-star-ratings";

const Filters = () => {

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);

  let [searchParams] = useSearchParams();

  const navigate = useNavigate();

  useEffect(() => {
    searchParams.has("min") && setMin(searchParams.get("min"));
    searchParams.has("max") && setMax(searchParams.get("max"))
  }, [])


  const handleClick = (checkbox) => {

    const checkboxes = document.getElementsByName(checkbox.name);

    checkboxes.forEach(item => {
      if (item !== checkbox) {
        item.checked = false;
      }
    });

    if (checkbox.checked === false) {
      // delete from query
      if (searchParams.has(checkbox.name)) {
        searchParams.delete(checkbox.name);
        const path = window.location.pathname + "?" + searchParams.toString();
        navigate(path);
      }
    } else {
      if (searchParams.has(checkbox.name)) {
        searchParams.set(checkbox.name, checkbox.value)
        const path = window.location.pathname + "?" + searchParams.toString();
        navigate(path);
      } else {
        searchParams.append(checkbox.name, checkbox.value)
        const path = window.location.pathname + "?" + searchParams.toString();
        navigate(path);
      }
    }


  }


  const handleDefaultCheck = (checkboxType, checkboxValue) => {
    const value = searchParams.get(checkboxType);

    if (checkboxValue === value) return checkboxValue = true;
    return checkboxValue = false;
  }

  const handleButtonClick = (e) => {

    e.preventDefault();

    searchParams = getPriceQueryParams(searchParams, "min", min);
    searchParams = getPriceQueryParams(searchParams, "max", max);

    const path = window.location.pathname + "?" + searchParams.toString();
    navigate(path);

  }




  return (
    <div className="border p-3 filter">
      <h3>Filters</h3>
      <hr />
      <h5 className="filter-heading mb-3">Price</h5>
      <form
        id="filter_form"
        className="px-2"
        onSubmit={handleButtonClick}
      >
        <div className="row">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Min ($)"
              name="min"
              value={min}
              onChange={(e) => setMin(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Max ($)"
              value={max}
              onChange={(e) => setMax(e.target.value)}
            />
          </div>
          <div className="col">
            <button type="submit" className="btn btn-primary">GO</button>
          </div>
        </div>
      </form>
      <hr />
      <h5 className="mb-3">Category</h5>

      {PRODUCT_CATEGORIES?.map((category) => {
        return <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="category"
            id="check4"
            value={category}
            defaultChecked={handleDefaultCheck("category", category)}
            onClick={(e) => handleClick(e.target)}
          />
          <label className="form-check-label" for="check4">{category}</label>
        </div>
      })}


      <hr />
      <h5 className="mb-3">Ratings</h5>

      {[5, 4, 3, 2, 1].map((rating) => {
        return <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="rating"
            id="check8"
            value={rating}
            defaultChecked={handleDefaultCheck("rating", rating?.toString())}
            onClick={(e) => handleClick(e.target)}
          />
          <StarRatings
            rating={rating}
            starRatedColor="#ffb829"
            numberOfStars={5}
            starDimension="21px"
            starSpacing="1px"
            name='rating'
          />
        </div>
      })}
    </div>
  )
}

export default Filters;