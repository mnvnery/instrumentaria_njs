import Link from "next/link"
import { useRouter } from 'next/router'
import { useRef, useState, useEffect } from "react"
import {RiMenuLine, RiCloseLine, RiInstagramFill, RiYoutubeFill, RiLinkM} from 'react-icons/ri'
import { AiFillFacebook, AiOutlineLink } from 'react-icons/ai'
import {SiLinktree} from 'react-icons/si'
import { useAudioPlayer } from './AudioPlayerContext';


const Header = ({sounds, socials}) => {
    const { locale, locales, asPath } = useRouter();
    const allAudios = [];
    const audioLinks = sounds.map((sound) => allAudios.push(sound.url));
    const router = useRouter();
    const { audio, setAudioSource, isPlaying, setIsPlaying } = useAudioPlayer();
    const [currentAudioIndex, setCurrentAudioIndex] = useState(
        Math.floor(Math.random() * allAudios.length)
    );
        

    useEffect(() => {
        if (audio === null) {
        setAudioSource(allAudios[currentAudioIndex]);
    }
    }, []);

    const audioStart = () => {
    audio.play();
    setIsPlaying(true);
    };

    const audioStop = () => {
    audio.pause();
    setIsPlaying(false);
    };
    const [navShow, setNavShow] = useState(false)
    const ref = useRef()

    useEffect(() => {
        const checkIfClickedOutside = e => {
            // If the menu is open and the clicked target is not within the menu,
            // then close the menu
            if (navShow && ref.current && !ref.current.contains(e.target)) {
            setNavShow(false)
            }
        }
    
        document.addEventListener("mousedown", checkIfClickedOutside)
    
        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [navShow])
    return (
        <>
            <div className="font-apoc flex space-x-4 p-4 2xl:p-8 absolute z-10 right-0 2xl:text-xl">
                <button className={`underline-offset-4 ouvir ${isPlaying ? 'underline' : ''}`} onClick={audioStart}>{locale === 'pt' ? 'ouvir' : 'listen'}</button>
                <button onClick={audioStop} className={`silencio underline-offset-4 ${isPlaying ? '' : 'underline'}`}>{locale === 'pt' ? 'silêncio' : 'silence'}</button>
            </div>
            <div className='fixed bottom-5 right-5 flex justify-start items-center z-10 space-x-3'>
                <a href={socials.linktree}  target='blank' rel='noreferrer' className="block py-1 pr-1 pl-3 md:p-0 text-lg"><SiLinktree/></a>
                <a href={socials.instagram}  target='blank' rel='noreferrer' className="block py-1 pr-1 pl-3 md:p-0"><RiInstagramFill/></a>
                <a href={socials.facebook} target='blank' rel='noreferrer'  className="block py-1 pr-1 pl-3 md:p-0"><AiFillFacebook/></a>
                <a href={socials.youtube}  target='blank' rel='noreferrer' className="block py-1 pr-1 pl-3 md:p-0 text-xl"><RiYoutubeFill/></a>
                
            </div>
            <nav className="px-2 sm:pr-7 sm:pl-3 2xl:px-10 py-2.5 nav-vertical z-30">
                <div className="container flex flex-row-reverse flex-wrap justify-between items-center mx-auto">
                    <button onClick={() => setNavShow(!navShow)}  className="inline-flex items-center text-4xl p-2 ml-3 rounded-lg md:hidden rotate-90">
                        <span className="sr-only">Open main menu</span>
                        <RiMenuLine/>
                    </button>
                    <Link href="/" className="p-2">
                        <a><span className="self-center text-4xl md:text-2xl 2xl:text-3xl ml-16 md:ml-4 font-apoc whitespace-nowrap 3xl:text-4xl">Fernando Mota</span></a>
                    </Link>
                    <div className="hidden md:flex items-center space-x-4">  
                            {locale === 'pt' ? <Link href={asPath} locale={'en'}><a className="text-xs 2xl:text-lg hidden md:block ml-3 py-1 pr-4 pl-3 md:p-0 rotate-90 3xl:text-2xl">EN</a></Link> : <Link href={asPath} locale={'pt'}><a className="text-xs 2xl:text-lg hidden md:block ml-3 py-1 pr-4 pl-3 md:p-0 rotate-90 3xl:text-2xl">PT</a></Link>}
                            <div className={`hidden md:block hover:underline hover:text-yellow-100 ${router.pathname == '/projetos' ? 'underline text-yellow-100' : ''}`}><Link href='/projetos'><a className="ml-3 py-1 pr-4 pl-3 md:p-0 2xl:text-xl 3xl:text-2xl">{locale === 'pt' ? 'Projectos' : 'Projects'}</a></Link></div>
                            <div className={`hidden md:block hover:underline hover:text-yellow-100`}><a href='https://instrumentariapoetica.bandcamp.com' rel="noreferrer" target='_blank' className="ml-3 py-1 pr-4 pl-3 md:p-0 2xl:text-xl 3xl:text-2xl">{locale === 'pt' ? 'Música' : 'Music'}</a></div>
                            <div className={`hidden md:block hover:underline hover:text-yellow-100 ${router.pathname == '/contactos' ? 'underline text-yellow-100' : ''}`}><Link href='/contactos'><a className="ml-3 py-1 pr-4 pl-3 md:p-0 2xl:text-xl 3xl:text-2xl">{locale === 'pt' ? 'Contactos' : 'Contacts'}</a></Link></div>
                            <div className={`hidden md:block hover:underline hover:text-yellow-100 ${router.pathname == '/bio' ? 'underline text-yellow-100' : ''}`}><Link href='/bio'><a className="ml-3 py-1 pr-4 pl-3 md:p-0 2xl:text-xl 3xl:text-2xl">Bio</a></Link></div>
                    </div>  
                </div>
            </nav>
            {navShow && (
            <div ref={ref} className="fixed z-40 w-1/2 md:w-auto bg-black border border-white text-white" id="navbar-default">
                <div className="flex flex-col text-2xl my-3 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                    <button onClick={() => setNavShow(!navShow)} className="inline-flex items-center text-4xl p-2 ml-3 rounded-lg md:hidden">
                        <span className="sr-only">Open main menu</span>
                        <RiCloseLine/>
                    </button>
                    <div className="text-4xl pl-4 mb-4" id="close-btn"><i className="ri-close-fill"></i></div>
                        <div className={`${router.pathname == '/projetos' ? 'underline text-yellow-100' : ''}`}><Link href='/projetos'><a className="ml-3 py-1 pr-4 pl-3 md:p-0">{locale === 'pt' ? 'Projectos' : 'Projects'}</a></Link></div>
                        <div><a href='https://instrumentariapoetica.bandcamp.com' rel="noreferrer" target='_blank' className="ml-3 py-1 pr-4 pl-3 md:p-0">{locale === 'pt' ? 'Música' : 'Music'}</a></div>
                        <div className={`${router.pathname == '/contactos' ? 'underline text-yellow-100' : ''}`}><Link href='/contactos'><a className="ml-3 py-1 pr-4 pl-3 md:p-0">{locale === 'pt' ? 'Contactos' : 'Contacts'}</a></Link></div>
                        <div className={`${router.pathname == '/bio' ? 'underline text-yellow-100' : ''}`}><Link href='/bio'><a className="ml-3 py-1 pr-4 pl-3 md:p-0">Bio</a></Link></div>
                    <div className="py-5 text-base">
                        {locale === 'pt' ? <Link href={asPath} locale={'en'}><a className="block ml-3 py-1 pr-4 pl-3 md:p-0">EN</a></Link> : <Link href={asPath} locale={'pt'}><a className="block ml-3 py-1 pr-4 pl-3 md:p-0">PT</a></Link>}
                        <div className='ml-3 flex justify-start items-center'>
                            <a href={socials.linktree} target="_blank" rel='noreferrer' className="block py-1 pr-1 pl-3 md:p-0 text-xl"><SiLinktree/></a>
                            <a href={socials.instagram} target="_blank" rel='noreferrer' className="block py-1 pr-1 pl-3 md:p-0"><RiInstagramFill/></a>
                            <a href={socials.facebook} target="_blank" rel='noreferrer' className="block py-1 pr-1 pl-3 md:p-0"><AiFillFacebook/></a>
                            <a href={socials.youtube} target="_blank" rel='noreferrer' className="block py-1 pr-1 pl-3 md:p-0 text-xl"><RiYoutubeFill/></a>
                            
                        </div>
                    </div>
                </div>
            </div>
            )}
        </>
    )
}

export default Header