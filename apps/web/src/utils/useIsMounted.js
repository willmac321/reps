import { useEffect, useRef } from 'react';
// copy pasted from
// https://gist.github.com/jaydenseric/a67cfb1b809b1b789daa17dfe6f83daa
// cant be default, needs to be explicitly called
// eslint-disable-next-line
export function useIsMounted() {
  // component is certainly mounted from the beginning
  const componentIsMounted = useRef(true);
  useEffect(
    () =>
      // when non-SSR + (ComponentDidMount or ComponentDidUpdate):
      // do nothing.
      // when non-SSR + ComponentWillUnmount:
      () => {
        componentIsMounted.current = false;
      },
    []
  );
  return componentIsMounted;
}
