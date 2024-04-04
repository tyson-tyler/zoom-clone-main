/* eslint-disable camelcase */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import HomeCard from './HomeCard';
import MeetingModal from './MeetingModal';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useUser } from '@clerk/nextjs';
import Loader from './Loader';
import { useToast } from './ui/use-toast';
import { Input } from './ui/input';

const initialValues = {
  dateTime: new Date(),
  description: '',
  link: '',
};

const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined
  >(undefined);
  const [values, setValues] = useState(initialValues);
  const [callDetail, setCallDetail] = useState<Call>();
  const client = useStreamVideoClient();
  const { user } = useUser();
  const { toast } = useToast();

  const createMeeting = async () => {
    if (!client || !user) return;
    try {
      if (!values.dateTime) {
        toast({ title: 'Please select a date and time' });
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call('default', id);
      if (!call) throw new Error('Failed to create meeting');
      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || 'Instant Meeting';
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      setCallDetail(call);
      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast({
        title: 'Meeting Created',
      });
    } catch (error) {
      console.error(error);
      toast({ title: 'Failed to create Meeting' });
    }
  };

  if (!client || !user) return <Loader />;



  return (
    <section className="grid mt-8 grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4 mb-10">
      <HomeCard
        img="/icons/add-metting.svg"
        title="Create Meeting"
        description="Create Meeting of you"
        handleClick={() => setMeetingState('isInstantMeeting')}
        className='text-center flex-center hover:scale-105 transition lg:ml-30'
      />
      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="Join in the Meeting"
        handleClick={() => setMeetingState('isJoiningMeeting')}
        className='text-center flex-center bg-green-600 hover:scale-105 transition lg:ml-30'
      />
      <HomeCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Meeting Recordings"
        className="bg-purple-800 text-center flex-center hover:scale-105 transition lg:ml-30"
        handleClick={() => router.push('/recordings')}
      />

     
      <MeetingModal
        isOpen={meetingState === 'isJoiningMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Type the link here"
        className="text-center"
        buttonText="Join Meeting"
        handleClick={() => router.push(values.link)}
      >
        <Input
          placeholder="Meeting link"
          onChange={(e) => setValues({ ...values, link: e.target.value })}
          className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </MeetingModal>

      <MeetingModal
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Create Meeting"
        className="text-center"
        buttonText="Create Meeting"
        handleClick={createMeeting}
      />
    </section>
  );
};

export default MeetingTypeList;
