import React, { Component } from "react";
//import card component when finished
import DatePicker from "../../shared/DatePicker/DatePicker.jsx";
import { FlexRow, FlexColumn } from "../../../custom-components/index";
import { Search } from "../../shared/Search/Search";

class PropertyList extends Component {
  render() {
    return (
      <FlexColumn>
        <FlexRow>
          <Search />
          <DatePicker />;
        </FlexRow>
      </FlexColumn>
    );
  }
}

export default PropertyList;
