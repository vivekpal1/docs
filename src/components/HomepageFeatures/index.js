import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Quick Installation Guide',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Install ShastraOS easily with ShastraOS Live Calamres Installer.
        ShastraOS live installer gives you capablity to explore your desktop OS, before it being installed to your hardware.
      </>
    ),
  },
  {
    title: 'Get started with your privacy focused dececntralized OS',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        ShastraOS is privacy focused decentralized OS, gives you your personal workstation feeling.
        With ShastraOS backups you will able to take backup of your private data and will safely hosted on IPFS.
      </>
    ),
  },
  {
    title: 'All your needed applications are here.',
    Svg: require('@site/static/img/desktopgirl.svg').default,
    description: (
      <>
        ShastraOS comes with it's own packages repositories, which gives you choice to download your favorite applications from thousands of packages.
      </>
    ),
  }
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
