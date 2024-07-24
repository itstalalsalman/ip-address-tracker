import React, { useEffect, useState } from 'react';
import bgDesktop from '../assets/pattern-bg-desktop.png';
import bgMobile from '../assets/pattern-bg-mobile.png';

import InformationContainer from './InformationContainer';
import InputContainer from './InputContainer';
import MapDetails from './MapDetails';

import axios from 'axios';

const Home = () => {
  
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 475 ? bgMobile : bgDesktop);
  const [input, setInput] = useState("");
  const [resultedInfo, setResultedInfo] = useState({
    ipAddress: "--",
    location: "--",
    timeZone: "--",
    isp: "--"
  });
  const [mapCoordinates, setMapCoordinates] = useState([51.505, -0.09]); // Default coordinates (London)
  
  const fetchIPData = async (query = "") => {
    let apiUrl = `https://geo.ipify.org/api/v2/country,city?apiKey=at_1hyoxiiYvXmZFTD6n2oEtzx97Cjs0${query}`;
    try {
      const response = await axios.get(apiUrl);
      const { ip, location, isp } = response.data;
      setResultedInfo({
        ipAddress: ip,
        location: `${location.region}, ${location.country} ${location.postalCode}`,
        timeZone: `UTC ${location.timezone}`,
        isp: isp
      });
      setMapCoordinates([location.lat, location.lng]);
    } catch (error) {
      console.error("Error fetching location data", error);
    }
  };

  useEffect(() => {
    fetchIPData();
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 475 ? bgMobile : bgDesktop);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const handleChange = (e) => {
    const { value } = e.target;
    setInput(value);
  };

  const handleClick = () => {
    let query = "";
    if (input.match(/[0-9]/) !== null) {
      query = `&ipAddress=${input}`;
    } else {
      query = `&domain=${input}`;
    }
    fetchIPData(query); // Fetch data with the input query
  };

  return (
    <div className='w-[100vw] h-[100vh] sm:h-[120vh] flex flex-col justify-center items-center relative'>
      <img src={isMobile} alt='background-img-top' className='w-full h-[35vh] sm:h-[40vh] object-cover absolute top-0 z-0' />
      <MapDetails 
        location={resultedInfo.location}
        mapCoord={mapCoordinates}
      />
      <div className='absolute w-full h-full top-0 left-0 flex flex-col justify-start items-center gap-6 z-10'>
        <h1 className='w-full text-center text-white text-[30px] font-medium mt-5'>IP Address Tracker</h1>
        <InputContainer 
          change={handleChange}
          click={handleClick}
          input={input}
        />
        <div className='w-[1200px] sm:w-[80%] h-[160px] sm:h-[40%] mt-5 bg-white rounded-xl drop-shadow-lg flex sm:flex-col justify-evenly items-center'>
          <InformationContainer
            heading="IP ADDRESS"
            content={resultedInfo.ipAddress}
          />
          <InformationContainer
            heading="LOCATION"
            content={resultedInfo.location}
          />
          <InformationContainer
            heading="TIMEZONE"
            content={resultedInfo.timeZone}
          />
          <InformationContainer
            heading="ISP"
            content={resultedInfo.isp}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
