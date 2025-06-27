import { LucideBadgeQuestionMark, LucideBotMessageSquare, LucideFileText, LucideFileVideo, LucideFileVideo2, LucideGithub, LucideInstagram, LucideLink, LucideLink2, LucideMonitorCog, LucideMoon, LucideScrollText, LucideShare, LucideShare2, LucideSquareArrowOutUpRight, LucideSquareArrowUpRight, LucideSun, LucideSunMoon, LucideSwitchCamera, LucideX } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { WavyText } from "../../components";
import { useUser } from "../../contexts/User";

const theme = {
  accent: [ 'orangered' ][ ( Math.floor( Math.random() * 1 ) ) ],
};
const github = {
  repo: 'https://github.com/khushalrathore/react-vite-bun',
  profile: 'https://github.com/khushalrathore',
  md: 'https://raw.githubusercontent.com/khushalrathore/react-vite-bun/refs/heads/main/README.md'
};
const statics = {
  emojis: [ '⚛️', '⚡️', '🍔' ],
  fonts: [ 'FiraCode', 'Fraunces', 'BricolageGrotesque', 'FuturaNow' ],
  github,
  theme,
  styles: {
    _section: {
      width: '100dvw',
      height: '100dvh',
      transition: 'all 250ms ease',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
    },
    _paragraph: {
      fontFamily: 'BricolageGrotesque',
      fontSize: 'clamp(2.5rem, 2vw + 1rem, 3rem)',
      textWrap: 'balance',
      padding: '1rem 0rem',
      borderRadius: '12px',
      color: `light-dark(${ theme.accent },oldlace)`,
      fontWeight: '900',
      transition: 'all 250ms ease',
      position: 'relative',
      overflow: 'hidden',
      userSelect: 'none'
    },
    _emojiWrapper: {
      display: 'inline',
      margin: '0 0.25rem',
      transition: 'all 250ms ease',
      position: 'relative',
      willChange: 'transform, opacity, filter',
    },
    _emojiEnter: {
      animation: 'wobble-in 0.6s ease forwards',
    },
    _emojiVisible: {
      opacity: 1,
      filter: 'blur(0px)',
      transform: 'translate3d(0, 0, 0)',
    },
    _emojiExit: {
      animation: 'wobble-out 0.6s ease forwards',
    },
  },
  steps: [
    { line: "Open Terminal or Command Prompt" },
    { line: "Navigate to the directory where you want to clone the project" },
    { line: `git clone https://github.com/khushalrathore/react-vite-bun <project-name>`, isCode: true },
    { line: "cd <project-name>", isCode: true },
    { isMsg: true, line: "Install dependencies using Bun" },
    { line: "bun install", isCode: true },
    { isMsg: true, line: "Start the development server" },
    { line: "bun run dev", isCode: true },
    { line: "🎉 You're all set! Start building your app in `src/`." },
    { isMsg: true, line: "Optional: To contribute, fork the repo and open PRs freely." },
    { isMsg: true, line: "Note: If you're building a project, feel free to reset `pages/home` to make it your own." },
    { line: "Read More", isLink: true, link: github.md }
  ]
};


