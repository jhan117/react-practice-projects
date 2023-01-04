import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails() {
  return <MeetupDetail image="" title="" address="" description="" />;
}

export async function getStaticPaths() {
  return {
    fallback: false,
    paths: [
      {
        params: {
          meetupId: "m1",
        },
      },
      {
        params: {
          meetupId: "m2",
        },
      },
    ],
  };
}

export function getStaticProps(context) {
  // fetch data for a single meetup

  const meetupId = context.params.meetupId;

  console.log(meetupId);

  return {
    props: {
      meetupData: {
        id: meetupId,
        image: "",
        title: "",
        address: "",
        description: "",
      },
    },
  };
}

export default MeetupDetails;
