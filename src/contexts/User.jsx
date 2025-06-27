import { createContext, useContext, useEffect, useMemo, useState } from "react";

const UserContext = createContext( null );

export const UserProvider = ( { children } ) => {
  const [ screen, setScreen ] = useState( {
    w: window.innerWidth || 0,
    h: window.innerHeight || 0,
  } );

  useEffect( () => {
    const updateDimensions = () => {
      setScreen( {
        w: window.innerWidth,
        h: window.innerHeight,
      } );
    };

    window.addEventListener( "resize", updateDimensions );
    return () => window.removeEventListener( "resize", updateDimensions );
  }, [] );

  const device = useMemo( () => ( {
    size: screen,
    orientation: screen.w > screen.h ? 'landscape' : 'portrait',
    type: {
      isMobile: screen.w <= 425,
      isTablet: screen.w > 425 && screen.w <= 768,
      isDesktop: screen.w > 768,
    }
  } ), [ screen ] );

  return (
    <UserContext.Provider value={ { device } }>
      { children }
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
  const context = useContext( UserContext );
  if ( !context ) throw new Error( "useUser cant be used outside UserProvider" );
  return context;
};
