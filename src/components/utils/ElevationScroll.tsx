import { useScrollTrigger } from '@mui/material';
import React from 'react';

type Props = { window?: () => Window; children: React.ReactElement };

const ElevationScroll = (props: Props) => {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    className: trigger
      ? children.props.className + ' elevated'
      : children.props.className,
  });
};

export default ElevationScroll;
