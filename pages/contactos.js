import Image from 'next/image'
import Header from '../components/Header'
import { request } from "../lib/datocms"
import { SOUNDS_QUERY, SOCIALS_QUERY } from '../lib/queries'
import { useRouter } from 'next/router'

export async function getStaticProps() {

    const sounds = await request({
        query: SOUNDS_QUERY,
    })

    const socials = await request({
        query: SOCIALS_QUERY,
    })

    return {
        props: {
        sounds: sounds.home.sons,
        socials: socials.social
        },
    }
}
export default function Contactos({sounds, socials}) {
    const { locale, locales, asPath } = useRouter().locale;

    return (
        <>
        <Header sounds={sounds} socials={socials}/>
        <div className="pl-20 pt-28 pr-5 md:pt-0 md:h-screen w-full flex items-center justify-center">
            <form name='contactos' method="POST" data-netlify="true" className="space-y-5 max-w-4xl 2xl:w-[45%] 2xl:text-xl">
            <input type="hidden" name="form-name" value="contactos" />
                <div className="flex space-x-5">
                    <input type="text" id="fname" name="firstname" placeholder={locale === 'pt' ? 'primeiro nome' : 'first name'} className="bg-transparent w-1/2 border p-2 text-sm 2xl:text-xl 2xl:p-5" />
                    <input type="text" id="lname" name="lastname" placeholder={locale === 'pt' ? 'apelido' : 'last name'} className="bg-transparent w-1/2 border p-2 text-sm 2xl:text-xl 2xl:p-5" />
                </div>
                <input type="text" id="email" name="email" placeholder="email" className="w-full bg-transparent border p-2 text-sm 2xl:text-xl 2xl:p-5" />
                <textarea id="subject" name="subject" placeholder={locale === 'pt' ? 'mensagem' : 'message'} className="w-full bg-transparent border p-2 text-sm h-60 2xl:h-80 2xl:text-xl 2xl:p-5"></textarea>
                <input type="submit" value="Submit" className="border py-3 px-6 2xl:py-4 hover:bg-white hover:text-black" />
            </form>
        </div>
        </>
    )
}
