import React from "react"
import {Dropdown} from "react-bootstrap"

const ToggleTheme = () => {
  return(
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Themes For Colorblind People
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Red-Green</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Blue-Yellow</Dropdown.Item>
      </Dropdown.Menu>
</Dropdown>
  )
}

export default ToggleTheme;