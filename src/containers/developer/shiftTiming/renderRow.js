import React from "react";
import { Button } from "react-bootstrap";

const RenderRows = ({ timing, onDrop, onSwap }) => {
  return (
    <React.Fragment>
      {timing.map(time => (
        <tr key={time._id}>
          <td>{time._id}</td>
          <td>{time.day}</td>
          <td>{time.startTime}</td>
          <td>{time.endTime}</td>
          <td>
            <Button data-testid="drop" onClick={() => onDrop(time)}>
              Drop
            </Button>
          </td>
          <td>
            <Button data-testid="swap" onClick={() => onSwap(time)}>
              Swap
            </Button>
          </td>
        </tr>
      ))}
    </React.Fragment>
  );
};

export default RenderRows;
