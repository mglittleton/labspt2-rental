import React, { Component } from "react";
import { FlexColumn, Divider} from "custom-components";
import TaskListItem from "./TaskListItem";
import { Tab, Pagination, Label, Responsive } from "semantic-ui-react";
import TaskListItemDesktop from "./TaskListItemDesktop";
import TaskListItemMobile from "./TaskListItemMobile";

class TaskList extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { loading, tasks, handlePageChange, count, page } = this.props;

    return (
      <FlexColumn alignCenter style={{ position: "relative" }}>
        <Pagination
          className="space-bottom"
          onPageChange={handlePageChange}
          boundaryRange={0}
          firstItem={null}
          lastItem={null}
          ellipsisItem={true}
          siblingRange={1}
          totalPages={count}
          showEllipsis={true}
          activePage={page}
        />

        {this.props.tasks.map((task, ind) => (
          <>
            {/* <Responsive maxWidth={700}>
              <TaskListItemMobile 
                task={task} key={ind}
              />
            </Responsive>
            <Responsive minWidth={701}>
              <TaskListItemDesktop 
                task={task} key={ind}
              />
            </Responsive> */}
            <TaskListItem task={task} key={ind} />
            <Divider />
          </>
        ))}
      </FlexColumn>
    );
  }
}

export default TaskList;
