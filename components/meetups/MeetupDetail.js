import Head from "next/head";
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
        <img
          src={props.image}
          alt={props.title}
        />
        <h1>{props.title}</h1>
        <address>{props.address}</address>
        <p>{props.description}</p>
      </section>
    </>
  );
};

export default MeetupDetail;