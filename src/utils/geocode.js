
import request from "postman-request"


export const geocode=(address, callback)=>{
    const url='https://api.mapbox.com/search/geocode/v6/forward?q='+encodeURIComponent(address)+'&access_token=pk.eyJ1IjoiMWNoYW5kcmFrYW50aCIsImEiOiJjbHd4b2k5NjIwMTdrMnFxMWRmaHV1em1yIn0.J2gDV-AIysUAD4MRDLD6Vw'
    request({url, json: true}, (error, {body})=>{
        // const latitude =  body.features[0].geometry.coordinates[0]
        // const longitude = body.features[0].geometry.coordinates[1]
        if(error){
            callback('Unable to connect to location services', undefined)
        }
        else if(body.features.length===0){
            callback('Unable to find location. Try another search', undefined)
        }
        else{
            const latitude =  body.features[0].geometry.coordinates[0]
            const longitude = body.features[0].geometry.coordinates[1]
            const location=body.features[0].properties.full_address
            // console.log(latitude)
            // console.log(longitude)
            // console.log(location)
            const coordinates=
                {
                    latitude: latitude,
                longitude: longitude
                }
             callback(undefined, {
                latitude: latitude,
                longitude: longitude,
                location: location
             })
            } 
    })
    //console.log(latitude)
}



