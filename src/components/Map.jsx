
import { Icon } from "leaflet";
import { MapContainer, TileLayer, Marker,Popup,useMap} from "react-leaflet"

export default function Map({ city }) {


  const FlyTo = ({ position })=>{
  const map = useMap();
  if (position) {
    map.flyTo(position, 10, { animate: true, duration: 1.5 });
  }
  return null;
  }
  const customIcon = new Icon({
    iconUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3C80Hdp6L10OS6RMgsg-scYpNPAWjOO6lbw&s" ,
    iconSize: [38, 38],
    iconAnchor: [20, 50]
  })

  const marker = {
    geocode: city.coord? [city.coord.lat, city.coord.lon]: [51.5085, -0.1257],
    popUp: city.name? city.name: "Введіть місто"
  }

  return (
    <div className="map-container" style={{height: "400px", width: "100%"}}>
    <MapContainer center={marker.geocode} zoom={10}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={marker.geocode} icon={customIcon} >
          <Popup>
            <h2>{marker.popUp}</h2>
          </Popup>

        </Marker>
        <FlyTo position={marker.geocode}/>
      </MapContainer>
      </div>
  );
}