export const Home = () => {
  const { device } = useUser();
  const showRef = useRef( null );
  const [ render, setRender ] = useState( false );
  useEffect( () => {
    showRef.current = setTimeout( () => {
      setRender( true );
    }, 300 );
    return () => clearTimeout( showRef.current );
  } );
  return (
    <div style={ {
      transition: 'all 250ms',
      opacity: render ? 1 : 0,
    } }>
      {
        render ?
          <>
            <AccentBlob />
            <MainContent />
            <ThemeSwitcher />
          </>
          : ''
      }
    </div>
  );
};
const MainContent = () => {
  const [ current, setCurrent ] = useState( {
    emoji: statics.emojis[ 0 ],
    font: statics.fonts[ 0 ]
  } );
  const [ emojiState, setEmojiState ] = useState( 'visible' );
  const intervalRef = useRef( null );

  useEffect( () => {
    let i = {
      font: 0,
      emoji: 0
    };
    intervalRef.current = setInterval( () => {
      setEmojiState( 'exit' );

      setTimeout( () => {
        i.emoji += 1;
        i.font += 1;
        const nextEmoji = statics.emojis[ i.emoji % statics.emojis.length ];
        const nextFont = statics.fonts[ i.font % statics.emojis.length ];
        setCurrent( { emoji: nextEmoji, font: nextFont } );
        setEmojiState( 'enter' );

        setTimeout( () => setEmojiState( 'visible' ), 100 );
      }, 250 );
    }, 2000 );

    return () => clearInterval( intervalRef.current );
  }, [] );

  const { device } = useUser();
  const [ isHovered, setIsHovered ] = useState( false );

  const textToShow = useMemo( () => {
    const emojiStyle = {
      ...statics.styles._emojiWrapper,
      ...( emojiState === 'enter'
        ? statics.styles._emojiEnter
        : emojiState === 'exit'
          ? statics.styles._emojiExit
          : statics.styles._emojiVisible ),
    };

    const emojiNode = (
      <span
        key={ current.emoji }
        style={ { ...emojiStyle } }
      >{ current.emoji }
      </span>
    );
    return (
      <div style={ { display: 'flex', flexDirection: 'column', gap: 0, transition: 'all 250ms ease', cursor: 'pointer' } }>
        <div
          onClick={ () => {
            setIsHovered( p => !p );
          } }
          style={ {
            fontFamily: "Fraunces", fontWeight: '500',
            transition: 'all 250ms ease-in-out',
            fontSize: !device?.type?.isMobile && !isHovered ? '53.5%' : '',
          } }>
          <em style={ {
            fontFamily: "Fraunces",
            fontWeight: '200',
            transition: 'all 250ms ease'
          } }>
            finally,{ " " }
          </em>
          a useful { emojiNode } template
        </div>

        <span
          onClick={ () => {
            if ( isHovered ) window.open( statics.github.repo );
          } }
          title={ statics.github.repo }
          style={ {
            display: isHovered ? 'flex' : 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: isHovered ? 1 : 0,
            transitionBehavior: 'allow-discrete',
            transition: 'all 250ms ease-in-out',
            fontSize: device?.type?.isMobile ? '23.5%' : !isHovered ? '30.5%' : '42.5%',
            fontWeight: device?.type?.isMobile ? '500' : '100',
            marginTop: device?.type?.isMobile ? '0.5rem' : '0',
            fontFamily: 'FiraCode',
            color: device?.type?.isMobile ? 'light-dark(red,white)' : 'FiraCode',
            cursor: isHovered ? 'alias' : 'default',
          } }>
          <WavyText
            styles={ {
              opacity: device?.type?.isMobile ? 0.5 : isHovered ? 0.65 : 0
            } }
            text={ statics.github.repo?.split( "/react-vite-bun" )?.[ 0 ] }
            interval={ 200 }
          />
          /react-vite-bun
        </span>
      </div>
    );
  }, [ emojiState, current.emoji, device?.type?.isMobile, isHovered ] );

  const [ iconHover, setIconHover ] = useState( false );
  const showRef = useRef( null );

  useEffect( () => {
    showRef.current = setTimeout( () => {
      if ( !device?.type?.isMobile ) {
        setIsHovered( true );
      }
    }, 300 );
    return () => clearTimeout( showRef.current );
  }, [] );


  return (
    <section
      style={ { ...statics.styles._section } }>
      <div
        id="sectionDiv"
        style={ {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        } }

        onMouseEnter={ () => {
          if ( !isHovered ) {
            setIsHovered( true );
            return;
          };
          return;
        } }
      >

        <div style={ statics.styles._paragraph }>{ textToShow }</div>
        <div
          onMouseEnter={ () => setIconHover( true ) }
          onMouseLeave={ () => setIconHover( false ) }
          onBlur={ () => setIconHover( false ) }
          onClick={ () => window.open( statics.github.profile ) }
          title={ statics.github.profile }
          style={ {
            position: 'absolute',
            bottom: '1rem',
            right: '1rem',
            cursor: 'pointer',
            width: '28px',
            height: '28px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            willChange: 'transform',
            transition: 'all 250ms ease',
            userSelect: 'none',
            borderRadius: '50%',
            padding: '3px',
            background: iconHover ? `light-dark(${ statics.theme.accent },white)` : 'transparent',
            scale: '1',
            color: iconHover ? `light-dark(white,black)` : `light-dark(${ statics.theme.accent },white)`,
          } }
        >
          <LucideGithub
            strokeWidth={ '1px' }
            size={ '28' }
          />
        </div>
        <div style={ {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem'
        } }>
          <HowTo />
        </div>
      </div>
    </section>
  );
};

