import { Metadata } from 'next'
import { isProduction } from './get-node-env'

const url = isProduction() ? (process.env.PROD_URL as string) : (process.env.LOCAL_URL as string)

const defaultMetadataTags: Metadata = {
  title: {
    template: '%s | My app',
    default: 'My app',
  },
  description: 'Basic description of the application',
  keywords: ['Keywords', 'To', 'Improve', 'Searchability', 'On', 'Google', 'And', 'Other', 'Sites'],
  category: 'technology',
  metadataBase: new URL(url),
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: 'google',
    other: {
      facebook: ['my-facebook-tag'],
    },
  },

  openGraph: {
    title: 'Default Open Graph Title',
    description: 'Default Open Graph description',
    url: url,
    siteName: 'Default Name',
    locale: 'en_US',
    images: [
      {
        url: 'https://example.com/og.png',
        width: 800,
        height: 600,
        alt: 'Alt description',
      },
    ],
  },
}

export function getMetadata (props?: Metadata): Metadata {
  const updatedMetadata: Metadata = {
    title: props?.title || defaultMetadataTags.title,

    description: props?.description || defaultMetadataTags.description,

    keywords: props?.keywords || defaultMetadataTags.keywords,

    category: props?.category || defaultMetadataTags.category,

    metadataBase: props?.metadataBase || defaultMetadataTags.metadataBase,

    robots: props?.robots || defaultMetadataTags.robots,

    verification: props?.verification || defaultMetadataTags.verification,

    openGraph: {
      title: props?.openGraph?.title || defaultMetadataTags.openGraph?.title,
      description: props?.openGraph?.description || defaultMetadataTags.openGraph?.description,
      url: props?.openGraph?.url || defaultMetadataTags.openGraph?.url,
      siteName: props?.openGraph?.siteName || defaultMetadataTags.openGraph?.siteName,
      locale: props?.openGraph?.locale || defaultMetadataTags.openGraph?.locale,
      images: props?.openGraph?.images || defaultMetadataTags.openGraph?.images,
    },
  }

  return updatedMetadata
}
