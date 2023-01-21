import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Heading, IconButton, Collapse } from '@chakra-ui/react';
import { useConfig } from '../../context/DataProvider';
import DisplayEvents from '../CommonComponents/EventComponents/DisplayEvent';
import AddIcon from '../../images/add-volunteer.png';
import { DeleteIcon, EditIcon, ViewIcon, CloseIcon, StarIcon, ArrowUpDownIcon } from '@chakra-ui/icons';
import '../../styles/dashboard.scss';

const DashBoard = () => {
  const { userInfo, eventInfo, setEventInfo } = useConfig();
  const fetchEvent = async() => {
    try {
      const getAllresponse = await axios.get('/event/events',   {
        headers: {
          authorization : userInfo.token,
        },
        params: {
          userId: userInfo._id
        }
      });

      const getCreatedresponse = await axios.get('/event/created/events',   {
        headers: {
          authorization : userInfo.token,
        },
        params: {
          userId: userInfo._id
        }
      });

      const getVolunteerresponse = await axios.get('/event/volunteer/events',   {
        headers: {
          authorization : userInfo.token,
        },
        params: {
          userId: userInfo._id
        }
      });

      setEventInfo({
        created: getCreatedresponse.data,
        volunteer: getVolunteerresponse?.data ,
        other: getAllresponse?.data
      });
    } catch(error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchEvent();
  },[userInfo]);
  console.log(eventInfo);
  const created = [
    {
      ctaText: 'Edit',
      icon: < EditIcon />,
    },
    {
      ctaText: 'Delete',
      icon: <DeleteIcon/>,
    }, {
      ctaText: 'Views',
      icon: < ViewIcon />,
    }
  ]

  const volunteer = [
    {
      ctaText: 'Favorite',
      icon: < StarIcon />
    },
  ]

  const other = [
    {
      ctaText: 'volunteer',
      icon: <img src={AddIcon} />
    }, {
      ctaText: 'Not interested',
      icon: < CloseIcon />
    }
  ]
  const [openCreatedEvents, setOpenCreate] = useState(false);
  const [openVolunteer, setVolunteer] = useState(false);
  const [openOther, setOther] = useState(false);

  return(
    eventInfo? 
    (
    <div className='dashboard_container'> 
      <div className='created__event event-cards'>
        <div className='card'>
          <Heading>Created Events</Heading>
          <IconButton icon={<ArrowUpDownIcon />} onClick={() => setOpenCreate(!openCreatedEvents)}/>
        </div>
        { openCreatedEvents ? (eventInfo?.created.length > 0 ? <Collapse> <DisplayEvents eventList={eventInfo.created} buttonTypes={created}/> </Collapse> : <p>No Created events</p>):null}
      </div>
      <div className='volunteered__event event-cards'>
        <div className='card'>
          <Heading>Volunteered event</Heading>
          <IconButton icon={<ArrowUpDownIcon />} onClick={() => setVolunteer(!openVolunteer)}/>
        </div>
        { openVolunteer ? ( eventInfo?.volunteer.length > 0 ? <Collapse><DisplayEvents eventList={eventInfo.volunteer} buttonTypes={volunteer} /></Collapse> : <p>No event Volunteered</p>):null}
      </div>
      <div className='other__event event-cards'>
        <div className='card'>
          <Heading>Other event</Heading>
          <IconButton icon={<ArrowUpDownIcon />} onClick={() => setOther(!openOther)}/>
        </div>
        { openOther ? (eventInfo?.other.length > 0 ? <Collapse><DisplayEvents eventList={eventInfo.other} buttonTypes={other} /> </Collapse> : <p>No Other events</p>):null}
      </div>
    </div>
    ): null
  )
}

export default DashBoard;