export const PROJECTS_QUERY = `{
    allProjetos {
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
        imagens {
            tamanho
            posicao
            imagem {
            url
            width
            height
            }
        }
    }
}`

export const BIO_QUERY = `{
    bio {
        bio
        imagem {
            url
        }
    }
}`

export const HOME_QUERY = `{
    home {
        imagensBackground {
            url
        }
    }
}`