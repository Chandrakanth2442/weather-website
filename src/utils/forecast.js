import request from "postman-request"


export const forecast=({longitude,latitude}, callback)=>{
    // console.log('latitude '+latitude)
    // console.log('longitude '+longitude)
    // console.log('location '+location)
    const url='http://api.weatherstack.com/current?access_key=a0def044291fe4f828152adb18ccc047&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+',&units=m'
    request({url, json: true}, (error, {body})=>{
        if(body.error){
                    console.log('Unable to find location')
                }
                else if(error)
                    console.error('unable to connect to weather app service')
        else{
             callback(undefined, 'It is currently '+body.current.temperature+' but it feels like '+body.current.feelslike)
            } 
    })
}



