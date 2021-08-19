import {GoogleMap, Marker, Polyline, withGoogleMap, withScriptjs} from "react-google-maps";
import {LatLng, LatLngArray} from "../../services/maps/getGPXPoints";
import {useEffect, useRef, VFC} from "react";
import { faMapMarker } from "@fortawesome/free-solid-svg-icons";

type PolylineMapProps = {
    width: number
    height: number
    path: LatLngArray
    registrationLocation: LatLng|null
    profileLocation: LatLng|null
}
export const PolylineMap = withScriptjs(withGoogleMap(({path, registrationLocation, profileLocation}: PolylineMapProps) => {

    const map = useRef<GoogleMap>(null)
    const register = registrationLocation ? new google.maps.LatLng(registrationLocation[0], registrationLocation[1]) : null
    const profilePos = profileLocation ? new google.maps.LatLng(profileLocation[0], profileLocation[1]) : null

    useEffect(() => {
        var bounds = new google.maps.LatLngBounds();
        if(register)
            bounds.extend(register)
        path.forEach(function(n) {
            bounds.extend(new google.maps.LatLng(n[0], n[1]));
        });

        // map.current?.se(bounds.getCenter()); //or use custom center
        map.current?.fitBounds(bounds);
    }, [register, path])

    return <GoogleMap ref={map}
        defaultZoom={10}
        defaultCenter={GetPathCenter(path)}
                      options={{
                          mapTypeId: 'terrain'
                      }}
    >
        <Polyline options={{path: LatLongArrayToPath(path)}}/>
        <Marker options={{position: LatLongArrayToPath(path)[0], icon: {
                path: faMapMarker.icon[4] as string,
                fillColor: "#5ab95d",
                fillOpacity: 1,
                anchor: new google.maps.Point(
                    faMapMarker.icon[0] / 2, // width
                    faMapMarker.icon[1] // height
                ),
                strokeWeight: 1,
                strokeColor: '#3e543b',
                scale: 0.05,

            },}} />

        {register && <Marker options={{position: register, icon: {
                path: faMapMarker.icon[4] as string,
                fillColor: "#3858dc",
                fillOpacity: 1,
                anchor: new google.maps.Point(
                    faMapMarker.icon[0] / 2, // width
                    faMapMarker.icon[1] // height
                ),
                strokeWeight: 1,
                strokeColor: '#12244f',
                scale: 0.05,
            },}} />}
        {profilePos && <Marker options={{position: profilePos, icon: {
                path: faMapMarker.icon[4] as string,
                fillColor: "#ce7a37",
                fillOpacity: 1,
                anchor: new google.maps.Point(
                    faMapMarker.icon[0] / 2, // width
                    faMapMarker.icon[1] // height
                ),
                strokeWeight: 1,
                strokeColor: '#12244f',
                scale: 0.025,
            },}} />}
    </GoogleMap>
}))

export const PolyLineMapHolder: VFC<PolylineMapProps> = ({ width, height, ...rest}) => {

    const mapDimensionStyle = {
        height: height+'px',
        width: width+'px',
        maxWidth: '100%'
    }

    return <PolylineMap
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyB6aaw1Iq8MhUXgnTCwcFSb3wZANQRwFmA"
        loadingElement={<div style={mapDimensionStyle} />}
        containerElement={<div style={mapDimensionStyle} />}
        mapElement={<div style={mapDimensionStyle} />}
        width={width}
        height={height}
        {...rest}
    />
}

export const LatLongArrayToPath = (latLong: LatLngArray): google.maps.LatLngLiteral[] => {
    return latLong.map(ll => ({lat: ll[0], lng: ll[1]}))
}
export const GetPathCenter = (latLong: LatLngArray): google.maps.LatLngLiteral => {
    const min = MinLatLong(latLong)
    const max = MaxLatLong(latLong)
    if (min && max) {
        return {lat: (max[0] + min[0]) / 2, lng: (max[1] + min[1]) / 2}
    }
    return {lat: 33, lng: -143}
}
export const GetPathBounds = (latLong: LatLngArray): google.maps.LatLngBoundsLiteral => {
    const min = MinLatLong(latLong)
    const max = MaxLatLong(latLong)
    if (min && max) {
        return {
            west: min[1],
            east: max[1],
            north: max[0],
            south: min[0],
        }
    }
    return {east: 33, west: 35, north: -145, south: -148}
}
export const MaxLatLong = (latLong: LatLngArray): LatLng | null => {
    let maxLat = MaxLat(latLong);
    let maxLong = MaxLong(latLong);
    if (maxLat && maxLong) {
        return [maxLat, maxLong]
    }
    return null
}
export const MinLatLong = (latLong: LatLngArray): LatLng | null => {
    let minLat = MinLat(latLong);
    let minLong = MinLong(latLong);
    if (minLat && minLong) {
        return [minLat, minLong]
    }
    return null
}
export const MaxLat = (latLong: LatLngArray) => {
    return latLong.reduce((r, ll) => (r === null || ll[0] > r) ? ll[0] : r, null as null | number)
}
export const MaxLong = (latLong: LatLngArray): null | number => {
    return latLong.reduce((r, ll) => (r === null || ll[1] > r) ? ll[1] : r, null as null | number)
}
export const MinLat = (latLong: LatLngArray) => {
    return latLong.reduce((r, ll) => (r === null || ll[0] < r) ? ll[0] : r, null as null | number)
}
export const MinLong = (latLong: LatLngArray): null | number => {
    return latLong.reduce((r, ll) => (r === null || ll[1] < r) ? ll[1] : r, null as null | number)
}