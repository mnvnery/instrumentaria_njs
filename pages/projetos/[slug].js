import { request } from "../../lib/datocms"
import { PROJECTS_QUERY, SOUNDS_QUERY, SOCIALS_QUERY } from '../../lib/queries'
import Header from "../../components/Header"
import EmblaCarousel from '../../components/EmblaCarousel'
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import FsLightbox from 'fslightbox-react'; 
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'
import Accordion from "../../components/Accordion"
import { useRouter } from "next/router"

function size(size) {
    if (size === 'small') {
        return 'w-[40vw] h-[40vw] md:w-[20vw] md:h-[20vw] md:m-20'
    }
    if (size === 'medium') {
        return 'w-[55vw] h-[55vw] md:w-[30vw] md:h-[30vw] md:m-10'
    }
    if (size === 'large') {
        return 'w-[103vw] h-[50vh] md:w-[40vw] md:h-[40vw]'
    }
}

function align(align) {
    if (align === 'top') {
        return 'self-start mt-[16vh]'
    }
    if (align === 'middle') {
        return 'self-center'
    }
    if (align === 'bottom') {
        return 'self-end'
    }
}


export default function Project({ data, moreProjects, sounds, socials }) {
    const { locale } = useRouter().locale

    const [lightboxController, setLightboxController] = useState({ 
        toggler: false, 
        slide: 1 
        }); 
        
        function openLightboxOnSlide(name) { 
            setLightboxController({ 
                toggler: !lightboxController.toggler, 
                source: name 
            }); 
        }         

    const questionsAnswers = [
            {
            question: "Sinopse",
            answer: data.sinopse
            },
            {
            question: "Ficha Tecnica",
            answer:
                data.fichaTecnica
            },
    ];
    const allImages = data.galeria.filter(e => e.imagem != undefined).map((img) => img.linkVideo === '' ? img.imagem.url : img.linkVideo)
    return (
        <>
        <Header sounds={sounds} socials={socials}/>
        <div className="pl-24 pb-16 md:pb-0 md:pl-0 flex flex-col justify-center md:h-screen md:flex-row md:justify-start align-middle md:align-baseline">
            <div className="flex flex-col justify-between md:pl-24 md:px-10 pt-16 md:py-5 2xl:py-10 max-w-[80%] md:w-[32%] 2xl:w-[30%] 3xl:w-[25%] text-left text-xl z-10 md:shadow-lg md:shadow-white">
                <div>
                    <h1 className="text-2xl 2xl:text-3xl 3xl:text-4xl">{ data.titulo }</h1>
                    <h3 className="text-base my-4 3xl:text-xl">{ data.autoria }</h3>
                </div>
                <div>
                    <div className="accordion">
                        <Accordion questionsAnswers={questionsAnswers}/>
                    </div>
                    <div className="flex text-xs justify-between mt-8 fixed md:static bottom-0 w-[70%] md:w-full bg-black md:bg-transparent py-3 3xl:text-xl">
                        <Link href={moreProjects[0].slug}><a className="hover:underline flex items-center"><IoIosArrowBack/><span>{locale === 'pt' ? 'anterior' : 'previous'}</span></a></Link>
                        <Link href={moreProjects[1].slug}><a className="hover:underline flex items-center"><span>{locale === 'pt' ? 'seguinte' : 'next'}</span><IoIosArrowForward/></a></Link>
                    </div>
                </div>
            </div>
            <div id='container' className="hidden md:block w-full h-screen  space-y-5  pr-10 md:overflow-y-hidden md:px-10 pt-14 md:pt-5 md:pb-8 2xl:pb-12">
                <EmblaCarousel>
                    {data.galeria.map((w, i) => (
                        <div className="embla__slide flex" key={i}>
                            {(w.imagem != undefined &&
                            <div className={`relative size-${w.tamanho} self-${w.posicao} ${w.imagem.width > w.imagem.height ? 'landscape' : 'portrait'}`} onClick={() => openLightboxOnSlide(w.linkVideo === '' ? w.imagem.url : w.linkVideo)}>
                                <Image src={w.imagem.url} objectFit="cover" width={w.imagem.width} height={w.imagem.height}  objectPosition={`${w.imagem.focalPoint.x * 100}% ${w.imagem.focalPoint.y * 100}%`} />
                            </div>)
                            || (w.texto != undefined &&
                                <div dangerouslySetInnerHTML={{__html: w.texto}} className={`w-[20vw] leading-tight self-${w.posicao}`}/>)
                            }
                        </div>
                    ))}
                </EmblaCarousel>
            </div>
            <div className="mt-5 md:hidden pr-10">
                
                {data.galeria.map((w, i) => (
                    <div key={i}>
                        {(w.imagem != undefined &&
                            <div className={`relative size-${w.tamanho} self-${w.posicao}`} onClick={() => openLightboxOnSlide(w.linkVideo === '' ? w.imagem.url : w.linkVideo)}>
                                <Image src={w.imagem.url} objectFit="cover" width={w.imagem.width} height={w.imagem.height} />
                            </div>)
                            || (w.texto != undefined &&
                                <div dangerouslySetInnerHTML={{__html: w.texto}} className={`my-4 leading-tight font-baskerville self-${w.posicao}`}/>)
                            }
                    </div>
                ))}
            </div>
            <FsLightbox 
            toggler={lightboxController.toggler} 
            sources={allImages} 
            source={lightboxController.source} 
            disableThumbs={true} 
            disableZoom={true}
            svg={{
                    slideButtons: {
                        previous: {
                            width: '30px', 
                            height: '30px',
                            viewBox: '0 0 14.91 27.74',
                            d: 'M13.33,27.74L.2,14.61c-.26-.26-.26-.68,0-.94L13.86,0c.91,.92,1,.82,.84,.98L1.56,14.18l12.74,12.64'
                        },
                        next: {
                            width: '30px', 
                            height: '30px',
                            viewBox: '0 0 14.91 27.74',
                            d: 'M1.44,0L14.57,13.13c.26,.26,.26,.68,0,.94L.9,27.74c-.91-.92-1-.82-.84-.98L13.21,13.56,.47,.93'
                        }
                    }
                }}
            /> 
        </div>
        </>
    )
}
export async function getStaticPaths({locales}) {
    const data = await request({ query: `{ allProjetos { slug } }` });
    const pathsArray = [];
    data.allProjetos.filter(project => project.linkExterno !== '').map((proj) => {
        locales.map((language) => {
            pathsArray.push({ params: { slug: proj.slug }, locale: language });
        });
    });
    console.log(pathsArray)
    return {
        paths: pathsArray,
        fallback: false,
    };
    }

