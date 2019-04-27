import React, { Component } from "react";
import { FlexColumn, FlexRow } from "custom-components";
import { Button, Dimmer, Header, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import DeleteModal from "./DeleteModal";
import ErrorModal from "./ErrorModal";
import styled from "styled-components";

const Label = styled.span`
  font-weight: bold;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 0.1rem;
  margin-right: 5px;
`;

const Text = styled.span`
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 0.1rem;
`;

class Property extends Component {
  state = {
    errorModalOpen: false,
    deleteModalOpen: false,
    dimmerOpen: false,
    modalMessage: ""
  };
  componentDidMount() {
    this.props.getProperties();
    this.props.getReservations();
  }

  openModal = () => {
    const reservationMatch = this.props.reservations.map(reservation => {
      if (reservation.property == null) {
        return false;
      } else if (reservation.property._id === this.props.match.params.id) {
        return true;
      } else return false;
    });
    if (reservationMatch.includes(true)) {
      this.setState({
        errorModalOpen: true,
        modalMessage: "Active reservation, property cannot be deleted"
      });
    } else {
      this.setState({
        deleteModalOpen: true
      });
    }
  };

  modalClose = () => {
    this.setState({ errorModalOpen: false });
  };
  handleDelete = () => {
    this.props.deleteProperty(this.props.match.params.id);
    this.setState({ dimmerOpen: true, deleteModalOpen: false });
  };
  successClose = () => {
    this.setState({
      dimmerOpen: false
    });
    this.props.history.push("/dashboard/properties");
  };

  render() {
    const property = this.props.properties.find(
      property => property._id === this.props.match.params.id
    );
    return (
      <>
        {property && (
          <div>
            <Dimmer
              size="fullscreen"
              active={this.state.dimmerOpen}
              page
              onClickOutside={this.successClose}
            >
              <Header as="h1" inverted>
                Property Deleted!
                <Header.Subheader>
                  Click to return to Property List
                </Header.Subheader>
              </Header>
            </Dimmer>
            <DeleteModal
              open={this.state.deleteModalOpen}
              submitHandler={this.handleDelete}
            />
            <ErrorModal
              size="mini"
              open={this.state.errorModalOpen}
              modalMessage={this.state.modalMessage}
              modalClose={this.modalClose}
            />
            <FlexRow>
              <FlexColumn justifyBetween>
                <h1>{property.name}</h1>
                <FlexColumn
                  className="address"
                  spaceBottom
                  style={{ color: "gray" }}
                >
                  <FlexRow wrap>{property.address1}</FlexRow>
                  <FlexRow wrap style={{ maxWidth: "200px" }}>
                    {property.city}, {property.state} {property.zip}
                  </FlexRow>
                </FlexColumn>

                <FlexColumn spaceBottom="20px">
                  <FlexRow>
                    <Label>Price per night: </Label>
                    <Text>${property.price}</Text>
                  </FlexRow>
                  <FlexRow>
                    <Label>Max Guests:</Label>
                    <Text> {property.occupants}</Text>
                  </FlexRow>
                  <FlexRow>
                    <Label>Default Employee:</Label>
                    <Text>
                      {property.assistants.length
                        ? `${property.assistants[0].firstName}`
                        : "Not Assigned"}
                    </Text>
                  </FlexRow>
                </FlexColumn>
                <FlexRow>
                  <Link to={`/dashboard/properties/edit/${property._id}`}>
                    <Button content="Edit" color="blue" />
                  </Link>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Button basic color="red" onClick={this.openModal}>
                    Delete
                  </Button>
                </FlexRow>
              </FlexColumn>
              <FlexColumn height="100%" justifyCenter>
                <Image src={`http://res.cloudinary.com/roostr-labpt2/image/upload/c_scale,q_80,r_0,w_640/v1556327124/${property.image}.jpg`} rounded />
              </FlexColumn>
            </FlexRow>
          </div>
        )}
      </>
    );
  }
}
export default Property;
