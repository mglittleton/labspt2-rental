import React, { Component } from "react";
import PropertyCard from "./PropertyCard";
import { FlexColumn, FlexRow } from "custom-components";
import Search from "../shared/Search/Search";
import DatePicker from "../shared/DatePicker/DatePicker";
import { Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

class Properties extends Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: [],
      loading: false,
      error: null
    };
  }
  componentDidMount() {
    this.props.getProperties();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      properties: nextProps.properties,
      loading: nextProps.loading,
      error: nextProps.error
    });
    console.log(this.state);
  }

  // addClickHandle() {
  //   console.log(this.state);
  //   const numOfProps = this.props.properties.length;
  //   if (numOfProps === 1) {
  //     window.alert("we're going to have to change the billing plan");
  //   }
  //   if (numOfProps === 9) {
  //     window.alert("this account needs the discounted rate");
  //   } else this.props.history.push("/dashboard/properties/add");
  // }

  render() {
    return (
      <FlexColumn width="800px" alignCenter style={{ position: "relative" }}>
        <FlexRow width="100%">
          <Search width="40%" />
          <DatePicker />
          <Link to="/dashboard/properties/add">
            <Icon
              name="plus square"
              size="big"
              style={{ margin: "10px" }}
              onClick={this.addClickHandle}
            />
          </Link>
        </FlexRow>
        {console.log(this.props)}
        {this.state.properties.map(property => {
          return (
            <PropertyCard
              image={property.image}
              name={property.name}
              address={
                property.address1 +
                " " +
                property.city +
                " " +
                property.state +
                " " +
                property.zip
              }
              assistants={
                property.assistants.length
                  ? `${property.assistants[0].firstName}`
                  : "Not Assigned"
              }
              occupants={property.occupants}
              buttonFunction={() => this.cardHandleClick(property._id)}
              linkto={`/dashboard/properties/${property._id}`}
            />
          );
        })}
      </FlexColumn>
    );
  }
}

export default Properties;