"use client";

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const ContextMenuItem = (props) => {
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (props.active) {
      setActive(props.active);
      setPosition({ x: props.position.x, y: props.position.y });
      setTimeout(() => setVisible(true), 50);
    } else {
      setVisible(false);
      setTimeout(() => setActive(false), 350);
    }
  }, [props.active]);

  useEffect(() => {
    setPosition({ x: props.position.x, y: props.position.y });
  }, [props.position]);

  if (active) {
    const getStyles = () => {
      const left = visible ? position.x + props.offset.x : position.x;
      const opacity = visible ? 1 : 0;
      const top = visible ? position.y + props.offset.y : position.y;

      return {
        left: `${left}px`,
        opacity,
        top: `${top}px`,
        transitionDelay: `${props.index * 50}ms`,
      };
    };

    return ReactDOM.createPortal(
      <button type="button" className="context-menu-item" style={getStyles()}>
        <i className={props.icon} />
        <h1>{props.name}</h1>
      </button>,
      document.getElementById('app')
    );
  }

  return null;
};

const RightClick = (props) => {
  const [active, setActive] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const [menuRadius, setMenuRadius] = useState(100);
  const [itemRadius, setItemRadius] = useState(25);

  const [contextMenuItems, setContextMenuItems] = useState([]);

  useEffect(() => {
    // Only for CodePen preview
    setTimeout(() => {
      const centerX = window.innerWidth / 2 - menuRadius / 4;
      const centerY = window.innerHeight / 3 - menuRadius / 4;

      setPosition({ x: centerX, y: centerY });

      setActive(true);
    }, 500);
  }, []);

  useEffect(() => {
    setContextMenuItems([
      { name: 'Cut', icon: 'fas fa-cut' },
      { name: 'Copy', icon: 'far fa-copy' },
      { name: 'Paste', icon: 'fas fa-paste' },
      { name: 'Comment', icon: 'far fa-comment' },
      { name: 'Like', icon: 'far fa-thumbs-up' },
      { name: 'Delete', icon: 'fas fa-trash' },
    ]);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      const items = document.getElementsByClassName('context-menu-item');

      if (items && items.length > 0) {
        let count = 0;

        for (let i = 0; i < items.length; i++) {
          if (items[i].contains(e.target)) {
            count++;
          }
        }

        if (count === 0) {
          setActive(false);
        }
      } else {
        setActive(false);
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const handleOnContextMenu = (e) => {
    e.preventDefault();
    setActive(true);

    // Added some barriers for the menu position so it doesn't extend off the screen
    const x = Math.min(
      Math.max(menuRadius + 10, e.clientX - itemRadius),
      window.innerWidth - menuRadius * 1.5 - 10
    );
    const y = Math.min(
      Math.max(menuRadius + 10, e.clientY - itemRadius),
      window.innerHeight - menuRadius * 1.5 - 10
    );

    setPosition({ x, y });
  };

  const getContextMenuItems = () => {
    const getOffset = (index) => {
      const step = (2 * Math.PI) / contextMenuItems.length;
      const angle = index * step;

      const x = Math.round(
        menuRadius +
          menuRadius * Math.cos(angle) -
          itemRadius -
          (menuRadius - itemRadius)
      );
      const y = Math.round(
        menuRadius +
          menuRadius * Math.sin(angle) -
          itemRadius -
          (menuRadius - itemRadius)
      );

      return { x, y };
    };

    return contextMenuItems.map((item, index) => {
      return (
        <ContextMenuItem
          key={item.name}
          index={index}
          name={item.name}
          icon={item.icon}
          active={active}
          position={position}
          offset={getOffset(index)}
        />
      );
    });
  };

  return (
    <div id="app" onContextMenu={handleOnContextMenu}>
      {getContextMenuItems()}
      <div id="instructions">
        <h1>Right-click to open, left-click to close</h1>
      </div>
    </div>
  );
};

export default RightClick;