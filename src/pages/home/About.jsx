import { useUser } from "../../contexts/User.jsx";
const date = new Date();
const stack = [
    { label: "React" },
    { label: "Vite" },
    { label: "Bun" },
    // { label: "Project" },
    // { label: "Template" },
].sort((a, b) => b.label.length - a.label.length)

const deps = [
    { label: "axios", link: "https://www.npmjs.com/package/axios" },
    { label: "lucide-react", link: "https://www.npmjs.com/package/lucide-react" },
    { label: "react", link: "https://www.npmjs.com/package/react" },
    { label: "react-dom", link: "https://www.npmjs.com/package/react-dom" },
    { label: "react-router-dom", link: "https://www.npmjs.com/package/react-router-dom" }
].sort((a, b) => a.label.length - b.label.length)

const info = [
    { label: "272KB", title: 'Build Size - 272KB' },
    { label: "repo", link: "https://github.com/khushalrathore/react-vite-bun" },
    { label: "me", link: "https://github.com/khushalrathore" },
].sort((a, b) => a.label.length - b.label.length)


const scripts = [
    { label: "dev", },
    { label: "host", },
    { label: "build", },
    { label: "lint", },
    { label: "preview", }
].sort((a, b) => a.label.length - b.label.length)

const fnStyles = (e, i, mode) => {
    if (!i.link) return;
    if (mode === 'remove') {
        e.currentTarget.style.background = 'unset';
        e.currentTarget.style.color = 'unset';
        e.currentTarget.style.textDecoration = 'none';
        e.currentTarget.style.cursor = 'default';

        if (i.link) {
            e.currentTarget.style.textDecoration = 'none';
            e.currentTarget.title = 'none'
        }
        return;
    }
    else if (mode === 'apply') {
        e.currentTarget.style.background = 'linear-gradient(108deg, red, orangered)';
        e.currentTarget.style.color = 'white';
        e.currentTarget.style.cursor = 'pointer';
        if (i.link || i.title) {
            e.currentTarget.style.textDecoration = 'underline';
            e.currentTarget.title = i.title ? i.title : (new URL(i.link).href.split("https://")[1])
        }
        return;
    }
}
const preStyles = {

    display: 'inline',
    userSelect: 'none',
    fontSize: '1rem',
    transition: 'all 50ms',
};
const divStyles = {
    userSelect: 'none',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
}

export const About = () => {
    const { device, theme } = useUser()
    return (
        <div style={{ minHeight: 'calc( 100dvh - 2rem )', minWidth: 'calc( 100dvw - 2rem )', position: 'relative', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
            <Absolute children={<Mapper arr={stack} align='start' heading="STACK" />} position="top" align="left" />
            <Absolute children={<Mapper arr={info} align='end' heading="INFO" />} position="top" align="right" />
            <Absolute children={<Mapper arr={scripts} align='start' heading="SCRIPTS" />} position="bottom" align="left" />
            <Absolute children={<Mapper arr={deps} align='end' heading="DEPS" />} position="bottom" align="right" />
            <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', gap: 0, userSelect: 'none' }}>
                {/* <img src={flow} width={'300px'} /> */}
                <pre style={{ fontSize: '33px', fontWeight: '100', fontStyle: 'italic' }}>
                    {'flow'}
                </pre>
                <pre style={{ fontSize: '34px', fontWeight: '100', fontStyle: 'italic' }}>
                    {date.getFullYear()}
                </pre>
            </div>
        </div>
    )
}

const Mapper = ({ heading = '', arr = [], align = 'start' }) => {
    if (!arr.length) return null;
    return (
        <div>
            {
                heading ? <pre style={{ ...preStyles, marginBottom: '0.25rem', textAlign: align, display: 'flex', justifyContent: align, alignItems: 'center' }}>[{heading}]</pre> : ''
            }
            <div style={{ ...divStyles, alignItems: align }}>

                {
                    arr.map((i, _) => (
                        <pre
                            key={_}
                            onClick={(e) => {
                                fnStyles(e, i, "apply");
                                if (i.link) {
                                    try {
                                        const url = new URL(i.link);
                                        window.open(url.href, '_blank', 'noopener,noreferrer');
                                    } catch (e) {
                                        console.error("Invalid URL:", i.link, e);
                                    }
                                }
                            }}
                            onPointerEnter={(e) => fnStyles(e, i, "apply")}
                            onPointerLeave={(e) => fnStyles(e, i, "remove")}
                            style={{ ...preStyles, ...(heading ? align === 'start' ? { marginLeft: '4px' } : { marginRight: '4px' } : {}) }}
                        >
                            {i.label.toUpperCase()}
                        </pre>
                    ))
                }
            </div>
        </div>

    )
}

const Absolute = ({ position = 'bottom', align = 'left', children }) => {
    return (
        <div
            style={{
                position: 'absolute',
                ...(position === 'top' ? { top: '0' } : { bottom: '0', }),
                ...(align === 'left' ? { left: '0' } : { right: '0', }),
                userSelect: 'none',
            }}>
            {children}
        </div>

    )
}