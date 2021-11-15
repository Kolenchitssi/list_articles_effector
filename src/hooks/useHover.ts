/* eslint-disable consistent-return */
import React, { createRef, useEffect, useRef, useState } from 'react';
import { TypeReference } from 'typescript';

const ref1 = useRef(null);

export default function useHover(ref: React.MutableRefObject<any>) {
  const [isHovering, setHovering] = useState(false);

  const on = () => setHovering(true);
  const off = () => setHovering(false);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const node = ref.current;

    node.addEventListener('mouseenter', on);
    node.addEventListener('mousemove', on);
    node.addEventListener('mouseleave', off);

    return function () {
      node.removeEventListener('mouseenter', on);
      node.removeEventListener('mousemove', on);
      node.removeEventListener('mouseleave', off);
    };
  }, []);
}
