import Head from 'next/head';
import Image from 'next/image';
import classes from './MeetupDetail.module.css';

const MeetupDetail = (props) => {
  return (
    <>
      <Head>
        <title>{props.title}</title>
        <meta
          name="description"
          content={props.description}
        />
      </Head>
      <section
        className={classes.detail}
      >
        <Image
          src={props.image}
          alt={props.title}
          width={640}
          height={640*3/4}
        />
        <h1>{props.title}</h1>
        <address>{props.address}</address>
        <p>{props.description}</p>
      </section>
    </>
  );
};

export default MeetupDetail;