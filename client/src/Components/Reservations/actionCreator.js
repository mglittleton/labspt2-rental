import axios from "axios";
import * as actions from "./actions";
import config from "config";

export const getReservations = (filterSort = {}) => dispatch => {
  const { filter, sort, page, limit } = filterSort;

  dispatch({ type: actions.RESERVATION_STARTED });

  return axios
    .get(
      `${
        config.apiUrl
      }/api/reservations?filter=${filter}&sort=${sort}&limit=${limit}&skip=${(page -
        1) *
        limit}`
    )
    .then(({ data }) => {
      dispatch({ type: actions.RESERVATION_SUCCESS, notes: data });
    })
    .catch(err => {
      dispatch({ type: actions.RESERVATION_FAILURE, error: err });
    });
};
