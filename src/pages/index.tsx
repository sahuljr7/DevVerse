import UnstyledLink from '@/components/atoms/UnstyledLink'
import BlogList from '@/components/organism/BlogList'
import HeroWithPhoto from '@/components/template/HeroWithPhoto'
import Layout from '@/components/template/Layout'

import { getBlog, ownerName } from '@/helpers'
import { twclsx } from '@/libs/twclsx'

import { ArrowSmRightIcon } from '@heroicons/react/outline'
import type { GetStaticProps, NextPage } from 'next'
import { Blog } from 'next-starter-blog'

interface HomeProps {
  blogs: Array<Blog>
}

const Home: NextPage<HomeProps> = ({ blogs = [] }) => {
  const meta = {
    title: 'Sahul Kumar Parida',
    template: 'Personal Blog',
    description: `Hi, I’m Sahul.
    Welcome to my blog - In my free time, I like developing side projects and blogging about them. Have a good read!`,
    openGraph: {
      images: [
        {
          url: 'https://og-image.vercel.app/**Tags**%3Cbr%20%2F%3ELook%20for%20specicic%20blog%20post%20based%20on%20your%20favorite%20blog%20tag.png?theme=dark&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fhyper-bw-logo.svg',
          alt: 'NEXT.js Starter Blog',
          width: 1200,
          height: 600
        }
      ]
    }
  }

  return (
    <Layout as='main' {...meta}>
      <HeroWithPhoto image='/static/avatar.jpg' imageAlt={ownerName} {...meta}>
        <p className={twclsx('max-w-prose mt-2')}>
        Most of the time, I'm just hacking on my site for fun and not-profit. But while building this latest version, I did manage to have a few key ideas and goals in mind.
        <br/>
        <br/>
        💡 Check out this platform offering answers for LeetCode and GFG problems in C++, Java, and Python. It's a collaborative effort designed to offer clean, readable code across multiple subjects while staying updated with new standards. 🌟
        </p>
      </HeroWithPhoto>

      <BlogList blogs={blogs} title='Featured Post'>
        <UnstyledLink
          href='/blog'
          className={twclsx(
            'group',
            'items-center space-x-1 font-medium',
            'hover:text-primary-3 dark:hover:text-primary-2'
          )}
        >
          <span>See all post</span>
          <ArrowSmRightIcon
            className={twclsx(
              'inline-flex w-4 h-4 transition-all duration-200',
              '-translate-x-4 group-hover:translate-x-0',
              'opacity-0 group-hover:opacity-100'
            )}
          />
        </UnstyledLink>
      </BlogList>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const blogs = await getBlog()

  return {
    props: {
      blogs: blogs.map((b) => ({ ...b.data, slug: b.slug })).filter((b) => b.featured)
    }
  }
}

export default Home
