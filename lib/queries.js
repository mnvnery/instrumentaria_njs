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

export const BIO_QUERY = `{
    bio {
        bio
        imagem {
            url
            focalPoint {
                x
                y
            }
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

export const SOUNDS_QUERY =`{
    home {
        sons {
            url
        }
    }
}`

export const SOCIALS_QUERY =`{
    social {
        instagram
        facebook
        youtube
        linktree
    }
}`