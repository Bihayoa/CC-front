import "./Sidebar.css"

import React from 'react'
import RssFeedIcon from '@mui/icons-material/RssFeed';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

export default function Sidebar() {
  return (
    <div className="sidebar">
        <div className="sidebarWrapper">
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <RssFeedIcon className="sidebarIcon"/>
              <span className="sidebarListItemText">Главная лента</span>
            </li>
            <li className="sidebarListItem">
              <LocalFireDepartmentIcon className="sidebarIcon"/>
              <span className="sidebarListItemText">Самые обсуждаемые</span>
            </li>
            <li className="sidebarListItem">
              <HelpOutlineIcon className="sidebarIcon"/>
              <span className="sidebarListItemText">Помощь</span>
            </li>
            <hr className="sidebarHr" />
          </ul>
        </div>
    </div>
  )
}
