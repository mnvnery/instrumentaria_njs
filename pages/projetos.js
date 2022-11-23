import Image from 'next/image'
import { request } from "../lib/datocms"
import { SOUNDS_QUERY, SOCIALS_QUERY } from '../lib/queries'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '../components/Header'
import {useRouter} from "next/router"

export async function getStaticProps({locale}) {
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
        }`  
    })

    const sounds = await request({
        query: SOUNDS_QUERY,
    })

    const socials = await request({
        query: SOCIALS_QUERY,
    })
    return {
        props: {
        data: data.allProjetos,
        sounds: sounds.home.sons,
        socials: socials.social
        },
    }
}

export default function Projetos({data, sounds, socials}) {

    const { locale, locales, asPath } = useRouter().locale;
    const projetos = data.filter(project => project.outras === false)
    const outras = data.filter(project => project.outras === true && project.linkExterno === '')
    const links = data.filter(project => project.outras === true && project.linkExterno != '')
    const [img, setImg] = useState('/bg-1.jpg')

    const handleHover = event => {
        if (event.target.getAttribute('data-hover') === null) {
            null
        } else {
            setImg(event.target.getAttribute('data-hover'))
        }
    }
    return (
        <>
        <Header sounds={sounds} socials={socials}/>
        <div className="flex justify-center md:justify-start align-middle md:align-baseline">
            <div className="pl-1 md:bg-black md:pl-24 md:px-16 pt-16 md:py-5 2xl:py-10 2xl:pr-20 max-w-[50%] md:max-w-[25%] 2xl:max-w-[24%] 3xl:max-w-[20%] text-center md:text-left text-xl md:flex md:flex-col md:justify-between z-10 md:shadow-lg md:shadow-white md:-translate-x-full slide-in 2xl:text-3xl 3xl:text-4xl space-y-4">
                {projetos.map((project, i) =>
                (
                    project.linkExterno === '' ?
                        <div key={i} data-hover={`${project.thumbnail ? project.thumbnail.url : ''}`} onMouseOver={handleHover} className="projects hover:text-yellow-100 hover:underline underline-offset-4"><Link href={`projetos/${project.slug}`}><a>{ project.titulo }</a></Link></div>
                    :   <div key={i} data-hover={`${project.thumbnail ? project.thumbnail.url : ''}`} onMouseOver={handleHover} className="projects hover:text-yellow-100 hover:underline underline-offset-4"><a href={`${project.linkExterno}`} target='blank' rel='noreferrer'>{ project.titulo }</a></div>
                ))}
                <div className='leading-none'>
                {links.map((project, i) =>
                (
                    <span key={i} className="text-sm leading-none 2xl:text-lg 2xl:leading-tight creations 3xl:text-xl hover:text-yellow-100 hover:underline"><a href={project.linkExterno} rel="noreferrer" target='_blank'>{ project.titulo }, </a></span>
                ))}
                {outras.map((project, i) =>
                (
                    <span key={i} className="text-sm leading-none 2xl:text-lg 2xl:leading-tight creations 3xl:text-xl hover:text-yellow-100 hover:underline"><Link href={`projetos/${project.slug}`}><a>{ project.titulo }, </a></Link></span>
                ))}
                </div>
                <div className='mt-8'>
                <a href='https://fernandomota.bandcamp.com/' target='_blank' rel="noreferrer">{locale === 'pt' ? 'bandas sonoras' : 'soundtracks'}</a>
                </div>
            </div>
            <div className="w-full h-screen hidden md:block">
                <Image id='bgImage' className="project-img h-full w-full" layout='fill' objectFit='cover' src={img} alt=""/>
            </div>
        </div>
        </>
    )
}
