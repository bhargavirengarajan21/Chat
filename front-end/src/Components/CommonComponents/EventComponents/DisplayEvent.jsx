import React from 'react';
import {Box,Text,Divider, Heading } from '@chakra-ui/react';
import '../../../styles/display_event.scss';

const DisplayEvents = ({eventList , buttonTypes}) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  console.log(eventList,buttonTypes);
  return (
    eventList.map((event) =>(
      <div className='card-container'>
        <div className='heading'>
          <Heading>
            {event.eventName}
          </Heading>
          <Box as='time' dateTime={event.startTime}>
           <b>Time: </b>{`${new Date(event.startTime).toLocaleDateString('en-Us',options)}  ${event.endTime ? '-'+ new Date(event.endTime).toLocaleDateString('en-Us',options): ''}`}
          </Box>
        </div>
        <Box as='article' p='5' borderWidth='2px' rounded='md'>
          <Text marginBottom='1rem'>
            {event.eventDescription}
          </Text>
          <Divider variant="solid" colorScheme="white" size="2px" />
          <div className='button-container'>
            {buttonTypes.map((button) => (
              <button className='icon-button'>
                {button.icon}
                <p>{button.ctaText}</p>
              </button>
            ))}
          </div>
        </Box> 
      </div>
    ))
  )
};

export default DisplayEvents;
