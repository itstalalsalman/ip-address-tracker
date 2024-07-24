import React from 'react'
import markerIcon from '../assets/marker-icon.png';
import markerShadow from '../assets/marker-shadow.png';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for missing marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;

const customIcon = new L.Icon({
  iconUrl: markerIcon, 
  iconSize: [25, 41], 
  iconAnchor: [12, 41], 
  popupAnchor: [1, -34], 
  shadowUrl: markerShadow,  
  shadowSize: [41, 41], 
  shadowAnchor: [12, 41]  
});

const MapDetails = (props) => {
  console.log(props)
  return (
    <div className='absolute z-0 w-full h-[65vh] sm:h-[80vh] top-[35vh] sm:top-[40vh]'>
        <MapContainer key={`${props.mapCoord[0]}-${props.mapCoord[1]}`} center={props.mapCoord} zoom={60} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={props.mapCoord} icon={customIcon}>
            <Popup>
              {props.location}
            </Popup>
          </Marker>
        </MapContainer>
    </div>
  )
}

export default MapDetails