import { useCallback } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

const NewMeetup = () => {
  const router = useRouter();

  const addMeetupHandler = useCallback(async (enteredMeetupData) => {
    const response = await fetch('/api/new-meetup',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(enteredMeetupData)
      }
    );

    const data = await response.json();
    console.log(data);
    router.push('/');
  }, []);

  return (
    <>
      <Head>
        <title>Add a New Meetup</title>
        <meta
          name="description"
          content="Add a Meetup to the Algorithmic Meetups List"
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler}/>
    </>

  )
}

export default NewMeetup;