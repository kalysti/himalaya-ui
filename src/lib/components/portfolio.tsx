import {
  Button,
  ContentLayout,
  Image,
  Grid,
  Hero,
  Link,
  Text,
  useTheme,
  Display,
  FadeInEffect,
} from 'components'
import NextLink from 'next/link'

export function PortfolioItem({
  image,
  title = '',
  desc = '',
  url,
}: {
  image?: string
  title: string
  desc: string
  url?: string
}) {
  const theme = useTheme()
  return (
    <FadeInEffect translateY="4rem">
      <div className="portfolio">
        <NextLink passHref legacyBehavior href={''}>
          <a className="img-link">
            <Display margin={0}>
              {image && (
                <FadeInEffect startOpacity={1.0} blur={10}>
                  <Image
                    className="shine-effect"
                    alt="Test"
                    src={image}
                    width={'100%'}
                    draggable={false}
                  />
                </FadeInEffect>
              )}
            </Display>
          </a>
        </NextLink>
        <FadeInEffect translateY="4rem">
          <Link font={'24px'} style={{ fontWeight: 'bold' }} my={0}>
            {title}
          </Link>
        </FadeInEffect>
        <FadeInEffect translateY="4rem">
          <Text mt={0} style={{ color: theme.palette.accents_6 }}>
            {desc}
          </Text>
        </FadeInEffect>
        <FadeInEffect translateY="4rem" blur={10}>
          {url && (
            <Link target="_blank" href={url}>
              <Button auto>Source code</Button>
            </Link>
          )}

          {!url && (
            <Button disabled auto>
              Coming soon
            </Button>
          )}
        </FadeInEffect>
        <style jsx>{`
          .img-link {
            width: 100%;
          }
          .portfolio-image {
            width: 100%;
            position: relative;
            border-radius: ${theme.style.radius};
            margin-bottom: 12px;
          }

          .portfolio {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
        `}</style>
      </div>
    </FadeInEffect>
  )
}

export default function Portfolio() {
  const theme = useTheme()
  return (
    <ContentLayout>
      <FadeInEffect transition={1000} translateY="4rem">
        <div className="header">
          <FadeInEffect translateY="4rem">
            <Hero.Tag hasGradient={true} gradient={theme.palette.gradient_2}>
              Projects
            </Hero.Tag>
          </FadeInEffect>
          <FadeInEffect translateY="4rem">
            <Text
              margin={0}
              marginTop={'12px'}
              h4
              font={'clamp(24px, 3.1vw, 48px)'}
              style={{ fontWeight: '700', lineHeight: '1.2' }}>
              Diverse, dynamic, and innovative: Explore real projects made with Himalaya.
            </Text>
          </FadeInEffect>
          <FadeInEffect translateY="4rem">
            <Text
              margin={0}
              marginTop={'24px'}
              p
              font={'clamp(14px, 1.2vw, 16px)'}
              style={{ color: theme.palette.accents_6, fontWeight: 400 }}>
              Our UI library stands out with over 3 fully functional demo projects,
              offering real-world application scenarios, and a rich repository of 100+
              examples showcasing its extensive capabilities for diverse design and
              development needs.
            </Text>
          </FadeInEffect>
        </div>
      </FadeInEffect>
      <Grid.Container gap={5} justify="center">
        <Grid xs={24} md={12}>
          <div className="portfolio-list">
            <PortfolioItem
              image="https://picsum.photos/id/2/578/578"
              title="TurtleTrade"
              desc="TurtleTrade is your free gateway to stock market success, providing cutting-edge forecasting and analysis tools for informed investment decisions."
            />
            <PortfolioItem
              image="https://picsum.photos/id/2/578/750"
              title="Striked"
              desc="Striked is the ultimate social network connecting gamers and game developers, where gaming's pulse beats through a vibrant community of shared passion and innovation."
            />
          </div>
        </Grid>
        <Grid xs={24} md={12}>
          <div className="portfolio-list">
            <PortfolioItem
              image="https://picsum.photos/id/2/578/750"
              title="RedNinjas"
              desc="At RedNinjas, we're the digital agency that thrives on crafting innovative products across diverse industries, fueled by a passion for creativity and excellence."
            />
            <PortfolioItem
              image="/images/himalaya-preview.png"
              title="Himalaya"
              url="https://github.com/red-ninjas/himalaya-ui"
              desc="Himalaya, our open-source library's documentation page, serves as a comprehensive guide, unveiling the majestic peaks of functionality and customization, with clear paths to explore its towering potential."
            />
          </div>
        </Grid>
      </Grid.Container>

      <style jsx>{`
        .action-button {
          display: flex;
          width: 100%;
          align-items: center;
          justify-content: center;
          padding: 48px 0px;
        }
        .header {
          max-width: 700px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: flex-start;
          margin-bottom: 64px;
        }

        .portfolio-list {
          display: flex;
          flex-direction: column;
          gap: 60px;
          width: 100%;
        }
      `}</style>
    </ContentLayout>
  )
}
