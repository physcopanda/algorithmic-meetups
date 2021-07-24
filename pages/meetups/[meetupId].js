import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";

const MeetupDetails = (props) => {
  return (
    <MeetupDetail
      {...props.meetupData}
    />

  );
};

// needed for dynamic pages so NextJS knows what pages to build
export const getStaticPaths = async () => {
  const client = await MongoClient.connect('mongodb+srv://jamie:yKu43WkAk4EaQTt@cluster0.wu7ep.mongodb.net/meetups?retryWrites=true&w=majority');
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetupIds = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: 'blocking', // if true we can have dynamic fallback
    paths: meetupIds.map(meetup => ({
        params: {
          meetupId: meetup._id.toString()
        }
      })
    )
  };
}

export const getStaticProps = async (context) => {
  const client = await MongoClient.connect('mongodb+srv://jamie:yKu43WkAk4EaQTt@cluster0.wu7ep.mongodb.net/meetups?retryWrites=true&w=majority');
  const db = client.db();

  const meetupsCollection = db.collection('meetups');
  const selectedMeetup = await meetupsCollection.findOne({ _id: ObjectId(context.params.meetupId) });

  client.close();

  return {
    props: {
      meetupData: {
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description
      }
    }
  };
}

export default MeetupDetails;
