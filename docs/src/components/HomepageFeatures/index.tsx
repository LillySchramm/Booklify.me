import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
    title: string;
    description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
    {
        title: 'Scan',
        description: (
            <>
                Say goodbye to the hassle of manually entering ISBNs! Thanks to
                the Booklify Companion App, you can effortlessly scan the
                barcode and seamlessly add books to your collection with just a
                simple click.
            </>
        ),
    },
    {
        title: 'Collect',
        description: (
            <>
                Effortlessly manage and view your personal book collection! As
                long as your book/comic/manga has an ISBN, you can seamlessly
                add it to your collection, and we will automatically organize
                your books into their respective series for your convenience.
            </>
        ),
    },
    {
        title: 'Share',
        description: (
            <>
                Have you ever wanted to share or compare your book collection
                with friends? With Booklify, a simple click enables you to
                easily share your library, fostering book discussions and
                recommendations among friends and family. Or, if you want, you
                have the option to keep your collection private, exclusively for
                yourself.
            </>
        ),
    },
];

function Feature({ title, description }: FeatureItem) {
    return (
        <div className={clsx('col col--4')}>
            <div className="text--center padding-horiz--md">
                <Heading as="h3">{title}</Heading>
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
