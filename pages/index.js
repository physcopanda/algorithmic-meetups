import { MongoClient } from "mongodb";
import Head from "next/head";
import MeetupList from "../components/meetups/MeetupList";

const HomePage = props => {
  return (
    <>
      <Head>
        <title>Algorithmic Meetups</title>
        <meta
          name="description"
          content="Browse Algorithmic Meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups}/>
    </>
  )

}

/*
export const getServerSideProps = async (context) => {
  // always runs on the server
  const req = context.req;
  const res = context.res;
  //fetch data from API

  // read file from file system
  return {
    props: {
      meetups: DUMMY_MEETUPS
    }
  }
};
*/

export const getStaticProps = async () => {
  // only ever runs server side for static rendering
  // executed during the build process and NEVER
  // reaches the browser
  const client = await MongoClient.connect('mongodb+srv://jamie:yKu43WkAk4EaQTt@cluster0.wu7ep.mongodb.net/meetups?retryWrites=true&w=majority');
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  // read file from file system?

  return {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString()
      }))
    },
    revalidate: 10
  };
}

export default HomePage;