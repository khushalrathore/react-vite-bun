import { useEffect, useState } from 'react';

const randomCase = ( char ) =>
  Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase();

const randomTransform = () => {
  const rotate = Math.random() * 8 - 4;
  const scale = 1 + ( Math.random() * 0.1 - 0.05 );
  return `rotate(${ rotate }deg) scale(${ scale }) translateZ(0)`;
};

export const WavyText = ( { text, styles = {}, interval = 500 } ) => {
  const [ animatedText, setAnimatedText ] = useState(
    text.split( '' ).map( ( char ) => ( {
      char,
      style: {
        transform: 'none',
        color: 'inherit',
      },
    } ) )
  );

  useEffect( () => {
    const intervals = [];

    text.split( '' ).forEach( ( char, i ) => {
      intervals[ i ] = setInterval( () => {
        setAnimatedText( ( prev ) => {
          const updated = [ ...prev ];
          updated[ i ] = {
            char: randomCase( char ),
            style: {
              // transform: randomTransform(),
            },
          };
          return updated;
        } );
      }, interval + Math.random() * 1500 );
    } );

    return () => intervals.forEach( clearInterval );
  }, [ text, interval ] );

  return (
    <div>
      { animatedText.map( ( item, i ) => (
        <span
          key={ i }
          style={ {
            display: 'inline-block',
            transition: 'all 0.4s ease-in-out',
            willChange: 'transform, color',
            ...item.style,
            ...styles
          } }
        >
          { item.char }
        </span>
      ) ) }
    </div>
  );
};
