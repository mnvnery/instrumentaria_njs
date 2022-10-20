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
              }
              posicao
              tamanho
              linkVideo
            }
            ... on LinkVideoRecord {
              id
              vDeo {
                url
              }
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