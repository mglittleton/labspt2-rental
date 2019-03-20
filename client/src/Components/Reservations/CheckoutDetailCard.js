import React, { Component } from "react";
import { Statistic, Icon, Button, Grid } from "semantic-ui-react";
import { FlexRow, FlexColumn } from "custom-components";

class CheckoutDetailCard extends Component {
  constructor(props) {
    super(props);

    this.details = [
      { icon: "moon", option: "Nights", amount: 3 },
      { icon: "users", option: "Guests", amount: 3 },
      { icon: "leaf", option: "Cleaning fee", amount: "$65" }
    ];
  }

  render() {
    return (
      <Grid style={{ width: "800px" }}>
        {this.details.map((detail, ind) => (
          <FlexRow style={{ padding: "10px" }} alignCenter justifyBetween>
            <FlexColumn style={{ paddingRight: "5px" }}>
              <Icon name={detail.icon} size="huge" />
            </FlexColumn>
            <FlexColumn style={{ padding: "5px" }}>
              <Statistic size="tiny">
                <Statistic.Label>{detail.option}</Statistic.Label>
                <Statistic.Value>{detail.amount}</Statistic.Value>
              </Statistic>
            </FlexColumn>
            <FlexColumn style={{ padding: "5px" }}>
              <Button
                size="tiny"
                style={{ marginBottom: "2px", width: "55px" }}
              >
                <Icon alignCenter name="caret up" size="big" />
              </Button>
              <Button size="tiny" style={{ marginTop: "2px", width: "55px" }}>
                <Icon name="caret down" size="big" />
              </Button>
            </FlexColumn>
          </FlexRow>
        ))}
      </Grid>
    );
  }
}

export default CheckoutDetailCard;
