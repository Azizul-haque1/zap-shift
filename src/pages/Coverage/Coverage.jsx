import React, { useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import { useLoaderData } from 'react-router';

const Coverage = () => {
    const position = [23.6850, 90.3563]
    const serviceCenters = useLoaderData()
    const mapRef = useRef()
    // console.log(serviceCenters);

    const handleSearch = (e) => {
        e.preventDefault()
        const location = e.target.location.value;
        const district = serviceCenters.find(c => c.district.toLowerCase().includes(location.toLowerCase()))
        console.log(district);
        if (district) {
            const coord = [district.latitude, district.longitude]
            mapRef.current.flyTo(coord, 15)
        }
    }
    return (
        <div>
            <h2 className="text-5xl font-bold mt-10 ">We are available in 64 districts</h2>
            <form onSubmit={handleSearch} className="">
                <div class="join">
                    <div>
                        <div>
                            <input class="input join-item"
                                name='location'
                                placeholder="location" />
                        </div>
                    </div>

                    <div class="indicator">

                        <button class="btn join-item">Search</button>
                    </div>
                </div>

            </form>

            <div className="border h-[800px] my-10">


                <MapContainer
                    ref={mapRef}
                    className='  h-[800px]'
                    center={position} zoom={8}
                    scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {
                        serviceCenters.map(center => <Marker
                            position={[center.latitude, center.longitude]}>
                            <Popup>
                                <strong>{center.district}</strong>
                                <br />
                                Service Area: {center.covered_area.join(', ')}
                            </Popup>
                        </Marker>)
                    }

                </MapContainer>,

            </div>

        </div>
    );
};

export default Coverage;