export async function getStaticProps({ params, locale }) {
    const formattedLocale = locale;

    const data = await request({
        query: `{
            allProjetos(locale: ${formattedLocale}) {
                titulo
                autoria
                fichaTecnica
                sinopse
                slug
                outras
                linkExterno
                thumbnail {
                    url
                }
                galeria {
                    ... on ImageRecord {
                      id
                      imagem {
                        url
                        width
                        height
                        focalPoint {
                            x
                            y
                        }
                      }
                      posicao
                      tamanho
                      linkVideo
                    }
                    ... on TextoRecord {
                      id
                      posicao
                      texto
                    }
                }
            }
        }`,
        variables: { slug: params.slug },
    })

    const sounds = await request({
        query: SOUNDS_QUERY,
    })

    const socials = await request({
        query: SOCIALS_QUERY,
    })

    const projects = data.allProjetos.filter(project => project.linkExterno === '');

    const currentProject = projects.find((project) => project.slug === params.slug);
    const currentProjectIndex = projects.findIndex((project) => project.slug === params.slug);
    const prevProject = projects[currentProjectIndex - 1] || projects[projects.length - 1];
    const nextProject = projects[currentProjectIndex + 1] || projects[0];

    if (!currentProject) {
        return {
            project: false,
        };
    }

    return {
        props: {
            data: currentProject,
            moreProjects: [prevProject, nextProject],
            sounds: sounds.home.sons,
            socials: socials.social
        },
    }
}