import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid';
import { useGeoLocation } from 'use-geo-location';
export default function Topbar() {
    const myDate = Date.now()
    const [weatherData, setweatherData] = useState()
    const [date, setdate] = useState({
        dateName: moment(myDate).format("dddd"),
        monthName: moment(myDate).format("MMMM"),
        today: moment(myDate).format("D"),
        year: moment(myDate).format("Y")
    })
    const { latitude, longitude, } = useGeoLocation();


    const getWeather = async (latitude, longitude) => {
        const api_call = await
            fetch(`//api.openweathermap.org/data/2.5/weather?
lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`);
        const data = await api_call.json();
        setweatherData(data)

    }

    useEffect(() => {
        if (latitude && longitude) {
            getWeather(latitude, longitude)
        }
    }, [longitude, latitude])

    return (
        <>
            <div className="top-bar container">
                <div className="row">
                    <div className="col-md-6">
                        <ul className="tb-left">
                            <li key={uuidv4()} className="tbl-date">Today is: <span>{date.dateName}, {date.monthName} {date.today}, {date.year}</span></li>
                            {
                                weatherData && weatherData?.main ? <>
                                    <li key={uuidv4()} className="tbl-temp"><i className="fa fa-sun-o"></i>{weatherData?.main?.temp} C</li>
                                </> : null
                            }


                        </ul>
                    </div>
                    <div className="col-md-6">
                        <ul className="tb-right">
                            <li key={uuidv4()} className="tbr-social">
                                <span>
                                    <a href="https://www.facebook.com/thehawk
" className="fa fa-facebook"></a>
                                    <a href="https://twitter.com/thehawk
" className="fa fa-twitter"></a>


                                    <a href="https://www.youtube.com/channel/UC89UAODQct_ilb1fq6JKNBQ" className="fa fa-youtube"></a>
                                    <a href="https://www.linkedin.com/company/thehawk
" className="fa fa-linkedin"></a>
                                </span>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