const AccentBlob = () => {
  const [ show, setShow ] = useState( false );
  const showRef = useRef( null );
  const { device } = useUser();
  useEffect( () => {
    showRef.current = setTimeout( () => setShow( true ), 300 );
    return () => clearTimeout( showRef.current );
  } );
  return (
    <div style={ {
      width: "100dvw",
      height: "200px",
      position: "absolute",
      ...( device?.type?.isMobile ? {
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        opacity: !show ? 0 : 0.1,
        filter: "blur(100px)",

      } :
        {
          top: "-12%",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: !show ? 0 : 0.5,
          filter: "blur(40px)",

        } ),
      borderRadius: "100% / 100%",
      background: "linear-gradient(90deg,light-dark(rgba(255, 106, 61, 1),rgba(255, 106, 61, 0.5)),light-dark(rgba(255, 178, 71, 1),rgba(255, 178, 71, 0.5)))",
      backgroundSize: "200% 100%",
      backgroundPosition: "0% 50%",
      transition: 'all 250ms',
      animation: "gradientShift 10s ease-in-out infinite",
      pointerEvents: "none",
      zIndex: -1
    } } />
  );
};




const HowTo = () => {
  const dialogRef = useRef( null );
  const [ open, setOpen ] = useState( false );
  const [ iconHover, setIconHover ] = useState( {
    open: false,
    close: false
  } );
  function handleOpen () {
    if ( dialogRef.current ) {
      setOpen( true );
      dialogRef.current.showModal();
    }
  }

  function handleClose () {
    if ( dialogRef.current ) {
      setOpen( false );
      dialogRef.current.close();
    }
  }

  useEffect( () => {
    const dialog = dialogRef.current;

    function handleClickOutside ( e ) {
      if ( !dialog ) return;
      const rect = dialog.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      if ( !inside ) handleClose();
    }

    if ( open ) {
      dialog.addEventListener( "click", handleClickOutside );
    }

    return () => {
      if ( dialog ) dialog.removeEventListener( "click", handleClickOutside );
    };
  }, [ open ] );

  const { device } = useUser();
  return (
    <div>
      <button
        onMouseEnter={ () => {
          setIconHover( {
            open: true,
            close: false
          } );
        } }
        onMouseLeave={ () => {
          setIconHover( {
            open: false,
            close: false
          } );
        } }
        style={ {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '0.5rem',
          width: '28px',
          height: '28px',
          cursor: 'pointer',
          border: 'none',
          fontSize: '14px',
          borderRadius: '10dvw',
          padding: '0.25em 0.4045em',
          fontFamily: 'FiraCode',
          transition: 'all 250ms ease',
          boxShadow: !iconHover.open ? 'inset 10px 10px 100px rgba(255, 77, 0, 0.17)' : 'none',
          background: iconHover.open ? `light-dark(${ statics.theme.accent },#1c1c1c)` : `light-dark(whitesmoke,oldlace)`,
          scale: '1',
          outline: 'none',
          color: iconHover.open ? `light-dark(white,whitesmoke)` : `light-dark(${ statics.theme.accent },black)`,
        } } onClick={ handleOpen }>
        <LucideBadgeQuestionMark size={ '18' } strokeWidth={ '1px' } />
      </button>
      <dialog style={ {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%) scale(${ open ? 1 : 0 })`,
        transformOrigin: 'center',
        borderRadius: '0.5em',
        transition: 'all 250ms ease',
        opacity: open ? 1 : 0,
        border: 'none',
        transitionBehavior: 'allow-discrete',
        width: device?.type?.isMobile ? '100dvw' : '50dvw',
        height: device?.type?.isMobile ? '87dvh' : ``,
        backdropFilter: 'blur(20px)',
        background: `light-dark(rgba(255,255,255,0.75),rgb(17, 17, 16))`
      } } ref={ dialogRef } onClose={ () => setOpen( false ) }>
        <div style={ {
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'start',
          flexDirection: 'column',
          alignItems: 'start',
          gap: '0rem'
        } }>
          <div style={ {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'end',
            gap: '0rem'
          } }>
            <p style={ {
              textAlign: 'start',
              padding: '0.5rem 1rem',
              marginBottom: '-0.5rem',
              fontFamily: 'FiraCode',
              textDecoration: 'underline',
              textDecorationColor: `light-dark(${ statics.theme.accent },white)`,
              textDecorationStyle: 'wavy',
              textDecorationThickness: '1px',
              textUnderlineOffset: '3px'
            } }>react-vite-bun-how-to</p>
            <div style={ {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '0.25rem',
              marginBottom: '2px'
            } }>
            </div>
          </div>
          <Steps steps={ statics.steps } />
          <button
            autoFocus='off'
            onMouseEnter={ () => {
              setIconHover( {
                open: false,
                close: true
              } );
            } }
            onMouseLeave={ () => {
              setIconHover( {
                open: false,
                close: false
              } );
            } }
            style={ {
              gap: '0.5rem',
              width: '28px',
              height: '28px',
              cursor: 'pointer',
              border: `none`,
              fontSize: '14px',
              borderRadius: '10dvw',
              padding: '0.25em 0.4045em',
              fontFamily: 'FiraCode',
              transition: 'all 250ms ease',
              outline: 'none',
              scale: device?.type?.isMobile ? '0.85' : '0.9',
              position: 'absolute',
              top: device?.type?.isMobile ? '0.65rem' : '0.9rem',
              right: device?.type?.isMobile ? '0.65rem' : '0.9rem',
              boxShadow: !iconHover.close ? 'inset 10px 10px 100px light-dark(rgba(255, 77, 0, 0.27),rgba(45, 14, 0, 0.04))' : 'none',
              background: iconHover.close ? `light-dark(${ statics.theme.accent },rgb(36, 36, 36))` : `light-dark(white,oldlace)`,
              color: iconHover.close ? `light-dark(white,whitesmoke)` : `light-dark(${ statics.theme.accent },black)`,
            } } onClick={ handleClose }>
            <LucideX size={ '18' } strokeWidth={ '1px' } />
          </button>
        </div>
        <div style={ {
          position: 'absolute',
          bottom: '1rem',
          right: '2rem'
        } }>
        </div>
      </dialog>
      {
        !open ? '' :
          <div
            style={ {
              position: 'absolute',
              inset: 0,
              backdropFilter: 'blur(15px)'
            } }
          >
            { ' ' }
          </div>
      }
    </div>
  );
};



const Steps = ( { steps = [] } ) => {
  return (
    <div style={ {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'start',
      alignItems: 'start',
      gap: '0.75rem',
      padding: '1rem',
      textWrap: 'balance',
      wordBreak: 'break-word',
      whiteSpace: 'balance'
    } }>
      {
        steps.length > 0 &&
        ( () => {
          let customIndex = 1;
          return steps.map( ( step, i ) => {
            const showIndex = !step?.isMsg;
            const indexToShow = customIndex;
            if ( showIndex ) customIndex++;
            return (
              <div key={ i } style={ {
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'start',
                fontSize: '14px',
                gap: 0
              } }>
                {
                  step?.isMsg ?
                    <pre style={ {
                      marginTop: '1px',
                      fontSize: '12px',
                      fontFamily: 'FiraCode'
                    } }>{ '-> ' }</pre>
                    :
                    step?.isLink ?
                      <pre
                        onClick={ () => window.open( step?.link ) }
                        style={ {
                          marginTop: '1px',
                          fontSize: '12px',
                          fontFamily: 'FiraCode',
                        } }>{ '   ' }</pre>
                      :
                      <pre style={ {
                        marginTop: '1px',
                        fontSize: '12px'
                      } }>{ indexToShow }. </pre>
                }
                <div>
                  {
                    step?.isCode ?
                      <pre style={ {
                        textAlign: 'start',
                        background: 'light-dark(gainsboro,rgba(255,255,255,0.1))',
                        borderRadius: '5px',
                        paddingInline: '5px',
                        userSelect: 'all',
                        textWrap: 'balance',
                        wordBreak: 'break-all',
                        whiteSpace: 'balance',
                        fontFamily: 'FiraCode'
                      } }>{ step?.line }</pre>
                      :
                      step?.isLink ?
                        <pre
                          onClick={ () => window.open( step?.link ) }
                          style={ {
                            textAlign: 'start',
                            textWrap: 'balance',
                            wordBreak: 'break-all',
                            fontFamily: 'FiraCode',
                            cursor: 'pointer',
                            textDecoration: 'underline'
                          } }>{ step?.line }</pre> :
                        <p style={ {
                          fontFamily: 'system-ui',
                          textAlign: 'start',
                          textWrap: 'balance',
                          wordBreak: 'break-word',
                        } }>{ step?.line }</p>
                  }
                </div>
              </div>
            );
          } );
        } )()
      }

    </div>
  );
};
const ThemeSwitcher = () => {
  const [ mode, setMode ] = useState( "" );
  const [ currentMode, setCurrentMode ] = useState( "" );
  useEffect( () => {
    const isDarkMode = window.matchMedia( '(prefers-color-scheme: dark)' ).matches;
    if ( isDarkMode ) {
      setCurrentMode( 'd' );
    } else {
      setCurrentMode( 'l' );
    }

  }, [] );
  function handleDarkMode () {
    setMode( 'dark' );
    document.documentElement.style.setProperty( 'color-scheme', 'only dark' );
  }
  function handleLightMode () {
    setMode( 'light' );
    document.documentElement.style.setProperty( 'color-scheme', 'only light' );
  }
  function handleSystemMode () {
    setMode( 'system' );
    document.documentElement.style.setProperty( 'color-scheme', 'light dark' );
  }

  return (
    <div
      style={ {
        position: 'absolute',
        bottom: '1rem',
        left: '1rem',
        cursor: 'pointer',
        zIndex: 0
      } }

    >
      {
        mode.startsWith( 'd' )
          ? <LucideSun color={ `light-dark(${ statics.theme.accent },white)` } strokeWidth={ '1px' } onClick={ () => handleLightMode() } size={ '24' }
          />
          : mode.startsWith( 'l' )
            ? <LucideMoon strokeWidth={ '1px' } color={ `light-dark(${ statics.theme.accent },white)` } onClick={ () => handleDarkMode() } size={ '24' }
            />
            : <LucideSunMoon color={ `light-dark(${ statics.theme.accent },white)` } strokeWidth={ '1px' } onClick={ () => {
              currentMode.startsWith( 'd' ) ? handleLightMode() : handleDarkMode();
            } } size={ '24' }
            />
      }
    </div>
  );
};