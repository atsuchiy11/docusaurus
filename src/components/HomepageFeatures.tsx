/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

type FeatureItem = {
  title: string;
  // image: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Markdownさえ知っていればOK',
    // image: '/img/undraw_docusaurus_mountain.svg',
    description: (
      <>
        React？なにそれ美味しいの？と言う方、大丈夫です。
        Markdownさえ知っていればOK牧場です。
      </>
    ),
  },
  {
    title: 'ドキュメント作成に集中できます',
    // image: '/img/undraw_docusaurus_tree.svg',
    description: (
      <>
        余計なことは考えなくてもいいです。書きたいことを書けばいいんです。
        面倒くさい事はプロがよしなにやってくれますw
      </>
    ),
  },
  {
    title: 'Reactのパワーを最大限に',
    // image: '/img/undraw_docusaurus_react.svg',
    description: (
      <>
        パワポでよくね？と思っている方、安心してください。
        ナウでヤングなReactで自由自在にカスタマイズできますw
      </>
    ),
  },
];

function Feature({title, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        {/* <img className={styles.featureSvg} alt={title} src={image} /> */}
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
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
